const express = require('express');
const router = express.Router();
const { likeVideo, unlikeVideo } = require('../controllers/likeController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, likeVideo);
router.delete('/', protect, unlikeVideo);

module.exports = router;
