const express = require('express');
const router = express.Router();
const { getScoutProfile, updateScoutProfile, getScoutStats, searchAthletes, getAthletes } = require('../controllers/scoutController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/profile', auth, getScoutProfile);
router.post('/profile', auth, upload.single('profilePhoto'), updateScoutProfile);
router.put('/profile', auth, upload.single('profilePhoto'), updateScoutProfile);
router.get('/stats', auth, getScoutStats);
router.get('/search', auth, searchAthletes);
router.get('/', getAthletes);

module.exports = router;
