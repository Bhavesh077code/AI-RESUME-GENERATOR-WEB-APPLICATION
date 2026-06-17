
/*
import OpenAI from 'openai';

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});



export const generateResponse = async (userData) => {
    try {
        const finalPrompt = `
Full Name: ${userData.fullName || ''}
Target Title: ${userData.title || ''}
Skills: ${userData.skills?.join(', ') || ''}
Experience: ${userData.experience?.map(
            exp => `${exp.role} at ${exp.company} (${exp.desc})`
        ).join(' | ') || ''}
Project: ${userData.projects?.map(p => p.title).join(', ') || ''}
Education: ${userData.education?.map(e => e.degree).join(', ') || ''}

Write a professional resume summary based ONLY on the provided data.
Do NOT add any fake experience or skills.
Do NOT modify or assume missing details.
Keep it concise (5-6 lines) and ATS-friendly.
Highlight key skills and strengths clearly.
`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                { role: 'system', content: 'You are a professional resume writer.' },
                { role: 'user', content: finalPrompt },
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};

*/


import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResponse = async (userData) => {
    try {
        const finalPrompt = `
Full Name: ${userData.fullName || ''}
Target Title: ${userData.title || ''}
Skills: ${userData.skills?.join(', ') || ''}
Experience: ${userData.experience?.map(
            exp => `${exp.role} at ${exp.company} (${exp.desc})`
        ).join(' | ') || ''}
Project: ${userData.projects?.map(p => p.title).join(', ') || ''}
Education: ${userData.education?.map(e => e.degree).join(', ') || ''}

Write a professional resume summary based ONLY on the provided data.
Do NOT add any fake experience or skills.
Do NOT modify or assume missing details.
Keep it concise (5-6 lines) and ATS-friendly.
Highlight key skills and strengths clearly.
`;

        // ✅ Latest working model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest"
        });

        const result = await model.generateContent(finalPrompt);
        const response = await result.response;

        return response.text();

    } catch (error) {
        console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
        console.error("❌ Error generating response:", error.message);

        // better error output
        if (error.status === 404) {
            throw new Error("Model not found. Check model name.");
        }
        if (error.status === 401) {
            throw new Error("Invalid API key.");
        }

        throw error;
    }
};