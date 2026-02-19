const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: { type: String, default: "Performance Video" },
    videoUrl: String,
    thumbnailUrl: String,
    speedScore: { type: Number, default: 0 },
    agilityScore: { type: Number, default: 0 },
    accuracyScore: { type: Number, default: 0 },
    reactionScore: { type: Number, default: 0 },
    overallScore: { type: Number, default: 0 },
    analysisStatus: { type: String, enum: ["pending", "done", "failed"], default: "done" },
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
