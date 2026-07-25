import express from "express";

import { getProfileHandler } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:username", getProfileHandler);

export default router;