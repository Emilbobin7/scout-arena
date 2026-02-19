const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
    getFollowStatus
} = require("../controllers/followController");

router.post("/", auth, follow);
router.delete("/", auth, unfollow);
router.get("/followers/:userId", getFollowers);
router.get("/following", auth, getFollowing);
router.get("/status/:userId", auth, getFollowStatus);

module.exports = router;
