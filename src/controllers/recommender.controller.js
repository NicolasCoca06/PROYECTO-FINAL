import { getUserBettingHistory, analyzeBettingPatterns } from '../services/betAnalysisService.js';
import { generateContent } from '../services/geminiService.js';

export const generateBettingRecommendations = async (req, res) => {
  const userId = req.user._id;  

  try {
    const bets = await getUserBettingHistory(userId);
    const bettingPatterns = analyzeBettingPatterns(bets);
    const prompt = `Based on the following betting history: ${bettingPatterns.totalBets} bets with ${bettingPatterns.wins} wins and ${bettingPatterns.losses} losses, which strategy is the best?`;
    const recommendations = await generateContent(prompt);
    res.json({ recommendations });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).send('Failed to generate recommendations');
  }
};
