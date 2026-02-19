const express = require('express');
const router = express.Router();
const { uploadVideo, getMyVideos, getUserVideos, deleteVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('video'), uploadVideo);
router.get('/', protect, getMyVideos);
router.get('/:userId', getUserVideos); // Public
router.delete('/:id', protect, deleteVideo);

module.exports = router;
