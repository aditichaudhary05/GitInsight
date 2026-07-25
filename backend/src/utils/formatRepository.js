export function formatRepository(repo) {
  if (!repo) return null;

  return {
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    size: repo.size,
    private: repo.private,
    archived: repo.archived,
    fork: repo.fork,
    openIssues: repo.open_issues_count,
    url: repo.html_url,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
  };
}
