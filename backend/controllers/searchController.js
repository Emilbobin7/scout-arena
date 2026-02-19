const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const AthleteProfile = require('../models/AthleteProfile');

// @desc    Search and filter athletes
// @route   GET /api/search
// @access  Private (Scouts only)
const searchAthletes = asyncHandler(async (req, res) => {
    const { sport, position, location, minAge, maxAge } = req.query;

    let query = {};

    if (sport) {
        query.sport = { $regex: sport, $options: 'i' };
    }
    if (position) {
        query.position = { $regex: position, $options: 'i' };
    }
    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }
    if (minAge || maxAge) {
        query.age = {};
        if (minAge) query.age.$gte = Number(minAge);
        if (maxAge) query.age.$lte = Number(maxAge);
    }

    // Find profiles matching the query
    const profiles = await AthleteProfile.find(query).populate('userId', 'name');

    // Currently we just return profiles. 
    // In a real app, we might want to aggregate skill scores to filter by average score.
    // For now, let's keep it simple.

    res.json(profiles);
});

// @desc    Get public profile by ID
// @route   GET /api/search/profile/:id
// @access  Private
const getPublicProfile = asyncHandler(async (req, res) => {
    const profile = await AthleteProfile.findOne({ userId: req.params.id }).populate('userId', 'name');

    if (profile) {
        res.json(profile);
    } else {
        res.status(404);
        throw new Error('Profile not found');
    }
});

module.exports = {
    searchAthletes,
    getPublicProfile
};
