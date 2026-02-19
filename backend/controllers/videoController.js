const asyncHandler = require('express-async-handler');
const Video = require('../models/Video');

// @desc    Upload Video & Generate Analytics
// @route   POST /api/videos
// @access  Private
const uploadVideo = asyncHandler(async (req, res) => {
    const { title, thumbnailUrl } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please add a title');
    }

    let videoUrl = '';
    if (req.file) {
        // Construct URL relative to server root. 
        // Assuming server serves /uploads static folder.
        // req.file.path is like 'uploads\videos\video-123.mp4' (windows style)
        // We need standard URL format: '/uploads/videos/video-123.mp4'
        videoUrl = '/' + req.file.path.replace(/\\/g, '/');
    } else if (req.body.videoUrl) {
        videoUrl = req.body.videoUrl;
    } else {
        res.status(400);
        throw new Error('Please upload a video file or provide a URL');
    }

    // Generate Dummy AI Analytics (Random 70-95)
    const speedScore = Math.floor(Math.random() * (95 - 70 + 1)) + 70;
    const agilityScore = Math.floor(Math.random() * (95 - 70 + 1)) + 70;
    const accuracyScore = Math.floor(Math.random() * (95 - 70 + 1)) + 70;
    const reactionScore = Math.floor(Math.random() * (95 - 70 + 1)) + 70;

    const video = await Video.create({
        userId: req.user.id,
        title,
        videoUrl,
        thumbnailUrl: thumbnailUrl || 'https://via.placeholder.com/300x200',
        speedScore,
        agilityScore,
        accuracyScore,
        reactionScore
    });

    // Update Athlete Profile Stats
    // 1. Get all user videos
    const videos = await Video.find({ userId: req.user.id });

    if (videos.length > 0) {
        const avgSpeed = Math.round(videos.reduce((acc, v) => acc + v.speedScore, 0) / videos.length);
        const avgAgility = Math.round(videos.reduce((acc, v) => acc + v.agilityScore, 0) / videos.length);
        const avgAccuracy = Math.round(videos.reduce((acc, v) => acc + v.accuracyScore, 0) / videos.length);
        const avgReaction = Math.round(videos.reduce((acc, v) => acc + v.reactionScore, 0) / videos.length);

        const AthleteProfile = require('../models/AthleteProfile'); // Import here to avoid circular dep if any
        await AthleteProfile.findOneAndUpdate(
            { userId: req.user.id },
            {
                $set: {
                    'stats.speed': avgSpeed,
                    'stats.agility': avgAgility,
                    'stats.accuracy': avgAccuracy,
                    'stats.reaction': avgReaction
                }
            }
        );
    }

    // Create Activity
    const Activity = require('../models/Activity');
    await Activity.create({
        userId: req.user.id,
        type: 'upload',
        refId: video._id,
        description: `uploaded a new video: ${title}`
    });

    res.status(200).json(video);
});

// @desc    Get My Videos
// @route   GET /api/videos
// @access  Private
const getMyVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(videos);
});

// @desc    Get User Videos (Public)
// @route   GET /api/videos/:userId
// @access  Public
const getUserVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(videos);
});

// @desc    Delete Video
// @route   DELETE /api/videos/:id
// @access  Private
const deleteVideo = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id);

    if (!video) {
        res.status(400);
        throw new Error('Video not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the video user
    if (video.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await video.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    uploadVideo,
    getMyVideos,
    getUserVideos,
    deleteVideo
};
