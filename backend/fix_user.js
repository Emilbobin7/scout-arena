const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const email = 'emilbobin965@gmail.com';

const checkUser = async () => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log(`User found: ${user.name} (${user.email})`);
            console.log('Deleting user so you can register again...');
            await User.deleteOne({ email });
            console.log('User deleted successfully.');
        } else {
            console.log('User not found in database.');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
