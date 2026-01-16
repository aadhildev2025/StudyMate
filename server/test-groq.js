require('dotenv').config();
const Groq = require("groq-sdk");

async function testGroq() {
    const key = process.env.GROQ_API_KEY;
    console.log("API Key present:", !!key);
    console.log("API Key starts with:", key ? key.substring(0, 8) : "N/A");

    if (!key) {
        console.error("No API key found!");
        return;
    }

    try {
        const groq = new Groq({ apiKey: key });

        console.log("Sending test request...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Say hello in one word" }],
            model: "llama-3.3-70b-versatile",
        });

        console.log("SUCCESS! Response:", chatCompletion.choices[0]?.message?.content);
    } catch (error) {
        console.error("ERROR:", error.message);
    }
}

testGroq();
