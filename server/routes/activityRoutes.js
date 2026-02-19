const router = require("express").Router();
const { getFeed } = require("../controllers/activityController");

router.get("/", getFeed);

module.exports = router;
