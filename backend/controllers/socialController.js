const asyncHandler = require('express-async-handler');
const Follow = require('../models/Follow');
const Like = require('../models/Like');
const Activity = require('../models/Activity');

// @desc    Follow User
// @route   POST /api/follow
// @access  Private
const followUser = asyncHandler(async (req, res) => {
    const { followingId } = req.body;

    if (!followingId) {
        res.status(400);
        throw new Error('Following ID required');
    }

    if (followingId === req.user.id) {
        res.status(400);
        throw new Error('Cannot follow yourself');
    }

    const alreadyFollowing = await Follow.findOne({
        followerId: req.user.id,
        followingId
    });

    if (alreadyFollowing) {
        res.status(400);
        throw new Error('Already following');
    }

    const follow = await Follow.create({
        followerId: req.user.id,
        followingId
    });

    // Create Activity
    await Activity.create({
        userId: req.user.id,
        type: 'follow',
        referenceId: followingId,
        description: `started following user ${followingId}`
    });

    res.status(200).json(follow);
});

// @desc    Unfollow User
// @route   DELETE /api/follow/:id
// @access  Private
const unfollowUser = asyncHandler(async (req, res) => {
    const { followingId } = req.body; // or params, sticking to body for now as per requirement implied JSON data

    // But DELETE usually uses params. Let's support Body or if the ID passed is the FollowID?
    // User request: DELETE /api/follow -> Unfollow athlete. Implicitly sends followingId in body or param?
    // Let's assume body for now or query.
    // Actually, safer to use query or body.

    const targetId = req.body.followingId || req.query.followingId;

    if (!targetId) {
        res.status(400);
        throw new Error('Target ID required');
    }

    await Follow.findOneAndDelete({
        followerId: req.user.id,
        followingId: targetId
    });

    res.status(200).json({ message: 'Unfollowed' });
});

// @desc    Like Video
// @route   POST /api/like
// @access  Private
const likeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.body;

    const alreadyLiked = await Like.findOne({
        userId: req.user.id,
        videoId
    });

    if (alreadyLiked) {
        res.status(400);
        throw new Error('Already liked');
    }

    const like = await Like.create({
        userId: req.user.id,
        videoId
    });

    // Create Activity
    await Activity.create({
        userId: req.user.id,
        type: 'like',
        refId: videoId,
        description: `liked a video`
    });

    res.status(200).json(like);
});

// @desc    Unlike Video
// @route   DELETE /api/like
// @access  Private
const unlikeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.body; // or query

    await Like.findOneAndDelete({
        userId: req.user.id,
        videoId
    });

    res.status(200).json({ message: 'Unliked' });
});

// @desc    Get Activity Feed
// @route   GET /api/activity
// @access  Private
const getActivity = asyncHandler(async (req, res) => {
    // Show activity of people I follow? Or my own?
    // Usually a feed shows others' activity.

    // 1. Get List of Following
    const following = await Follow.find({ followerId: req.user.id });
    const followingIds = following.map(f => f.followingId);

    // 2. Get Activity where userId is in followingIds
    const activities = await Activity.find({ userId: { $in: followingIds } })
        .sort({ createdAt: -1 })
        .populate('userId', 'name profilePhoto')
        .limit(20);

    res.status(200).json(activities);
});

module.exports = {
    followUser,
    unfollowUser,
    likeVideo,
    unlikeVideo,
    getActivity
};
