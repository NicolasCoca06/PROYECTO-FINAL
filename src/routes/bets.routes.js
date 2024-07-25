import { Router } from "express";
import {
  createBet,
  deleteBet,
  getBet,
  getBets,
  updateBet,
} from "../controllers/bets.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createBetSchema } from "../schemas/bet.schema.js";

const router = Router();

router.get("/bets", auth, getBets);

router.post("/bets", auth, validateSchema(createBetSchema), createBet);

router.get("/bets/:id", auth, getBet);

router.put("/bets/:id", auth, updateBet);

router.delete("/bets/:id", auth, deleteBet);

export default router;
