const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["video", "follow", "achievement", "join", "like"],
        default: "join"
    },
    text: String,
    meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
