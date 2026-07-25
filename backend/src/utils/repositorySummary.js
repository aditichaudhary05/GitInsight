export function getRepositorySummary(repositories) {
  return {
    total: repositories.length,

    original: repositories.filter((repo) => !repo.fork).length,

    forked: repositories.filter((repo) => repo.fork).length,

    archived: repositories.filter((repo) => repo.archived).length,

    private: repositories.filter((repo) => repo.private).length,
  };
}