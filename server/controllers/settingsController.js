const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AthleteProfile = require('../models/AthleteProfile');
const Video = require('../models/Video');
const Achievement = require('../models/Achievement');

// @desc    Update password
// @route   PUT /api/settings/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);

    if (user) {
        if (req.body.password) {
            // Note: In User.js for server, we might NOT have pre-save hash middleware if it's the simple version.
            // Let's check if we need to hash it manually.
            // Step 79 (authController) did manual hash. Step 120 (User.js) had NO methods.
            // So we MUST hash it manually here.
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                token: req.headers.authorization.split(' ')[1]
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
