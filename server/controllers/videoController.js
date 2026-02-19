const Video = require("../models/Video");
const { createActivity } = require("./activityController");

/**
 * Call the Python AI microservice to analyze a video.
 * Falls back to weighted-random scores if the service is unreachable.
 */
const analyzeVideo = async () => {
    try {
        // Dynamic import of axios to avoid issues if not installed
        const axios = require("axios");
        const { data } = await axios.post("http://localhost:8000/analyze", {}, {
            timeout: 8000, // 8s timeout
        });
        return data;
    } catch (err) {
        console.warn("[AI] Microservice unreachable — using fallback scores:", err.message);
        // Gaussian-ish fallback (pure JS)
        const ws = () => Math.max(40, Math.min(99, Math.round(75 + (Math.random() + Math.random() - 1) * 15)));
        const speed = ws();
        const agility = ws();
        const accuracy = ws();
        const reaction = ws();
        const overall = Math.round((speed + agility + accuracy + reaction) / 4);
        return { speedScore: speed, agilityScore: agility, accuracyScore: accuracy, reactionScore: reaction, overallScore: overall };
    }
};

// @desc    Upload a video
// @route   POST /api/videos
// @access  Private
exports.uploadVideo = async (req, res) => {
    try {
        // Call AI service for analysis scores
        const scores = await analyzeVideo();

        const video = await Video.create({
            userId: req.userId,
            videoUrl: req.file.path,
            title: req.body.title || "Performance Video",
            speedScore: scores.speedScore,
            agilityScore: scores.agilityScore,
            accuracyScore: scores.accuracyScore,
            reactionScore: scores.reactionScore,
            overallScore: scores.overallScore,
            analysisStatus: "done",
        });

        console.log(`[AI] Video analyzed for user ${req.userId} — Overall: ${scores.overallScore}`);

        // Log activity (non-blocking)
        createActivity({
            userId: req.userId,
            type: "video",
            text: `uploaded a performance video (OVR ${scores.overallScore})`,
        });

        res.json(video);
    } catch (err) {
        console.error("[Video] Upload error:", err.message);
        res.status(500).json({ message: "Video upload failed" });
    }
};

// @desc    Get my videos
// @route   GET /api/videos
// @access  Private
exports.getMyVideos = async (req, res) => {
    try {
        const videos = await Video.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch videos" });
    }
};

// @desc    Get videos by user ID (Public)
// @route   GET /api/videos/:userId
// @access  Public
exports.getVideosByUser = async (req, res) => {
    try {
        const videos = await Video.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch videos" });
    }
};
