const fetch = require('node-fetch');
const readline = require('readline');

const apiKey = "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"; 

const apiEndpoint = "https://api.openai.com/v1/chat/completions";

const conversation = [
    { role: "system", content: "You are a helpful assistant." }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getChatResponse(prompt) {
    conversation.push({ role: "user", content: prompt });

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                messages: conversation,
                model: "gpt-3.5-turbo"
            })
        });

        const responseData = await response.json();
        
        if (Array.isArray(responseData.choices) && responseData.choices.length > 0) {
            const assistantReply = responseData.choices[0].message.content;
            console.log("Assistant:", assistantReply);
        } else {
            console.log("No valid response from the assistant.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function askQuestion() {
    rl.question("You: ", async (prompt) => {
        if (prompt.toLowerCase() === "exit") {
            rl.close();
            return;
        }

        await getChatResponse(prompt);
        askQuestion();
    });
}

// Start the conversation loop
askQuestion();
