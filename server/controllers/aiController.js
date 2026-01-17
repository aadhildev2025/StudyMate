const Groq = require("groq-sdk");

// Lazy initialization of Groq client
let groq = null;

function getGroqClient() {
    if (!groq) {
        const key = process.env.GROQ_API_KEY || "";
        if (!key) {
            console.error("CRITICAL: GROQ_API_KEY is missing!");
        } else {
            console.log(`GROQ_API_KEY loaded. Starts with: ${key.substring(0, 8)}... ends with: ...${key.substring(key.length - 4)}`);
        }
        groq = new Groq({ apiKey: key });
    }
    return groq;
}

exports.generateNote = async (req, res) => {
    const { topic, subject, language = 'en' } = req.body;

    const langMap = {
        'ta': 'Tamil',
        'si': 'Sinhala',
        'en': 'English'
    };
    const targetLang = langMap[language] || 'English';

    try {
        const prompt = `You are an expert A/L ${subject} tutor. 
        The student asks: "${topic}".
        
        Provide a clear, accurate, and easy-to-understand answer in ${targetLang}.
        IMPORTANT: Start answering the question IMMEDIATELY. Do NOT use introductory phrases like "Great question!", "Here is a breakdown", or "You're doing well". Just give the answer.
        
        STRUCTURE RULES:
        1. Do NOT use large headers (like # or ##). Instead, use **Bold Text** for main points.
        2. Use bullet points for lists.
        3. Keep paragraphs short (2-3 sentences max).
        
        IMPORTANT: Use standard Markdown double newlines for paragraph breaks. Do NOT use HTML tags like <br>.
        NOTE: Avoid using LaTeX formulas for simple text. Write "Carbon-2" or just "C2".
        Keep it concise, friendly, and helpful.`;

        const chatCompletion = await getGroqClient().chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const text = chatCompletion.choices[0]?.message?.content || "";

        res.json({ content: text });
    } catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            error: "Failed to generate content.",
            details: error.message,
            apiKeyPresent: !!process.env.GROQ_API_KEY
        });
    }
};

exports.generateQuiz = async (req, res) => {
    const { topic, subject, difficulty, language = 'en' } = req.body;

    const langMap = {
        'ta': 'Tamil',
        'si': 'Sinhala',
        'en': 'English'
    };
    const targetLang = langMap[language] || 'English';

    try {
        const prompt = `Generate 5 multiple-choice questions (MCQs) for A/L ${subject} on "${topic}". Difficulty: ${difficulty}.
        The questions and options MUST be in ${targetLang}.
        Return ONLY a JSON array with this structure:
        [
            { "question": "", "options": ["A", "B", "C", "D"], "correctAnswer": "index_0_3", "explanation": "" }
        ]`;

        const chatCompletion = await getGroqClient().chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 2048,
        });

        const text = chatCompletion.choices[0]?.message?.content || "";
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const quiz = JSON.parse(cleanedText);
        res.json({ quiz });
    } catch (error) {
        console.error("AI Quiz Error:", error);
        res.status(500).json({
            error: "Failed to generate quiz.",
            details: error.message
        });
    }
};
