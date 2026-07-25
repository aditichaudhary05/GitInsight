export function getRepositoryStatistics(repositories) {
  const total = repositories.length;

  const forked = repositories.filter(repo => repo.fork).length;

  const archived = repositories.filter(repo => repo.archived).length;

  const publicRepos = repositories.filter(
    repo => !repo.private
  ).length;

  const privateRepos = repositories.filter(
    repo => repo.private
  ).length;

  const languages = new Set(
    repositories
      .map(repo => repo.language)
      .filter(Boolean)
  );

  return {
    total,
    public: publicRepos,
    private: privateRepos,
    forked,
    archived,
    languages: languages.size,
  };
}