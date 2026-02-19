const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);
