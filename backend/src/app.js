import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

import overviewRoutes from "./routes/overviewRoutes.js";

import repositoryRoutes from "./routes/repositoryRoutes.js";

import languageRoutes from "./routes/languageRoutes.js";

import achievementRoutes from "./routes/achievementRoutes.js";

import profileRoutes from "./routes/profileRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GitInsight Backend Running 🚀",
  });
});

app.use("/api/overview", overviewRoutes);

app.use("/api/repositories", repositoryRoutes);

app.use("/api/languages", languageRoutes);

app.use("/api/achievements", achievementRoutes);

app.use("/api/profile", profileRoutes);

app.use(errorHandler);

export default app;