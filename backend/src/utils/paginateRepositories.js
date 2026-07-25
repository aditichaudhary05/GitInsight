export function paginateRepositories(
  repositories,
  page = 1,
  limit = 10
) {
  page = Number(page);
  limit = Number(limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    repositories: repositories.slice(start, end),
    pagination: {
      page,
      limit,
      totalRepositories: repositories.length,
      totalPages: Math.ceil(repositories.length / limit),
      hasNextPage: end < repositories.length,
      hasPreviousPage: page > 1,
    },
  };
}