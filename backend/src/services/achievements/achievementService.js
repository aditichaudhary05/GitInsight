import {
  getUser,
  getRepositories,
} from "../github/githubService.js";

import { getAchievementAnalytics } from "../../utils/achievementAnalytics.js";

export async function getAchievementData(username) {
  const [user, repositories] = await Promise.all([
    getUser(username),
    getRepositories(username),
  ]);

  return getAchievementAnalytics(user, repositories);
}