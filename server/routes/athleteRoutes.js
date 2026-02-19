const express = require('express');
const router = express.Router();
const {
    createProfile, getProfile, updateProfile, getProfileByUserId,
    addAchievement, getAchievements, getUserAchievements, deleteAchievement,
    getAnalytics
} = require('../controllers/athleteController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Profile routes
router.post('/profile', auth, upload.single('profilePhoto'), createProfile);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('profilePhoto'), updateProfile);
router.get('/profile/:userId', getProfileByUserId);

// Achievement routes
router.post('/achievements', auth, addAchievement);
router.get('/achievements', auth, getAchievements);
router.get('/achievements/:userId', getUserAchievements);
router.delete('/achievements/:id', auth, deleteAchievement);

// Analytics routes
router.get('/analytics', auth, getAnalytics);

module.exports = router;
