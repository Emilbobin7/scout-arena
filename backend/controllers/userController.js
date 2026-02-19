const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Get all users (with filters)
// @route   GET /api/users
// @access  Public (or Protected?)
const getUsers = asyncHandler(async (req, res) => {
    const { role, sport, position, minAge, maxAge, location } = req.query;

    let query = {};

    if (role) query.role = role;
    if (sport) query.sport = sport;
    if (position) query.position = position;
    if (location) query.location = { $regex: location, $options: 'i' };

    if (minAge || maxAge) {
        query.age = {};
        if (minAge) query.age.$gte = Number(minAge);
        if (maxAge) query.age.$lte = Number(maxAge);
    }

    const users = await User.find(query).select('-password');
    res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.location = req.body.location || user.location;
        user.bio = req.body.bio || user.bio;
        user.profileImage = req.body.profileImage || user.profileImage;

        // Convert string inputs to numbers where appropriate
        if (req.body.age) user.age = Number(req.body.age);
        if (req.body.height) user.height = Number(req.body.height);
        if (req.body.weight) user.weight = Number(req.body.weight);

        // Specific fields
        if (req.body.sport) user.sport = req.body.sport;
        if (req.body.position) user.position = req.body.position;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: req.body.token, // Keep token if passed, though usually not needed here
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Add a video
// @route   POST /api/users/video
// @access  Private
const addVideo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        const { url, description, title } = req.body;

        // Simulate AI Scoring
        const aiScores = {
            speed: Math.floor(Math.random() * (99 - 70) + 70),
            agility: Math.floor(Math.random() * (99 - 70) + 70),
            accuracy: Math.floor(Math.random() * (99 - 70) + 70),
            strength: Math.floor(Math.random() * (99 - 70) + 70),
        };

        const newVideo = {
            url,
            description,
            title, // assuming video schema has title or maybe not needed
            aiScores
        };

        user.videos.push(newVideo);

        // Update main skills (average or max?) - for now let's just keep last
        // or maybe average.
        user.skills = aiScores;

        await user.save();
        res.status(201).json(user.videos);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    getUsers,
    getUserById,
    updateUserProfile,
    addVideo,
};
