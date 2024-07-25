import Bet from '../models/bet.model.js';  

export const getUserBettingHistory = async (userId) => {
  try {
    const bets = await Bet.find({ user: userId });
    return bets;
  } catch (error) {
    console.error("Error fetching user bets: ", error);
    throw error;
  }
};

export const analyzeBettingPatterns = (bets) => {
  const summary = {
    totalBets: bets.length,
    wins: bets.filter(bet => bet.result === 'win').length,
    losses: bets.filter(bet => bet.result === 'loss').length
  };
  return summary;
};
