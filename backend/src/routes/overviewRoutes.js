import express from "express";
import { getOverview } from "../controllers/overviewController.js";

const router = express.Router();

router.get("/:username", getOverview);

export default router;