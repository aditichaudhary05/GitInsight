export function findMostStarredRepo(repos) {
  if (repos.length === 0) return null;

  return repos.reduce((max, repo) =>
    repo.stargazers_count > max.stargazers_count ? repo : max
  );
}

export function findMostForkedRepo(repos) {
  if (repos.length === 0) return null;

  return repos.reduce((max, repo) =>
    repo.forks_count > max.forks_count ? repo : max
  );
}

export function findLargestRepo(repos) {
  if (repos.length === 0) return null;

  return repos.reduce((max, repo) =>
    repo.size > max.size ? repo : max
  );
}

export function findOldestRepo(repos) {
  if (repos.length === 0) return null;

  return repos.reduce((oldest, repo) =>
    new Date(repo.created_at) < new Date(oldest.created_at)
      ? repo
      : oldest
  );
}

export function findRecentlyUpdatedRepo(repos) {
  if (repos.length === 0) return null;

  return repos.reduce((latest, repo) =>
    new Date(repo.updated_at) > new Date(latest.updated_at)
      ? repo
      : latest
  );
}

import { formatRepository } from "./formatRepository.js";

export function getRepositoryHighlights(repositories) {
  return {
    mostStarred: formatRepository(findMostStarredRepo(repositories)),
    mostForked: formatRepository(findMostForkedRepo(repositories)),
    largestRepository: formatRepository(findLargestRepo(repositories)),
    oldestRepository: formatRepository(findOldestRepo(repositories)),
    recentlyUpdated: formatRepository(
      findRecentlyUpdatedRepo(repositories)
    ),
  };
}