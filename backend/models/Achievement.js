const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    year: {
        type: String,
        required: [true, 'Please add a year']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);
