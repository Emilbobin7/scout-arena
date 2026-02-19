const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const AthleteProfile = require('../models/AthleteProfile');
const Video = require('../models/Video');
const Achievement = require('../models/Achievement');
const bcrypt = require('bcryptjs');

// @desc    Update password
// @route   PUT /api/settings/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);

    if (user) {
        if (req.body.password) {
            user.password = req.body.password; // Will be hashed by pre-save middleware in User model
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                token: req.headers.authorization.split(' ')[1] // Return same token
            });
        } else {
            res.status(400);
            throw new Error('Password is required');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete account
// @route   DELETE /api/settings/account
// @access  Private
const deleteAccount = asyncHandler(async (req, res) => {
    const userId = req.userId;

    // Delete everything related to user
    await AthleteProfile.deleteOne({ userId });
    await Video.deleteMany({ userId });
    await Achievement.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Account deleted successfully' });
});

module.exports = {
    updatePassword,
    deleteAccount
};
