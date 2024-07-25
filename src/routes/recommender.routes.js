import { Router } from "express";
import { generateBettingRecommendations } from "../controllers/recommender.controller.js";

const router = Router();

router.post('/recommend', generateBettingRecommendations);

export default router;