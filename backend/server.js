const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/athletes', require('./routes/scoutRoutes')); // Keeping for legacy search
app.use('/api/scout', require('./routes/scoutRoutes')); // New scout profile & stats
app.use('/api', require('./routes/socialRoutes')); // Social routes like /api/follow, /api/like

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
