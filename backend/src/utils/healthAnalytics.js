export function getHealthAnalytics(repositories) {
  const total = repositories.length;

  if (total === 0) {
    return {
      descriptionCoverage: 0,
      licenseCoverage: 0,
      topicsCoverage: 0,
      archivedRepositories: 0,
      emptyRepositories: 0,
      overallHealthScore: 0,
    };
  }

  const descriptionCount = repositories.filter(
    (repo) => repo.description
  ).length;

  const licenseCount = repositories.filter(
    (repo) => repo.license
  ).length;

  const topicsCount = repositories.filter(
    (repo) => repo.topics && repo.topics.length > 0
  ).length;

  const archivedRepositories = repositories.filter(
    (repo) => repo.archived
  ).length;

  const emptyRepositories = repositories.filter(
    (repo) => repo.size === 0
  ).length;

  const descriptionCoverage = Math.round(
    (descriptionCount / total) * 100
  );

  const licenseCoverage = Math.round(
    (licenseCount / total) * 100
  );

  const topicsCoverage = Math.round(
    (topicsCount / total) * 100
  );

  const overallHealthScore = Math.round(
    (descriptionCoverage +
      licenseCoverage +
      topicsCoverage) / 3
  );

  return {
    descriptionCoverage,
    licenseCoverage,
    topicsCoverage,
    archivedRepositories,
    emptyRepositories,
    overallHealthScore,
  };
}