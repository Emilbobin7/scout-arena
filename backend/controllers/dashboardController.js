const asyncHandler = require('express-async-handler');
const AthleteProfile = require('../models/AthleteProfile');
const Video = require('../models/Video');
const Achievement = require('../models/Achievement');
const User = require('../models/userModel'); // Assuming User model exists

// @desc    Get dashboard data (profile, videos, stats)
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = asyncHandler(async (req, res) => {
    const userId = req.userId;

    let profile = await AthleteProfile.findOne({ userId });

    // Create default profile if not exists (for demo purposes)
    if (!profile) {
        profile = await AthleteProfile.create({
            userId,
            sport: 'Football',
            position: 'Forward',
            age: 18,
            height: "5'10\"",
            weight: "160 lbs",
            location: 'New York, USA',
            bio: 'Aspiring professional athlete passionate about the game.',
        });
    }

    const videos = await Video.find({ userId }).sort({ createdAt: -1 });
    const achievements = await Achievement.find({ userId }).sort({ year: -1 });

    const user = await User.findById(userId);

    res.json({
        profile: {
            ...profile.toObject(),
            name: user.name,
            email: user.email
        },
        videos,
        achievements
    });
});

// @desc    Update athlete profile
// @route   PUT /api/dashboard/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const profile = await AthleteProfile.findOne({ userId });

    if (profile) {
        profile.sport = req.body.sport || profile.sport;
        profile.position = req.body.position || profile.position;
        // Handle age as number or string
        if (req.body.age) profile.age = Number(req.body.age);
        profile.height = req.body.height || profile.height;
        profile.weight = req.body.weight || profile.weight;
        profile.location = req.body.location || profile.location;
        profile.bio = req.body.bio || profile.bio;
        profile.profilePhoto = req.body.image || profile.profilePhoto;

        const updatedProfile = await profile.save();

        // Update User name if provided
        let userName = '';
        if (req.body.name) {
            const user = await User.findById(userId);
            if (user) {
                user.name = req.body.name;
                await user.save();
                userName = user.name;
            }
        } else {
            const user = await User.findById(userId);
            userName = user ? user.name : '';
        }

        res.json({ ...updatedProfile.toObject(), name: userName });
    } else {
        res.status(404);
        throw new Error('Profile not found');
    }
});

// @desc    Add achievement
// @route   POST /api/dashboard/achievement
// @access  Private
const addAchievement = asyncHandler(async (req, res) => {
    const { title, year, description } = req.body;

    const achievement = await Achievement.create({
        userId: req.userId,
        title,
        year,
        description
    });

    res.status(201).json(achievement);
});

// @desc    Delete achievement
// @route   DELETE /api/dashboard/achievement/:id
// @access  Private
const deleteAchievement = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
        res.status(404);
        throw new Error('Achievement not found');
    }

    if (achievement.userId.toString() !== req.userId) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await achievement.deleteOne();

    res.json({ id: req.params.id });
});

module.exports = {
    getDashboardData,
    updateProfile,
    addAchievement,
    deleteAchievement
};
