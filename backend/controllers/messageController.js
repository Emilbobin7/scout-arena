const Message = require('../models/Message');
const User = require('../models/userModel');

// @desc    Get conversations list (unique users messaged)
// @route   GET /api/messages
// @access  Private
const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all messages involving the user
        const messages = await Message.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        }).sort({ createdAt: -1 })
            .populate('senderId', 'name profilePhoto')
            .populate('receiverId', 'name profilePhoto');

        // Extract unique conversations
        const conversations = [];
        const seenUsers = new Set();

        for (const msg of messages) {
            const partnerId = msg.senderId._id.toString() === userId.toString()
                ? msg.receiverId._id.toString()
                : msg.senderId._id.toString();

            if (!seenUsers.has(partnerId)) {
                seenUsers.add(partnerId);
                conversations.push(msg);
            }
        }

        res.json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get messages with a specific user
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const myId = req.user._id;
        const otherId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: otherId },
                { senderId: otherId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 })
            .populate('senderId', 'name profilePhoto');

        // Mark incoming messages as read
        await Message.updateMany(
            { senderId: otherId, receiverId: myId, read: false },
            { read: true }
        );

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { receiverId, text } = req.body;
        const senderId = req.user._id;

        const message = await Message.create({
            senderId,
            receiverId,
            text
        });

        const fullMessage = await Message.findById(message._id)
            .populate('senderId', 'name profilePhoto')
            .populate('receiverId', 'name profilePhoto');

        res.status(201).json(fullMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getConversations, getMessages, sendMessage };
