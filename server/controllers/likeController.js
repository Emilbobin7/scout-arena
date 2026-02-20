const asyncHandler = require('express-async-handler');
const Like = require('../models/Like');
const { createActivity } = require('./activityController');

// @desc    Like Video
// @route   POST /api/like
// @access  Private
const likeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.body;

    const alreadyLiked = await Like.findOne({
        userId: req.userId,
        videoId
    });

    if (alreadyLiked) {
        res.status(400);
        throw new Error('Already liked');
    }

    const like = await Like.create({
        userId: req.userId,
        videoId
    });

    // Create Activity
    createActivity({
        userId: req.userId,
        type: 'like',
        text: 'liked a video',
        meta: { videoId }
    });

    res.status(200).json(like);
});

// @desc    Unlike Video
// @route   DELETE /api/like
// @access  Private
const unlikeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.body;

    await Like.findOneAndDelete({
        userId: req.userId,
        videoId
    });

    res.status(200).json({ message: 'Unliked' });
});

module.exports = {
    likeVideo,
    unlikeVideo
};
