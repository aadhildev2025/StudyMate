const express = require('express');
const router = express.Router();
const { generateNote, generateQuiz } = require('../controllers/aiController');

router.post('/note', generateNote);
router.post('/quiz', generateQuiz);

module.exports = router;
