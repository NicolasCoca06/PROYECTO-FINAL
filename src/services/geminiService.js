import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export const generateContent = async (prompt) => {
  const result = await model.generateContent({
    prompt: prompt,
    max_tokens: 150  
  });
  return result;
};
