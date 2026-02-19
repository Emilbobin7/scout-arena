const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['video_upload', 'achievement_added', 'follow']
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        // Can refer to Video, Achievement, or User (for follow)
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
