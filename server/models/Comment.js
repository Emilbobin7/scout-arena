const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    },
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
