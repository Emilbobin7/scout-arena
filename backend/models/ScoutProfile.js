const mongoose = require('mongoose');

const scoutProfileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: { type: String, required: true },
    profilePhoto: { type: String, default: 'https://via.placeholder.com/150' },
    organization: { type: String },
    designation: { type: String }, // e.g., Chief Scout, Recruiter
    experience: { type: Number }, // Years of experience
    specializationSport: { type: String }, // e.g., Football, Cricket
    location: { type: String },
    bio: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.models.ScoutProfile || mongoose.model('ScoutProfile', scoutProfileSchema);
