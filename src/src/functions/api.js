import { GoogleGenAI } from "@google/genai"

export const fetchChatResponse = async (message, learningData) => {
    console.log(import.meta.env.API_KEY)
    console.log(learningData)
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY })
    return await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${message}, and here's my learning style: ${learningData}`,
    });
};