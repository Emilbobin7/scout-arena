const asyncHandler = require('express-async-handler');
const Video = require('../models/Video');

// @desc    Get analytics data
// @route   GET /api/analytics
// @access  Private
const getAnalytics = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const videos = await Video.find({ userId });

    let analytics = {
        speed: 0,
        agility: 0,
        accuracy: 0,
        reaction: 0,
        totalVideos: videos.length
    };

    if (videos.length > 0) {
        let totalSpeed = 0;
        let totalAgility = 0;
        let totalAccuracy = 0;
        let totalReaction = 0;

        videos.forEach(video => {
            // Handle both old flat structure and new nested structure for backward compatibility/robustness
            const speed = video.aiScores?.speed || video.speedScore || 0;
            const agility = video.aiScores?.agility || video.agilityScore || 0;
            const accuracy = video.aiScores?.accuracy || video.accuracyScore || 0;
            const reaction = video.aiScores?.reaction || video.reactionScore || 0;

            totalSpeed += speed;
            totalAgility += agility;
            totalAccuracy += accuracy;
            totalReaction += reaction;
        });

        analytics.speed = Math.round(totalSpeed / videos.length);
        analytics.agility = Math.round(totalAgility / videos.length);
        analytics.accuracy = Math.round(totalAccuracy / videos.length);
        analytics.reaction = Math.round(totalReaction / videos.length);
    }

    res.json(analytics);
});

module.exports = {
    getAnalytics
};
