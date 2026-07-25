import express from "express";

import { getAchievementsHandler } from "../controllers/achievementController.js";

const router = express.Router();

router.get("/:username", getAchievementsHandler);

export default router;