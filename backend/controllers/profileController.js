const asyncHandler = require('express-async-handler');
const AthleteProfile = require('../models/AthleteProfile');
const User = require('../models/userModel');

// @desc    Create or Update Athlete Profile
// @route   POST /api/profile
// @access  Private
const createProfile = asyncHandler(async (req, res) => {
    const { sport, position, age, height, weight, location, bio } = req.body;

    let profilePhoto = 'https://via.placeholder.com/150';
    if (req.file) {
        profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    } else if (req.body.profilePhoto) {
        profilePhoto = req.body.profilePhoto;
    }

    // Build profile object
    const profileFields = {
        userId: req.user.id,
        sport,
        position,
        age,
        height,
        weight,
        location,
        bio,
        profilePhoto
    };

    // Check if profile exists
    // Note: createProfile maps to POST /api/profile. 
    // Usually POST creates new, PUT updates. But we can make this "upsert" or strictly create.
    // Given the route usage in frontend (POST for update), let's make it upsert.
    let profile = await AthleteProfile.findOne({ userId: req.user.id });

    if (profile) {
        // Update existing (Upsert logic)
        // If file uploaded, update photo. If not, keep existing unless explicitly cleared (not handled here)
        if (req.file) profileFields.profilePhoto = profilePhoto;
        else delete profileFields.profilePhoto; // Don't overwrite with default if no new file

        profile = await AthleteProfile.findOneAndUpdate(
            { userId: req.user.id },
            { $set: profileFields },
            { new: true }
        );
        return res.json(profile);
    }

    // Create
    profile = await AthleteProfile.create(profileFields);
    res.json(profile);
});

// @desc    Get Current User Profile
// @route   GET /api/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const profile = await AthleteProfile.findOne({ userId: req.user.id }).populate('userId', 'name email');

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

    let profile = await AthleteProfile.findOne({ userId: req.user.id });

    if (!profile) {
        // If profile doesn't exist, Create it (Upsert behavior for safety)
        const profileFields = {
            userId: req.user.id,
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

    // Update fields
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

// @desc    Get Profile by User ID (Public/Scout)
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
