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

const User = require('../models/User');

exports.generateNote = async (req, res) => {
    const { topic, subject, language = 'en', image, uid } = req.body;

    console.log(`Received generateNote request: Topic="${topic}", Subject="${subject}", Language="${language}", ImagePresent=${!!image}, UID=${uid}`);

    // Rate Limiting Logic for Images
    if (image) {
        if (!uid) {
            return res.status(401).json({ error: "Please sign in to upload images." });
        }

        try {
            let user = await User.findOne({ uid });
            if (!user) {
                user = new User({ uid, email: "unknown@example.com" }); // Email might be updated later on login sync
            }

            // Check if 24 hours passed
            const now = new Date();
            const lastReset = new Date(user.imageUsage.lastReset);
            const timeDiff = now - lastReset;

            if (timeDiff > 24 * 60 * 60 * 1000) {
                // Reset limit if > 24h
                user.imageUsage.count = 0;
                user.imageUsage.lastReset = now;
            }

            if (user.imageUsage.count >= 10) {
                const hoursLeft = Math.ceil((24 * 60 * 60 * 1000 - timeDiff) / (1000 * 60 * 60));
                return res.status(429).json({
                    error: `Daily image limit reached (10/10). Please try again in ${hoursLeft} hours.`
                });
            }

            // Increment count
            user.imageUsage.count += 1;
            await user.save();
            console.log(`User ${uid} image count: ${user.imageUsage.count}/10`);

            console.log(`Image Payload Length: ${image.length} chars (First 50: ${image.substring(0, 50)}...)`);

        } catch (dbError) {
            console.error("Database Error during Rate Limiting:", dbError);
            // Proceed cautiously or fail? Let's fail safe for now but maybe allow if DB down? 
            // Better to fail to enforce limit.
            return res.status(500).json({ error: "Internal Server Error during verification." });
        }
    }

    const langMap = {
        'ta': 'Tamil',
        'si': 'Sinhala',
        'en': 'English'
    };
    const targetLang = langMap[language] || 'English';

    try {
        let messages = [];
        let model = "llama-3.3-70b-versatile";

        if (image) {
            // Multimodal request
            /* model = "llama-3.2-11b-vision-preview"; */
            /* I'll use 90b for text-only superior logical reasoning unless vision is strictly needed, 
               but for vision tasks specifically we need the vision model. 
               The user asked for camera/photo support, so we assume vision model is needed if image is present.
            */
            model = "meta-llama/llama-4-scout-17b-16e-instruct";

            messages = [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `You are an expert A/L ${subject} tutor. 
                            The user has sent an image and asks: "${topic}".
                            Analyze the image and provide a comprehensive, detailed, and expanded explanation STRICTLY in ${targetLang}.
                            
                            STRICT LENGTH & DETAIL RULES:
                            1. **NO SUMMARIES**: The response must be a deep-dive explanation, suitable for university-level understanding.
                            2. **MINIMUM LENGTH**: Write at least 4-5 detailed paragraphs.
                            3. **ELABORATE**: For every main point, write at least 3-4 sentences explaining the "Why" and "How".
                            4. **EXAMPLES**: You MUST provide a real-world example for every concept to ensure clarity.
                            5. **LOCAL LANGUAGES**: If the language is Tamil or Sinhala, translate the FULL DEPTH of the English explanation. DO NOT shorten it. It must be just as long and detailed as an English textbook explanation.

                            FOR PHYSICS:
                            - Simplified Equations: Always use simplified versions of equations ($F=ma$). Explain them step-by-step.
                            - Define every variable clearly.
                            - Use easy-to-understand examples.

                            DO NOT mix ${targetLang} with any other language (like English, Tamil, or Sinhala). 
                            The entire response MUST be in ${targetLang} only.
                            STRUCTURE RULES:
                            1. Use **Bold Text** for main points.
                            2. Use bullet points for lists.
                            3. Use clean paragraphs with double spacing.`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: image
                            }
                        }
                    ]
                }
            ];
        } else {
            // Text-only request
            const prompt = `You are an expert A/L ${subject} tutor. 
            The student asks: "${topic}".
            
            Provide a comprehensive, detailed, and expanded explanation STRICTLY in ${targetLang}.
            
            STRICT LENGTH & DETAIL RULES:
            1. **NO SUMMARIES**: The response must be a deep-dive explanation, suitable for university-level understanding.
            2. **MINIMUM LENGTH**: Write at least 4-5 detailed paragraphs.
            3. **ELABORATE**: For every main point, write at least 3-4 sentences explaining the "Why" and "How".
            4. **EXAMPLES**: You MUST provide a real-world example for every concept to ensure clarity.
            5. **LOCAL LANGUAGES**: If the language is Tamil or Sinhala, translate the FULL DEPTH of the English explanation. DO NOT shorten it. It must be just as long and detailed as an English textbook explanation.

            FOR PHYSICS:
            - Simplified Equations: Always use simplified versions of equations ($F=ma$). Explain them step-by-step.
            - Define every variable clearly.
            - Use easy-to-understand examples.

            IMPORTANT: The entire response MUST be in ${targetLang} only. DO NOT mix with English, Tamil, or Sinhala.
            Start answering the question IMMEDIATELY. Do NOT use introductory phrases like "Great question!", "Here is a breakdown", or "You're doing well". Just give the answer.
            
            STRUCTURE RULES:
            1. Do NOT use large headers (like # or ##). Instead, use **Bold Text** for main points.
            2. Use bullet points for lists.
            3. Use clean paragraphs with double spacing.
            
            IMPORTANT: Use standard Markdown double newlines for paragraph breaks. Do NOT use HTML tags like <br>.
            NOTE: Avoid using LaTeX formulas for simple text. Write "Carbon-2" or just "C2".
            Keep it helpful and thorough.`;

            messages = [{ role: "user", content: prompt }];
        }

        const chatCompletion = await getGroqClient().chat.completions.create({
            messages: messages,
            model: model,
            temperature: 0.7,
            max_tokens: 4096,
        });

        const text = chatCompletion.choices[0]?.message?.content || "";

        res.json({ content: text });
    } catch (error) {
        console.error("AI Error:", error);

        if (error.response) {
            console.error("Groq API Response Error Data:", error.response.data);
            console.error("Groq API Response Status:", error.response.status);
            console.error("Groq API Response Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Groq API Request Error (No Response):", error.request);
        } else {
            console.error("Groq API Setup Error:", error.message);
        }

        res.status(500).json({
            error: "Failed to generate content.",
            details: error.message,
            apiResponse: error.response ? error.response.data : null,
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
        const prompt = `Generate 5 multiple - choice questions(MCQs) for A / L ${subject} on "${topic}".Difficulty: ${difficulty}.
        The questions, options, and explanation MUST be STRICTLY in ${targetLang}. 
        DO NOT mix ${targetLang} with any other language.
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
