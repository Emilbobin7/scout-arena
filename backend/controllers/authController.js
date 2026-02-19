const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, sport, position } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password, // Middleware will hash this
        role: role || 'athlete'
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

        // 3. Create initial Athlete Profile if role is athlete
        if (user.role === 'athlete') {
            const AthleteProfile = require('../models/AthleteProfile');
            await AthleteProfile.create({
                userId: user._id,
                sport: sport || 'Unknown',
                position: position || 'Unknown',
                age: 0, // Defaults
                height: 'N/A',
                weight: 'N/A',
                location: 'Unknown',
                bio: 'New Athlete',
                profilePhoto: 'https://via.placeholder.com/150'
            });
        } else if (user.role === 'scout') {
            const ScoutProfile = require('../models/ScoutProfile');
            await ScoutProfile.create({
                userId: user._id,
                fullName: user.name,
                organization: 'Independent',
                designation: 'Scout',
                experience: 0,
                specializationSport: 'All',
                location: 'Unknown',
                bio: 'New Scout',
                contactEmail: user.email,
                contactPhone: '',
                profilePhoto: 'https://via.placeholder.com/150'
            });
        }

    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
