const asyncHandler = require('express-async-handler');
const AthleteProfile = require('../models/AthleteProfile');
const User = require('../models/User');

// @desc    Create or Update Athlete Profile
// @route   POST /api/profile
// @access  Private
const createProfile = asyncHandler(async (req, res) => {
    const { sport, position, age, height, weight, location, bio } = req.body;

    let profilePhoto = 'https://via.placeholder.com/150';
    if (req.file) {
        // Correct path for serving static files
        profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    } else if (req.body.profilePhoto) {
        profilePhoto = req.body.profilePhoto;
    }

    const profileFields = {
        userId: req.userId,
        sport,
        position,
        age,
        height,
        weight,
        location,
        bio,
        profilePhoto
    };

    // Upsert logic
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
// @route   GET /api/profile
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
// @route   PUT /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const { sport, position, age, height, weight, location, bio } = req.body;

    let profile = await AthleteProfile.findOne({ userId: req.userId });

    if (!profile) {
        const profileFields = {
            userId: req.userId,
            sport: sport || 'Unknown',
            position: position || 'Unknown',
            age: age || 0,
            height: height || 'N/A',
            weight: weight || 'N/A',
            location: location || 'Unknown',
            bio: bio || '',
            profilePhoto: req.file ? '/' + req.file.path.replace(/\\/g, '/') : 'https://via.placeholder.com/150'
        };
        profile = await AthleteProfile.create(profileFields);
        return res.json(profile);
    }

    profile.sport = sport || profile.sport;
    profile.position = position || profile.position;
    profile.age = age || profile.age;
    profile.height = height || profile.height;
    profile.weight = weight || profile.weight;
    profile.location = location || profile.location;
    profile.bio = bio || profile.bio;

    if (req.file) {
        profile.profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
});

// @desc    Get Profile by User ID
// @route   GET /api/profile/:userId
// @access  Public
const getProfileByUserId = asyncHandler(async (req, res) => {
    const profile = await AthleteProfile.findOne({ userId: req.params.userId }).populate('userId', 'name email profilePhoto');

    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    res.json(profile);
});

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    getProfileByUserId
};
