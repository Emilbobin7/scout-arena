const express = require('express');
const router = express.Router();
const { followUser, unfollowUser, likeVideo, unlikeVideo, getActivity } = require('../controllers/socialController');
const { protect } = require('../middleware/authMiddleware');

router.post('/follow', protect, followUser);
router.delete('/follow', protect, unfollowUser);
router.post('/like', protect, likeVideo);
router.delete('/like', protect, unlikeVideo);
router.get('/activity', protect, getActivity);

module.exports = router;
