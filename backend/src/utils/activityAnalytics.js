export function getActivityAnalytics(repositories) {
  const createdPerYear = {};
  const updatedPerYear = {};

  for (const repo of repositories) {
    const createdYear = new Date(repo.created_at).getFullYear();
    const updatedYear = new Date(repo.updated_at).getFullYear();

    createdPerYear[createdYear] =
      (createdPerYear[createdYear] || 0) + 1;

    updatedPerYear[updatedYear] =
      (updatedPerYear[updatedYear] || 0) + 1;
  }

  const reposCreatedPerYear = Object.entries(createdPerYear)
    .map(([year, count]) => ({
      year: Number(year),
      count,
    }))
    .sort((a, b) => a.year - b.year);

  const reposUpdatedPerYear = Object.entries(updatedPerYear)
    .map(([year, count]) => ({
      year: Number(year),
      count,
    }))
    .sort((a, b) => a.year - b.year);

  const averageReposPerYear =
    reposCreatedPerYear.length === 0
      ? 0
      : Number(
          (
            repositories.length /
            reposCreatedPerYear.length
          ).toFixed(2)
        );

  return {
    averageReposPerYear,
    reposCreatedPerYear,
    reposUpdatedPerYear,
  };
}