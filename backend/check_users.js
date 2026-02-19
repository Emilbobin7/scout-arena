const mongoose = require('mongoose');
const User = require('./models/userModel'); // Adjust path as needed
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scout-arena');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const checkUsers = async () => {
    await connectDB();
    const users = await User.find({});
    console.log(`Total Users: ${users.length}`);
    users.forEach(user => {
        console.log(`- ${user.name} (${user.email}) [${user.role}]`);
    });
    process.exit();
};

checkUsers();
