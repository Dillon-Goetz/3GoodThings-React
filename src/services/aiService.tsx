// This is the model string for the free DeepSeek model on OpenRouter
const deepSeekModel = "deepseek/deepseek-r1-0528-qwen3-8b:free"; 

// Get the API key from environment variables.
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_CHATBOT_API_KEY;

// Ensure the API key is actually available during build time.
if (!OPENROUTER_API_KEY) {
    console.error("VITE_OPENROUTER_CHATBOT_API_KEY is not defined in environment variables. AI features may not work.");
    // In a production app, you might want more robust error handling here
    // or prevent the app from loading AI features without a key.
}

// We no longer instantiate the OpenAI client directly here,
// as we'll use fetch with manual headers.
// const openAI = new OpenAI({...});


// Define a type for the combined journal data we'll analyze
export interface JournalData {
  threeGoodThings: any[]; // Assuming these are arrays of documents
  oneThorn: any[]; // Assuming these are arrays of documents
  journalEntries: any[]; // Assuming these are arrays of documents
  photos: any[]; // Assuming this is an array of documents
}

/**
 * Generates an analysis overview from journal data.
 * @param data - An object containing arrays of journal documents.
 * @returns A promise that resolves to the AI-generated overview string.
 */
export const getAnalysisOverview = async (data: JournalData): Promise<string> => {
    // Combine all the text from the documents into one string for analysis.
    const textToAnalyze = `
        Three Good Things entries:
        ${data.threeGoodThings.map(doc => `- ${doc.goodThing1}, ${doc.goodThing2}, ${doc.goodThing3}`).join('\n')}

        One Thorn entries:
        ${data.oneThorn.map(doc => `- ${doc.thornText}`).join('\n')}

        Journal Entries:
        ${data.journalEntries.map(doc => `- ${doc.journalText}`).join('\n')}
    `;

    if (textToAnalyze.trim().length < 50) {
        return "Not enough data to analyze. Please write a few more journal entries.";
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`, // Manually set Authorization header
            },
            body: JSON.stringify({
                model: deepSeekModel,
                messages: [
                    {
                        role: 'system',
                        content: `You are an insightful and supportive AI assistant for a mindfulness app called 'Daily Mindfulness'. Your task is to analyze the user's journal entries. Provide a gentle, high-level overview. Look for recurring themes, patterns in mood, or shifts in perspective over time. Frame your analysis positively and encouragingly. Do not give direct advice unless it's a gentle suggestion for mindfulness. Start your response with a warm greeting.`
                    },
                    {
                        role: 'user',
                        content: `Here are my recent journal entries. Please provide a gentle overview and point out any themes or trends you notice:\n\n${textToAnalyze}`
                    }
                ],
            })
        });

        // Check if the response was successful (status code 2xx)
        if (!response.ok) {
            const errorData = await response.json().catch(() => response.text());
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content ?? "I'm sorry, I couldn't generate an overview at this time.";
    } catch (error) {
        console.error("Error getting analysis from OpenRouter:", error);
        // Provide a more user-friendly error message
        return "There was an error analyzing your data. Please try again later.";
    }
};

/**
 * Gets a response from the AI for the interactive chat.
 * @param conversationHistory - An array of messages in the OpenAI format.
 * @param initialContext - The initial analysis to provide context to the chat.
 * @returns A promise that resolves to the AI's response message object.
 */
export const getChatResponse = async (conversationHistory: any[], initialContext: string) => {
     try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`, // Manually set Authorization header
            },
            body: JSON.stringify({
                model: deepSeekModel,
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful and friendly AI assistant in the 'Daily Mindfulness' app. The user has just seen an analysis of their journal entries. Your role is to help them explore this data further. Be supportive and guide them with gentle questions. Here is the initial analysis for context:\n\n${initialContext}`
                    },
                    ...conversationHistory
                ],
            })
        });

        // Check if the response was successful (status code 2xx)
        if (!response.ok) {
            const errorData = await response.json().catch(() => response.text());
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message ?? { role: 'assistant', content: "I'm having trouble connecting right now. Let's talk later." };
    } catch (error) {
        console.error("Error getting chat response from OpenRouter:", error);
        // Provide a more user-friendly error message
        return { role: 'assistant', content: "I'm having trouble connecting right now. Let's talk later." };
    }
};