const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createActivity } = require("./activityController");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "User exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role
        });

        // Log activity
        if (role === "athlete") {
            createActivity({
                userId: user._id,
                type: "join",
                text: "joined the platform"
            });
        }

        res.json(user);
    } catch {
        res.status(500).json({ message: "Registration failed" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.json({ token, user });
    } catch {
        res.status(500).json({ message: "Login failed" });
    }
};
