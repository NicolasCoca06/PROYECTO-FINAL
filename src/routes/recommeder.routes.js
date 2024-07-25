import { Router } from "express";
import { generateRecommendations } from "../controllers/recommender.controller.js";

const router = Router();

router.post('/recommend', async (req, res) => {
  const { prompt } = req.body;

  try {
    const recommendations = await generateRecommendations(prompt);
    res.json({ recommendations });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).send('Failed to generate recommendations');
  }
});

export default router;
