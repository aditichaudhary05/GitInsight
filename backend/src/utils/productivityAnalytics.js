export function getProductivityAnalytics(repositories) {
  const currentYear = new Date().getFullYear();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentYear - 1);

  const repositoriesCreatedThisYear = repositories.filter(
    (repo) =>
      new Date(repo.created_at).getFullYear() === currentYear
  ).length;

  const repositoriesUpdatedThisYear = repositories.filter(
    (repo) =>
      new Date(repo.updated_at).getFullYear() === currentYear
  ).length;

  const activeRepositories = repositories.filter(
    (repo) => new Date(repo.updated_at) >= oneYearAgo
  ).length;

  const inactiveRepositories =
    repositories.length - activeRepositories;

  const now = new Date();
  const thisYearStart = new Date(currentYear, 0, 1);
  const lastYearStart = new Date(currentYear - 1, 0, 1);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const countForPeriod = (start, end = now) => {
    const created = repositories.filter(repo => {
      const date = new Date(repo.created_at);
      return date >= start && date < end;
    }).length;
    const updated = repositories.filter(repo => {
      const date = new Date(repo.updated_at);
      return date >= start && date < end;
    }).length;
    return { created, updated, active: updated, inactive: repositories.length - updated };
  };

  const periods = {
    thisYear: countForPeriod(thisYearStart),
    lastYear: countForPeriod(lastYearStart, thisYearStart),
    last30Days: countForPeriod(thirtyDaysAgo),
    allTime: { created: repositories.length, updated: repositories.length, active: repositories.length, inactive: 0 },
  };

  return {
    repositoriesCreatedThisYear,
    repositoriesUpdatedThisYear,
    activeRepositories,
    inactiveRepositories,
    periods,
  };
}
