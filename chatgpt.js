const fetch = require('node-fetch');

async function getChatResponse() {
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
    const apiKey = "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"; 

    const conversation = [
        { role: "system", content: "You are a helpful assistant that answers questions." },
        { role: "user", content: "What is the capital of India?" }
    ];
    

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

        // Log the entire responseData object for debugging
        console.log("API Response:", responseData);

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

// Call the function to get the assistant's response
getChatResponse();
