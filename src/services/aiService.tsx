import OpenAI from 'openai';
import { Models } from 'appwrite';

// This is the model string for the free DeepSeek model on OpenRouter
const deepSeekModel = "deepseek/deepseek-chat"; 

const openAI = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_OPENROUTER_CHATBOT_API_KEY,
    // This is required to use the library in a browser environment
    dangerouslyAllowBrowser: true,
});

// Define a type for the combined journal data we'll analyze
export interface JournalData {
    threeGoodThings: any[];
    oneThorn: any[];
    journalEntries: any[];
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
        const response = await openAI.chat.completions.create({
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
        });
        return response.choices[0]?.message?.content ?? "I'm sorry, I couldn't generate an overview at this time.";
    } catch (error) {
        console.error("Error getting analysis from OpenRouter:", error);
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
        const response = await openAI.chat.completions.create({
            model: deepSeekModel,
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful and friendly AI assistant in the 'Daily Mindfulness' app. The user has just seen an analysis of their journal entries. Your role is to help them explore this data further. Be supportive and guide them with gentle questions. Here is the initial analysis for context:\n\n${initialContext}`
                },
                ...conversationHistory
            ],
        });
        return response.choices[0].message;
    } catch (error) {
        console.error("Error getting chat response from OpenRouter:", error);
        return { role: 'assistant', content: "I'm having trouble connecting right now. Let's talk later." };
    }
};