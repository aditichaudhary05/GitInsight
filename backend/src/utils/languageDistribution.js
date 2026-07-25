export function getLanguageDistribution(languageData) {
  const totals = {};
  const repositoryCounts = {};
  const repositoriesByLanguage = {};

  // Aggregate language data from all repositories
  for (const repo of languageData) {
    const languages = repo.languages;

    for (const [language, bytes] of Object.entries(languages)) {
      // Total bytes per language
      totals[language] = (totals[language] || 0) + bytes;

      // Number of repositories using this language
      repositoryCounts[language] =
        (repositoryCounts[language] || 0) + 1;

      // Group repositories by language
      if (!repositoriesByLanguage[language]) {
        repositoriesByLanguage[language] = [];
      }

      repositoriesByLanguage[language].push({
        name: repo.repository,
        bytes,
      });
    }
  }

  // Calculate total bytes across all languages
  const totalBytes = Object.values(totals).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  // Build language distribution
  const distribution = Object.entries(totals)
  .map(([language, bytes]) => ({
    language,
    bytes,
    repositories: repositoryCounts[language],
    percentage:
      totalBytes === 0
        ? 0
        : Number(((bytes / totalBytes) * 100).toFixed(2)),
  }))
  .sort((a, b) => b.bytes - a.bytes)
  .map((item, index) => ({
    rank: index + 1,
    ...item,
  }));

  // Summary
  const summary = {
  primaryLanguage:
    distribution[0]?.language ?? null,

  totalLanguages: distribution.length,

  totalBytes,

  totalRepositories: languageData.length,
};

  return {
    summary,
    distribution,
    repositoriesByLanguage,
  };
}