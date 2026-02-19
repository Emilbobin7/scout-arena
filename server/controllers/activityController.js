const Activity = require("../models/Activity");

// Internal helper — called from other controllers (not a route handler)
exports.createActivity = async (data) => {
    try {
        await Activity.create(data);
    } catch (err) {
        // Non-fatal — don't crash the main request
        console.error("Activity log failed:", err.message);
    }
};

// GET /api/activity — Public feed (latest 50)
exports.getFeed = async (req, res) => {
    try {
        const feed = await Activity.find()
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(feed);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch feed" });
    }
};
