import axios from 'axios';

export const getRecommendations = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:4000/api/recommend', { prompt });
    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
