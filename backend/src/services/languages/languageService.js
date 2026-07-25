import {
  getRepositories,
  getRepositoryLanguages,
} from "../github/githubService.js";

import { getLanguageDistribution } from "../../utils/languageDistribution.js";
import { filterLanguageDistribution } from "../../utils/filterLanguageDistribution.js";

const languageCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;
const LANGUAGE_REQUEST_CONCURRENCY = 8;

async function mapWithConcurrency(items, mapper, concurrency) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const worker = async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

export async function getLanguageData(
  username,
  options = {}
) {
  const cacheKey = `${username}:${options.language || ""}`;
  const cached = languageCache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS) return cached.data;

  // Fetch all repositories
  const repositories = await getRepositories(username);

  // Fetch several repositories at once instead of waiting for each request in turn.
  const languageData = (await mapWithConcurrency(repositories, async repo => {
    try {
      const languages = await getRepositoryLanguages(
        username,
        repo.name
      );

      return {
        repository: repo.name,
        languages,
      };
    } catch (error) {
      console.warn(
        `Skipping ${repo.name}: ${error.message}`
      );
      return null;
    }
  }, LANGUAGE_REQUEST_CONCURRENCY)).filter(Boolean);

  // Generate analytics
  const analytics = getLanguageDistribution(languageData);

  const firstYear = new Date().getFullYear() - 5;
  const trendByYear = Array.from({ length: 6 }, (_, index) => ({ year: String(firstYear + index) }));
  repositories.forEach(repo => {
    const year = new Date(repo.created_at).getFullYear();
    const entry = trendByYear.find(item => Number(item.year) === year);
    if (entry && repo.language) entry[repo.language] = (entry[repo.language] || 0) + 1;
  });

  // Apply optional filtering
  const filtered = filterLanguageDistribution(
    analytics,
    options.language
  );
  const data = { ...filtered, trendByYear };
  languageCache.set(cacheKey, { createdAt: Date.now(), data });
  return data;
}
