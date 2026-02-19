const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, getProfileByUserId } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

// Using upload middleware on POST (create/update) and PUT (update)
// Frontend mainly uses POST /api/profile for updates based on previous steps
router.post('/', protect, upload.single('profilePhoto'), createProfile);
router.get('/', protect, getProfile);
router.put('/', protect, upload.single('profilePhoto'), updateProfile);
router.get('/:userId', getProfileByUserId); // Public

module.exports = router;
