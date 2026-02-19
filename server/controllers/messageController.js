const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const Notification = require('../models/Notification');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId, text } = req.body;

    if (!receiverId || !text) {
        res.status(400);
        throw new Error('Receiver and message text are required');
    }

    const message = await Message.create({
        senderId: req.userId,
        receiverId,
        text
    });

    // Notify receiver — only if no unread message notification from this sender today
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const alreadyNotified = await Notification.findOne({
        userId: receiverId,
        fromUser: req.userId,
        type: 'message',
        read: false,
        createdAt: { $gte: todayStart },
    });
    if (!alreadyNotified) {
        Notification.create({
            userId: receiverId,
            fromUser: req.userId,
            type: 'message',
            message: 'sent you a message',
        }).catch(() => { });
    }

    res.status(201).json(message);
});

// @desc    Get conversation between two users
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = asyncHandler(async (req, res) => {
    const messages = await Message.find({
        $or: [
            { senderId: req.userId, receiverId: req.params.userId },
            { senderId: req.params.userId, receiverId: req.userId }
        ]
    }).sort({ createdAt: 1 });

    // Mark received messages as read
    await Message.updateMany(
        { senderId: req.params.userId, receiverId: req.userId, read: false },
        { read: true }
    );

    res.status(200).json(messages);
});

// @desc    Get all conversations (list of users messaged)
// @route   GET /api/messages
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
    const messages = await Message.find({
        $or: [{ senderId: req.userId }, { receiverId: req.userId }]
    })
        .sort({ createdAt: -1 })
        .populate('senderId', 'name profilePhoto')
        .populate('receiverId', 'name profilePhoto');

    // Get unique conversation partners
    const seen = new Set();
    const conversations = messages.filter(msg => {
        const partnerId = msg.senderId._id.toString() === req.userId.toString()
            ? msg.receiverId._id.toString()
            : msg.senderId._id.toString();
        if (seen.has(partnerId)) return false;
        seen.add(partnerId);
        return true;
    });

    res.status(200).json(conversations);
});

module.exports = { sendMessage, getConversation, getConversations };
