const asyncHandler = require('express-async-handler');
const Achievement = require('../models/Achievement');

// @desc    Add Achievement
// @route   POST /api/achievements
// @access  Private
const addAchievement = asyncHandler(async (req, res) => {
    const { title, year, description } = req.body;

    if (!title || !year || !description) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const achievement = await Achievement.create({
        userId: req.user.id,
        title,
        year,
        description
    });

    res.status(200).json(achievement);
});

// @desc    Get My Achievements
// @route   GET /api/achievements
// @access  Private
const getAchievements = asyncHandler(async (req, res) => {
    const achievements = await Achievement.find({ userId: req.user.id }).sort({ year: -1 });
    res.status(200).json(achievements);
});

// @desc    Get User Achievements (Public)
// @route   GET /api/achievements/:userId
// @access  Public
const getUserAchievements = asyncHandler(async (req, res) => {
    const achievements = await Achievement.find({ userId: req.params.userId }).sort({ year: -1 });
    res.status(200).json(achievements);
});

// @desc    Delete Achievement
// @route   DELETE /api/achievements/:id
// @access  Private
const deleteAchievement = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
        res.status(400);
        throw new Error('Achievement not found');
    }

    if (achievement.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await achievement.deleteOne(); // Mongoose v7+ use deleteOne()

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    addAchievement,
    getAchievements,
    getUserAchievements,
    deleteAchievement
};
