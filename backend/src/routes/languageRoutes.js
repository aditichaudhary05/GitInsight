import express from "express";
import { getLanguagesHandler } from "../controllers/languageController.js";

const router = express.Router();

router.get("/:username", getLanguagesHandler);

export default router;