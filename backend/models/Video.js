const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    speedScore: { type: Number, default: 0 },
    agilityScore: { type: Number, default: 0 },
    accuracyScore: { type: Number, default: 0 },
    reactionScore: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.models.Video || mongoose.model('Video', videoSchema);
