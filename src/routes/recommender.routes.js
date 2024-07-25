import { Router } from "express";
import { generateBettingRecommendations } from "../controllers/recommender.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/recommend', auth, generateBettingRecommendations);

export default router;