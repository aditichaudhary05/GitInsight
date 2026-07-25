import {
  getUser,
  getRepositories,
} from "../github/githubService.js";

import { getRepositorySummary } from "../../utils/repositorySummary.js";
import { getRepositoryHighlights } from "../../utils/repositoryHighlights.js";
import { getLanguageAnalytics } from "../../utils/languageAnalytics.js";
import { getActivityAnalytics } from "../../utils/activityAnalytics.js";
import { getHealthAnalytics } from "../../utils/healthAnalytics.js";
import { getProductivityAnalytics } from "../../utils/productivityAnalytics.js";
import { getSmartInsights } from "../../utils/smartInsights.js";

export async function getOverviewData(username) {
  const [user, repositories] = await Promise.all([
    getUser(username),
    getRepositories(username),
  ]);

  const profile = {
    username: user.login,
    name: user.name,
    avatar: user.avatar_url,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    joinedAt: user.created_at,
    totalStars: repositories.reduce((total, repo) => total + repo.stargazers_count, 0),
  };

  const repositorySummary = getRepositorySummary(repositories);

const highlights = getRepositoryHighlights(repositories);

const languages = getLanguageAnalytics(repositories);

const activity = getActivityAnalytics(repositories);

const health = getHealthAnalytics(repositories);

const productivity = getProductivityAnalytics(repositories);

const insights = getSmartInsights({
  repositories: repositorySummary,
  languages,
  health,
  productivity,
});

return {
  profile,

  repositories: repositorySummary,

  highlights,

  languages,

  activity,

  health,

  productivity,

  insights,
};
}
