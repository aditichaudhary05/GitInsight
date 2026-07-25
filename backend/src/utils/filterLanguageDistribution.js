export function filterLanguageDistribution(data, language) {
  // If no language filter is provided, return the original data
  if (!language) {
    return data;
  }

  // Find the selected language in the distribution
  const filteredDistribution = data.distribution.filter(
    (item) =>
      item.language.toLowerCase() ===
      language.toLowerCase()
  );

  // If the language doesn't exist, return an empty result
  if (filteredDistribution.length === 0) {
    return {
      summary: {
        primaryLanguage: null,
        totalLanguages: 0,
        totalBytes: 0,
        totalRepositories: 0,
      },
      distribution: [],
      repositoriesByLanguage: {},
    };
  }

  // Find the correct language key (preserves original casing)
  const languageKey = Object.keys(data.repositoriesByLanguage).find(
    (key) => key.toLowerCase() === language.toLowerCase()
  );

  const filteredRepositories = {};

  if (languageKey) {
    filteredRepositories[languageKey] =
      data.repositoriesByLanguage[languageKey];
  }

  // Build a new summary for the filtered result
  const summary = {
    primaryLanguage: filteredDistribution[0].language,
    totalLanguages: 1,
    totalBytes: filteredDistribution[0].bytes,
    totalRepositories: filteredDistribution[0].repositories,
  };

  return {
    summary,
    distribution: filteredDistribution,
    repositoriesByLanguage: filteredRepositories,
  };
}