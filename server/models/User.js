const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    imageUsage: {
        count: { type: Number, default: 0 },
        lastReset: { type: Date, default: Date.now }
    }
});

module.exports = mongoose.model('User', UserSchema);
