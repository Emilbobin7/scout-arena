const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const users = [
            {
                name: 'Admin Scout',
                email: 'scout@example.com',
                password: hashedPassword,
                role: 'scout',
                location: 'New York, USA',
                bio: 'Professional scout looking for top talent across all sports.',
            },
            {
                name: 'Rahul Sharma',
                email: 'rahul@example.com',
                password: hashedPassword,
                role: 'athlete',
                sport: 'Football',
                position: 'Forward',
                age: 19,
                height: 175,
                weight: 68,
                location: 'Mumbai, India',
                bio: 'Aspiring footballer with high speed and precision.',
                profileImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974',
                skills: { speed: 88, agility: 82, accuracy: 75, strength: 70 },
                videos: [
                    {
                        url: 'https://www.youtube.com/watch?v=dummy1',
                        description: 'Goal scoring practice',
                        aiScores: { speed: 85, agility: 80, accuracy: 88, strength: 70 }
                    }
                ]
            },
            {
                name: 'Sarah Jenkins',
                email: 'sarah@example.com',
                password: hashedPassword,
                role: 'athlete',
                sport: 'Basketball',
                position: 'Point Guard',
                age: 21,
                height: 170,
                weight: 60,
                location: 'Chicago, USA',
                bio: 'Team player with excellent court vision.',
                profileImage: 'https://images.unsplash.com/photo-1519766304800-c9519d080392',
                skills: { speed: 85, agility: 90, accuracy: 80, strength: 65 },
            },
            {
                name: 'Michael Chen',
                email: 'michael@example.com',
                password: hashedPassword,
                role: 'athlete',
                sport: 'Tennis',
                position: 'Singles',
                age: 20,
                height: 182,
                weight: 75,
                location: 'London, UK',
                bio: 'Aggressive baseliner.',
                profileImage: 'https://images.unsplash.com/photo-1599586120429-48285b6a8a81',
                skills: { speed: 78, agility: 85, accuracy: 92, strength: 72 },
            }
        ];

        await User.insertMany(users);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
