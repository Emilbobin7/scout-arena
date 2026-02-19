const Follow = require("../models/Follow");
const Notification = require("../models/Notification");
const { createActivity } = require("./activityController");

// POST /api/follow — Follow a user
exports.follow = async (req, res) => {
    try {
        const { followingId } = req.body;
        console.log('[Follow] followingId:', followingId, '| req.userId:', req.userId);

        if (!followingId) return res.status(400).json({ message: "followingId required" });
        if (followingId === req.userId) return res.status(400).json({ message: "Cannot follow yourself" });

        const existing = await Follow.findOne({ followerId: req.userId, followingId });
        if (existing) return res.status(400).json({ message: "Already following" });

        const follow = await Follow.create({ followerId: req.userId, followingId });

        // Create notification for the followed user (awaited so errors are visible)
        try {
            const notif = await Notification.create({
                userId: followingId,
                fromUser: req.userId,
                type: "follow",
                message: "started following you",
            });
            console.log('[Follow] Notification created:', notif._id, '→ userId:', notif.userId);
        } catch (notifErr) {
            console.error('[Follow] Notification.create FAILED:', notifErr.message);
        }

        // Log activity (non-blocking)
        createActivity({
            userId: req.userId,
            type: "follow",
            text: "followed an athlete",
            meta: { followingId }
        });

        res.status(201).json(follow);
    } catch (err) {
        console.error('[Follow] follow error:', err.message);
        res.status(500).json({ message: "Failed to follow" });
    }
};

// DELETE /api/follow — Unfollow a user
exports.unfollow = async (req, res) => {
    try {
        const { followingId } = req.body;
        if (!followingId) return res.status(400).json({ message: "followingId required" });
        await Follow.findOneAndDelete({ followerId: req.userId, followingId });
        res.json({ message: "Unfollowed" });
    } catch (err) {
        res.status(500).json({ message: "Failed to unfollow" });
    }
};

// GET /api/follow/followers/:userId — Follower count for an athlete
exports.getFollowers = async (req, res) => {
    try {
        const count = await Follow.countDocuments({ followingId: req.params.userId });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ count: 0 });
    }
};

// GET /api/follow/following — List of users the current user follows
exports.getFollowing = async (req, res) => {
    try {
        const following = await Follow.find({ followerId: req.userId })
            .populate("followingId", "name email");
        res.json(following);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch following" });
    }
};

// GET /api/follow/status/:userId — Check if current user follows a specific user
exports.getFollowStatus = async (req, res) => {
    try {
        const exists = await Follow.findOne({ followerId: req.userId, followingId: req.params.userId });
        res.json({ isFollowing: !!exists });
    } catch (err) {
        res.status(500).json({ isFollowing: false });
    }
};
