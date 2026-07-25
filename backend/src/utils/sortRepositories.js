export function sortRepositories(
  repositories,
  sortBy = "updated",
  order = "desc"
) {
  const sorted = [...repositories];

  const direction = order === "asc" ? 1 : -1;

  switch (sortBy) {
    case "stars":
      sorted.sort(
        (a, b) =>
          (a.stargazers_count - b.stargazers_count) *
          direction
      );
      break;

    case "forks":
      sorted.sort(
        (a, b) =>
          (a.forks_count - b.forks_count) *
          direction
      );
      break;

    case "size":
      sorted.sort(
        (a, b) =>
          (a.size - b.size) *
          direction
      );
      break;

    case "created":
      sorted.sort(
        (a, b) =>
          (new Date(a.created_at) -
            new Date(b.created_at)) *
          direction
      );
      break;

    case "updated":
      sorted.sort(
        (a, b) =>
          (new Date(a.updated_at) -
            new Date(b.updated_at)) *
          direction
      );
      break;

    case "name":
      sorted.sort((a, b) =>
        direction === 1
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      break;

    default:
      break;
  }

  return sorted;
}