import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config.js';

console.log('Gemini API Key:', GEMINI_API_KEY); 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
  try {
    console.log('Generating content with prompt:', prompt);
    const result = await model.generateContent(prompt);
    console.log('Result:', result);
    return result.response.text();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw error;
  }
};
