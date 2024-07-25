import { generateContent } from "../services/geminiService.js";  

export const generateRecommendations = async (prompt) => {
  try {
    const result = await generateContent(prompt);
    return result.text(); 
  } catch (error) {
    console.error('Error in generating content:', error);
    throw error; 
  }
};
