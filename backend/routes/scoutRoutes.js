const express = require('express');
const router = express.Router();
const {
    searchAthletes,
    getAthletes,
    getScoutProfile,
    updateScoutProfile,
    getScoutStats
} = require('../controllers/scoutController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Scout Dashboard Routes
router.get('/profile', protect, getScoutProfile);
router.post('/profile', protect, upload.single('profilePhoto'), updateScoutProfile); // Handle create/update
router.put('/profile', protect, upload.single('profilePhoto'), updateScoutProfile); // Explicit PUT

router.get('/stats', protect, getScoutStats);

// Search can be public or protected. User requested "Scout Dashboard" for search.
// Usually search is restricted to scouts or at least logged users. 
// "Roles: Athlete, Scout".
router.get('/search', protect, searchAthletes);
router.get('/', getAthletes); // Initial load or public browse

module.exports = router;
