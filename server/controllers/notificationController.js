const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');

// @desc    Get notifications for current user
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ userId: req.userId })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('fromUser', 'name profilePhoto');

    res.status(200).json(notifications);
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    if (notification.userId.toString() !== req.userId) {
        res.status(401);
        throw new Error('Not authorized');
    }

    notification.read = true;
    await notification.save();

    res.status(200).json(notification);
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = asyncHandler(async (req, res) => {
    await Notification.updateMany({ userId: req.userId, read: false }, { read: true });
    res.status(200).json({ message: 'All notifications marked as read' });
});

// @desc    Get unread notification count
// @route   GET /api/notifications/count
// @access  Private
const getUnreadCount = asyncHandler(async (req, res) => {
    const count = await Notification.countDocuments({ userId: req.userId, read: false });
    res.status(200).json({ count });
});

module.exports = { getNotifications, markAsRead, markAllAsRead, getUnreadCount };
