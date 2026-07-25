import { getAchievementData } from "../services/achievements/achievementService.js";

export async function getAchievementsHandler(req, res, next) {
  try {
    const { username } = req.params;

    const data = await getAchievementData(username);

    res.json(data);
  } catch (error) {
    next(error);
  }
}