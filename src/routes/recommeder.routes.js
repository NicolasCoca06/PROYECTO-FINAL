import { Router } from "express";
import { generateBettingRecommendations } from "../controllers/recommender.controller.js";

const router = Router();

router.get('/betting-recommendations', generateBettingRecommendations);

export default router;