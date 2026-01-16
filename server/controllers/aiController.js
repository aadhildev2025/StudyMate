const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

exports.generateNote = async (req, res) => {
    const { topic, subject } = req.body;

    try {
        const prompt = `You are an expert A/L ${subject} tutor. 
        The student asks: "${topic}".
        
        Provide a clear, accurate, and easy-to-understand answer.
        IMPORTANT: Start answering the question IMMEDIATELY. Do NOT use introductory phrases like "Great question!", "Here is a breakdown", or "You're doing well". Just give the answer.
        
        STRUCTURE RULES:
        1. Do NOT use large headers (like # or ##). Instead, use **Bold Text** for main points.
        2. Use bullet points for lists.
        3. Keep paragraphs short (2-3 sentences max).
        
        IMPORTANT: Use standard Markdown double newlines (\n\n) for paragraph breaks. Do NOT use HTML tags like <br>.
        NOTE: Avoid using LaTeX formulas (like $\text{C}2$) for simple text. Write "Carbon-2" or just "C2".
        Keep it concise, friendly, and helpful.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ content: text });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({
            error: "Failed to generate content.",
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

exports.generateQuiz = async (req, res) => {
    const { topic, subject, difficulty } = req.body;

    try {
        const prompt = `Generate 5 multiple-choice questions (MCQs) for A/L ${subject} on "${topic}". Difficulty: ${difficulty}.
        Return ONLY a JSON array with this structure:
        [
            { "question": "", "options": ["A", "B", "C", "D"], "correctAnswer": "index_0_3", "explanation": "" }
        ]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

        const quiz = JSON.parse(text);
        res.json({ quiz });
    } catch (error) {
        console.error("AI Quiz Error:", error);
        res.status(500).json({
            error: "Failed to generate quiz.",
            details: error.message
        });
    }
};
