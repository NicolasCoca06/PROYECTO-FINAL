import axios from 'axios';

const RECOMMENDER_API_URL = 'http://localhost:5000';

export const getRecommendations = async (user_id) => {
  try {
    const response = await axios.post(`${RECOMMENDER_API_URL}/recommend`, { user_id });
    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
