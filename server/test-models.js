require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Note: getGenerativeModel doesn't strictly validate until generation, 
        // but there isn't a direct listModels method exposed on the main class easily in all versions.
        // Actually, newer versions might not throw on instantiation.
        // Let's try to generate 'hello' with a few common model names to see which one works.

        const candidates = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-pro",
            "gemini-1.0-pro",
            "gemini-1.5-pro"
        ];

        console.log("Testing models with key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");

        for (const modelName of candidates) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const m = genAI.getGenerativeModel({ model: modelName });
                const result = await m.generateContent("Hi");
                const response = await result.response;
                console.log(`SUCCESS!`);
                return; // Found one that works
            } catch (e) {
                console.log(`FAILED: ${e.message.split('[')[0]}`); // Print short error
            }
        }
    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();
