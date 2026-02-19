const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUserProfile, addVideo } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getUsers);
router.route('/profile').put(protect, updateUserProfile);
router.route('/video').post(protect, addVideo);
router.route('/:id').get(getUserById);

module.exports = router;
