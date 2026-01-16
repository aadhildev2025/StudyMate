const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/al_masterhub')
    .then(() => console.log('MongoDB Connected successfully to:', mongoose.connection.name))
    .catch(err => {
        console.error('MongoDB Connection Error:');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        if (err.code) console.error('Error Code:', err.code);
        process.exit(1);
    });

// Routes
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('AL MasterHub API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
