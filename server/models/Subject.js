const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Biology', 'Chemistry', 'Physics']
    },
    code: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String
});

module.exports = mongoose.model('Subject', SubjectSchema);
