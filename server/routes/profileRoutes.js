const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, getProfileByUserId } = require('../controllers/profileController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('profilePhoto'), createProfile);
router.get('/', protect, getProfile);
router.put('/', protect, upload.single('profilePhoto'), updateProfile);
router.get('/:userId', getProfileByUserId);

module.exports = router;
