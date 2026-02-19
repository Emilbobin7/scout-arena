const express = require('express');
const router = express.Router();
const { addAchievement, getAchievements, getUserAchievements, deleteAchievement } = require('../controllers/achievementController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addAchievement);
router.get('/', protect, getAchievements);
router.get('/:userId', getUserAchievements); // Public
router.delete('/:id', protect, deleteAchievement);

module.exports = router;
