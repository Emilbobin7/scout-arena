const mongoose = require("mongoose");

const scoutProfile = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    organization: String,
    designation: String,
    experience: String,
    location: String,
    bio: String,
    profilePhoto: String
});

module.exports = mongoose.model("ScoutProfile", scoutProfile);
