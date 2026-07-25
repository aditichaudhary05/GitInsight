import express from "express";
import { getRepositoriesController } from "../controllers/repositoryController.js";

const router = express.Router();

router.get("/:username", getRepositoriesController);

export default router;