const asyncHandler = require('express-async-handler');
const ScoutProfile = require('../models/ScoutProfile');
const Follow = require('../models/Follow');
const User = require('../models/userModel'); // If needed for stats
const AthleteProfile = require('../models/AthleteProfile');

// @desc    Get Scout Profile (Current User)
// @route   GET /api/scout/profile
// @access  Private (Scout)
const getScoutProfile = asyncHandler(async (req, res) => {
    const profile = await ScoutProfile.findOne({ userId: req.user.id }).populate('userId', 'name email');
    if (profile) {
        res.json(profile);
    } else {
        res.status(404);
        throw new Error('Scout profile not found');
    }
});

// @desc    Create or Update Scout Profile
// @route   POST /api/scout/profile
// @access  Private (Scout)
const updateScoutProfile = asyncHandler(async (req, res) => {
    const {
        fullName, organization, designation, experience,
        specializationSport, location, bio, contactEmail, contactPhone
    } = req.body;

    let profile = await ScoutProfile.findOne({ userId: req.user.id });

    if (!profile) {
        // Create
        const profileFields = {
            userId: req.user.id,
            fullName: fullName || req.user.name,
            organization, designation, experience, specializationSport,
            location, bio, contactEmail, contactPhone,
            profilePhoto: req.file ? '/' + req.file.path.replace(/\\/g, '/') : 'https://via.placeholder.com/150'
        };
        profile = await ScoutProfile.create(profileFields);
    } else {
        // Update
        profile.fullName = fullName || profile.fullName;
        profile.organization = organization || profile.organization;
        profile.designation = designation || profile.designation;
        profile.experience = experience || profile.experience;
        profile.specializationSport = specializationSport || profile.specializationSport;
        profile.location = location || profile.location;
        profile.bio = bio || profile.bio;
        profile.contactEmail = contactEmail || profile.contactEmail;
        profile.contactPhone = contactPhone || profile.contactPhone;

        if (req.file) {
            profile.profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
        }
        await profile.save();
    }
    res.json(profile);
});


// @desc    Get Scout Stats (Dashboard)
// @route   GET /api/scout/stats
// @access  Private (Scout)
const getScoutStats = asyncHandler(async (req, res) => {
    // Count followed athletes
    const followingCount = await Follow.countDocuments({ followerId: req.user.id });

    // Total athletes on platform (for "Network" stat or similar)
    const totalAthletes = await AthleteProfile.countDocuments({});

    // View stats could be simulated or from Activity logs if we tracked views
    // For now, let's just return what we have
    res.json({
        followingCount,
        totalAthletes,
        views: 0 // Placeholder/Future implementation
    });
});

// @desc    Search Athletes
// @route   GET /api/athletes/search
// @access  Public (or Private?)
const searchAthletes = asyncHandler(async (req, res) => {
    const { sport, position, location, minAge, maxAge, minSpeed, minAgility } = req.query;

    let query = {};

    if (sport) query.sport = sport;
    if (position) query.position = position;
    if (location) query.location = { $regex: location, $options: 'i' };

    if (minAge || maxAge) {
        query.age = {};
        if (minAge) query.age.$gte = Number(minAge);
        if (maxAge) query.age.$lte = Number(maxAge);
    }

    if (minSpeed) {
        query['stats.speed'] = { $gte: Number(minSpeed) };
    }
    if (minAgility) {
        query['stats.agility'] = { $gte: Number(minAgility) };
    }

    const athletes = await AthleteProfile.find(query).populate('userId', 'name email profilePhoto');

    res.json(athletes);
});

// @desc    Get All Athletes (for initial load)
// @route   GET /api/athletes
// @access  Public
const getAthletes = asyncHandler(async (req, res) => {
    const athletes = await AthleteProfile.find({}).populate('userId', 'name email profilePhoto');
    res.json(athletes);
});

module.exports = {
    searchAthletes,
    getAthletes,
    getScoutProfile,
    updateScoutProfile,
    getScoutStats
};
