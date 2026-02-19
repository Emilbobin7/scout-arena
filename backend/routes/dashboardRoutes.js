const express = require('express');
const router = express.Router();
const {
    getDashboardData,
    updateProfile,
    addAchievement,
    deleteAchievement
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getDashboardData);
router.put('/profile', protect, updateProfile);
// Video routes are handled in videoRoutes.js
router.post('/achievement', protect, addAchievement);
router.delete('/achievement/:id', protect, deleteAchievement); // Added delete route

module.exports = router;
