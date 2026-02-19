const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    }
}, {
    timestamps: true
});

// Prevent duplicate likes
likeSchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.models.Like || mongoose.model('Like', likeSchema);
