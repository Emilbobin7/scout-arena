const mongoose = require('mongoose');

const athleteProfileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sport: { type: String, required: true },
    position: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: String, required: true }, // e.g., "6'1""
    weight: { type: String, required: true }, // e.g., "180 lbs"
    location: { type: String, required: true },
    bio: { type: String },
    profilePhoto: { type: String, default: 'https://via.placeholder.com/150' },
    stats: {
        speed: { type: Number, default: 0 },
        agility: { type: Number, default: 0 },
        accuracy: { type: Number, default: 0 },
        reaction: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.AthleteProfile || mongoose.model('AthleteProfile', athleteProfileSchema);
