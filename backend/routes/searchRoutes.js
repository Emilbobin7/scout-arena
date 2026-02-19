const express = require('express');
const router = express.Router();
const { searchAthletes, getPublicProfile } = require('../controllers/searchController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, searchAthletes);
router.get('/profile/:id', protect, getPublicProfile);

module.exports = router;
