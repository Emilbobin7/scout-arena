const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { uploadVideo, getMyVideos, getVideosByUser } = require("../controllers/videoController");

router.post("/", auth, upload.single("video"), uploadVideo);
router.get("/", auth, getMyVideos);
router.get("/:userId", getVideosByUser);

module.exports = router;
