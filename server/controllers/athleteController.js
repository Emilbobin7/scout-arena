const asyncHandler = require('express-async-handler');
const AthleteProfile = require('../models/AthleteProfile');
const User = require('../models/User');
const { createActivity } = require("./activityController");

// @desc    Create or Update Athlete Profile
// @route   POST /api/athlete/profile
// @access  Private
const createProfile = asyncHandler(async (req, res) => {
    const { sport, position, age, height, weight, location, bio } = req.body;

    let profilePhoto = 'https://via.placeholder.com/150';
    if (req.file) {
        profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    } else if (req.body.profilePhoto) {
        profilePhoto = req.body.profilePhoto;
    }

    const profileFields = { userId: req.userId, sport, position, age, height, weight, location, bio, profilePhoto };

    let profile = await AthleteProfile.findOne({ userId: req.userId });

    if (profile) {
        if (req.file) profileFields.profilePhoto = profilePhoto;
        else delete profileFields.profilePhoto;

        profile = await AthleteProfile.findOneAndUpdate(
            { userId: req.userId },
            { $set: profileFields },
            { new: true }
        );
        return res.json(profile);
    }

    profile = await AthleteProfile.create(profileFields);
    res.json(profile);
});

// @desc    Get Current User Profile
// @route   GET /api/athlete/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const profile = await AthleteProfile.findOne({ userId: req.userId }).populate('userId', 'name email');

    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    res.json(profile);
});

// @desc    Update Profile (PUT)
// @route   PUT /api/athlete/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const fields = ['name', 'sport', 'position', 'age', 'height', 'weight', 'location', 'bio'];

    const update = {};
    fields.forEach(f => {
        if (req.body[f] !== undefined) update[f] = req.body[f];
    });

    if (req.file) {
        update.profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    }

    const profile = await AthleteProfile.findOneAndUpdate(
        { userId: req.userId },
        { $set: { ...update, userId: req.userId } },
        { new: true, upsert: true, runValidators: false }
    );

    res.json(profile);
});


// @desc    Get Profile by User ID (Public)
// @route   GET /api/athlete/profile/:userId
// @access  Public
const getProfileByUserId = asyncHandler(async (req, res) => {
    const profile = await AthleteProfile.findOne({ userId: req.params.userId }).populate('userId', 'name email profilePhoto');

    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    res.json(profile);
});

// @desc    Add Achievement
// @route   POST /api/athlete/achievements
// @access  Private
const addAchievement = asyncHandler(async (req, res) => {
    const Achievement = require('../models/Achievement');
    const { title, year, description } = req.body;

    if (!title || !year || !description) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const achievement = await Achievement.create({ userId: req.userId, title, year, description });

    // Log activity
    createActivity({
        userId: req.userId,
        type: "achievement",
        text: `added a new achievement: ${title}`
    });

    res.status(200).json(achievement);
});

// @desc    Get My Achievements
// @route   GET /api/athlete/achievements
// @access  Private
const getAchievements = asyncHandler(async (req, res) => {
    const Achievement = require('../models/Achievement');
    const achievements = await Achievement.find({ userId: req.userId }).sort({ year: -1 });
    res.status(200).json(achievements);
});

// @desc    Get User Achievements (Public)
// @route   GET /api/athlete/achievements/:userId
// @access  Public
const getUserAchievements = asyncHandler(async (req, res) => {
    const Achievement = require('../models/Achievement');
    const achievements = await Achievement.find({ userId: req.params.userId }).sort({ year: -1 });
    res.status(200).json(achievements);
});

// @desc    Delete Achievement
// @route   DELETE /api/athlete/achievements/:id
// @access  Private
const deleteAchievement = asyncHandler(async (req, res) => {
    const Achievement = require('../models/Achievement');
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
        res.status(400);
        throw new Error('Achievement not found');
    }

    if (achievement.userId.toString() !== req.userId) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await achievement.deleteOne();
    res.status(200).json({ id: req.params.id });
});

// @desc    Get analytics data
// @route   GET /api/athlete/analytics
// @access  Private
const getAnalytics = asyncHandler(async (req, res) => {
    const Video = require('../models/Video');
    const userId = req.userId;
    const videos = await Video.find({ userId });

    let analytics = { speed: 0, agility: 0, accuracy: 0, reaction: 0, totalVideos: videos.length };

    if (videos.length > 0) {
        let totalSpeed = 0, totalAgility = 0, totalAccuracy = 0, totalReaction = 0;

        videos.forEach(video => {
            totalSpeed += video.aiScores?.speed || video.speedScore || 0;
            totalAgility += video.aiScores?.agility || video.agilityScore || 0;
            totalAccuracy += video.aiScores?.accuracy || video.accuracyScore || 0;
            totalReaction += video.aiScores?.reaction || video.reactionScore || 0;
        });

        analytics.speed = Math.round(totalSpeed / videos.length);
        analytics.agility = Math.round(totalAgility / videos.length);
        analytics.accuracy = Math.round(totalAccuracy / videos.length);
        analytics.reaction = Math.round(totalReaction / videos.length);
    }

    res.json(analytics);
});

module.exports = {
    createProfile, getProfile, updateProfile, getProfileByUserId,
    addAchievement, getAchievements, getUserAchievements, deleteAchievement,
    getAnalytics
};
