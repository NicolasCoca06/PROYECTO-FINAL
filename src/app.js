import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path from 'path';
import { FRONTEND_URL } from "./config.js";

import authRoutes from "./routes/auth.routes.js";
import betsRoutes from "./routes/bets.routes.js";
import apiSportsLiveScores from './routes/apiSportsLiveScores.routes.js';
import apiSportsUpcomingRoutes from './routes/apiSportsUpcoming.routes.js';
import apiSportsFixturesOddsRoutes from './routes/apiSportsFixturesOdds.routes.js';
//import recommenderRoutes from './routes/recommender.routes.js';  

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(cors({
  credentials: true,
  origin: FRONTEND_URL,
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", betsRoutes);
app.use("/api", apiSportsLiveScores);
app.use("/api", apiSportsUpcomingRoutes);
app.use("/api", apiSportsFixturesOddsRoutes);

//app.use('/api', recommenderRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}
//if (process.env.NODE_ENV === "production") {
// app.use(express.static("client/dist"));
//  app.get("*", (req, res) => {
//    res.sendFile(path.resolve("client", "dist", "index.html"));
//  });
//}

export default app;
