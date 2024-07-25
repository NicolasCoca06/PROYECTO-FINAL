import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';


import authRoutes from "./routes/auth.routes.js";
import betsRoutes from "./routes/bets.routes.js";
import apiSportsLiveScores from './routes/apiSportsLiveScores.routes.js';
import apiSportsUpcomingRoutes from './routes/apiSportsUpcoming.routes.js'; // API ROUTE
const __dirname = fileURLToPath(new URL('.', import.meta.url));

import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", betsRoutes);
app.use("/api",apiSportsLiveScores);
app.use("/api",apiSportsUpcomingRoutes); // API ROUTE

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html") );
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;

// Route for serving HTML file
app.get('/upcomingEvents', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upcomingEvents.html'));
});

app.get('/liveScores', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'liveScores.html'));
});