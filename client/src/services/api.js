import axios from 'axios';

export const getRecommendations = async () => {
  try {
    const response = await axios.post('http://localhost:5000/recommend');
    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};