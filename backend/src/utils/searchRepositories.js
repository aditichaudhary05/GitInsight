export function searchRepositories(repositories, search = "") {
  if (!search) return repositories;

  const query = search.toLowerCase().trim();

  return repositories.filter((repo) => {
    const name = repo.name?.toLowerCase() || "";
    const description = repo.description?.toLowerCase() || "";

    return (
      name.includes(query) ||
      description.includes(query)
    );
  });
}