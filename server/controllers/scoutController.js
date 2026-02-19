const asyncHandler = require('express-async-handler');
const ScoutProfile = require('../models/ScoutProfile');
const Follow = require('../models/Follow');
const AthleteProfile = require('../models/AthleteProfile');

// @desc    Get Scout Profile (Current User)
// @route   GET /api/scout/profile
// @access  Private (Scout)
const getScoutProfile = asyncHandler(async (req, res) => {
    const profile = await ScoutProfile.findOne({ userId: req.userId }).populate('userId', 'name email');
    if (profile) {
        res.json(profile);
    } else {
        res.status(404);
        throw new Error('Scout profile not found');
    }
});

// @desc    Create or Update Scout Profile
// @route   POST/PUT /api/scout/profile
// @access  Private (Scout)
const updateScoutProfile = asyncHandler(async (req, res) => {
    const fields = ['fullName', 'organization', 'designation', 'experience',
        'specializationSport', 'location', 'bio', 'contactEmail', 'contactPhone'];

    const update = {};
    fields.forEach(f => {
        if (req.body[f] !== undefined) update[f] = req.body[f];
    });

    if (req.file) {
        update.profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    }

    const profile = await ScoutProfile.findOneAndUpdate(
        { userId: req.userId },
        { $set: { ...update, userId: req.userId } },
        { new: true, upsert: true, runValidators: false }
    );

    res.json(profile);
});

// @desc    Get Scout Stats (Dashboard)
// @route   GET /api/scout/stats
// @access  Private (Scout)
const getScoutStats = asyncHandler(async (req, res) => {
    const followingCount = await Follow.countDocuments({ followerId: req.userId });
    const totalAthletes = await AthleteProfile.countDocuments({});

    res.json({ followingCount, totalAthletes, views: 0 });
});

// @desc    Search Athletes
// @route   GET /api/scout/search
// @access  Private
const searchAthletes = asyncHandler(async (req, res) => {
    const { sport, position, location, name, minAge, maxAge, minSpeed, minAgility, minOverall } = req.query;

    let query = {};
    if (sport) query.sport = { $regex: sport, $options: 'i' };
    if (position) query.position = { $regex: position, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minAge || maxAge) {
        query.age = {};
        if (minAge) query.age.$gte = Number(minAge);
        if (maxAge) query.age.$lte = Number(maxAge);
    }
    if (minSpeed) query['stats.speed'] = { $gte: Number(minSpeed) };
    if (minAgility) query['stats.agility'] = { $gte: Number(minAgility) };

    // Name search: find matching user IDs first
    if (name) {
        const User = require('../models/User');
        const matchingUsers = await User.find({ name: { $regex: name, $options: 'i' } }).select('_id');
        query.userId = { $in: matchingUsers.map(u => u._id) };
    }

    let athletes = await AthleteProfile.find(query).populate('userId', 'name email profilePhoto');

    // Post-filter by minOverall (average of 4 skills)
    if (minOverall) {
        const min = Number(minOverall);
        athletes = athletes.filter(a => {
            const s = a.stats || {};
            const avg = ((s.speed || 0) + (s.agility || 0) + (s.accuracy || 0) + (s.reaction || 0)) / 4;
            return avg >= min;
        });
    }

    res.json(athletes);
});

// @desc    Get All Athletes (for initial load)
// @route   GET /api/scout
// @access  Public
const getAthletes = asyncHandler(async (req, res) => {
    const athletes = await AthleteProfile.find({}).populate('userId', 'name email profilePhoto');
    res.json(athletes);
});

module.exports = { getScoutProfile, updateScoutProfile, getScoutStats, searchAthletes, getAthletes };
