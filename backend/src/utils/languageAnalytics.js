export async function calculateLanguageDistribution(
  repositories,
  getRepositoryLanguages
) {
  const totals = {};

  for (const repo of repositories) {
    const languages = await getRepositoryLanguages(
      repo.owner.login,
      repo.name
    );

    for (const language in languages) {
      totals[language] =
        (totals[language] || 0) + languages[language];
    }
  }

  return totals;
}
export function getLanguageAnalytics(repositories) {
  const languageCounts = {};

  repositories.forEach((repo) => {
    if (!repo.language) return;

    languageCounts[repo.language] =
      (languageCounts[repo.language] || 0) + 1;
  });

  const totalRepositories = repositories.length;

  const distribution = Object.entries(languageCounts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Number(
        ((count / totalRepositories) * 100).toFixed(1)
      ),
    }))
    .sort((a, b) => b.count - a.count);

  return {
    primaryLanguage: distribution[0]?.language || null,
    totalLanguages: distribution.length,
    distribution,
  };
}