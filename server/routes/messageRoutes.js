const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/authMiddleware");

// Send a message (also saved to DB)
router.post("/", auth, async (req, res) => {
    try {
        const { receiverId, text } = req.body;
        const msg = await Message.create({
            senderId: req.userId,
            receiverId,
            text
        });
        const populated = await msg.populate("senderId", "name");
        res.json(populated);
    } catch (err) {
        res.status(500).json({ message: "Failed to send message" });
    }
});

// Get conversation between two users
router.get("/:user2", auth, async (req, res) => {
    try {
        const msgs = await Message.find({
            $or: [
                { senderId: req.userId, receiverId: req.params.user2 },
                { senderId: req.params.user2, receiverId: req.userId }
            ]
        })
            .sort({ createdAt: 1 })
            .populate("senderId", "name");

        // Mark messages as read
        await Message.updateMany(
            { senderId: req.params.user2, receiverId: req.userId, read: false },
            { read: true }
        );

        res.json(msgs);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch messages" });
    }
});

// Get all conversations (latest message per user)
router.get("/", auth, async (req, res) => {
    try {
        const msgs = await Message.find({
            $or: [{ senderId: req.userId }, { receiverId: req.userId }]
        })
            .sort({ createdAt: -1 })
            .populate("senderId", "name")
            .populate("receiverId", "name");

        // Deduplicate: one entry per conversation partner
        const seen = new Set();
        const conversations = [];
        for (const msg of msgs) {
            const partnerId =
                msg.senderId._id.toString() === req.userId.toString()
                    ? msg.receiverId._id.toString()
                    : msg.senderId._id.toString();
            if (!seen.has(partnerId)) {
                seen.add(partnerId);
                conversations.push(msg);
            }
        }
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch conversations" });
    }
});

// Unread message count
router.get("/unread/count", auth, async (req, res) => {
    try {
        const count = await Message.countDocuments({
            receiverId: req.userId,
            read: false
        });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ count: 0 });
    }
});

module.exports = router;
