require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    const key = process.env.GEMINI_API_KEY;
    console.log("API Key present:", !!key);
    console.log("API Key starts with:", key ? key.substring(0, 8) : "N/A");

    if (!key) {
        console.error("No API key found!");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        console.log("Sending test request...");
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        console.log("SUCCESS! Response:", response.text().substring(0, 100));
    } catch (error) {
        console.error("ERROR:", error.message);
        console.error("Full error:", JSON.stringify(error, null, 2));
    }
}

testGemini();
