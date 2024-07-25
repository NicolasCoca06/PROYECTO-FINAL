import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const getRecommendations = async (prompt) => {
  try {
    const response = await axiosInstance.post('/recommend', { prompt });
    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};