const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/al_masterhub')
    .then(() => console.log('MongoDB Connected successfully to:', mongoose.connection.name))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        if (err.code) console.error('Error Code:', err.code);
        console.warn('Proceeding without MongoDB connection. Some features may not work.');
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
