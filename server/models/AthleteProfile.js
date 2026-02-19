const mongoose = require("mongoose");

const athleteProfile = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,             // display name (mirrors User.name for convenience)
    sport: String,
    position: String,
    age: Number,
    height: Number,
    weight: Number,
    location: String,
    bio: String,
    profilePhoto: String,
    coverPhoto: String,       // NEW — banner image at top of profile
    stats: {                  // AI skill scores
        speed: { type: Number, default: 0 },
        agility: { type: Number, default: 0 },
        accuracy: { type: Number, default: 0 },
        reaction: { type: Number, default: 0 },
    },
}, { timestamps: true });

module.exports = mongoose.model("AthleteProfile", athleteProfile);
