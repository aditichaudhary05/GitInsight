export function filterRepositories(repositories, filters) {
  let filtered = [...repositories];

  const {
    language,
    fork,
    archived,
    hasDescription,
    hasTopics,
    visibility,
  } = filters;

  if (visibility === "public") {
    filtered = filtered.filter(repo => !repo.private);
  }

  if (visibility === "private") {
    filtered = filtered.filter(repo => repo.private);
  }

  if (language) {
    filtered = filtered.filter(
      (repo) => repo.language === language
    );
  }

  if (fork !== undefined) {
    const isFork = fork === "true";

    filtered = filtered.filter(
      (repo) => repo.fork === isFork
    );
  }

  if (archived !== undefined) {
    const isArchived = archived === "true";

    filtered = filtered.filter(
      (repo) => repo.archived === isArchived
    );
  }

  if (hasDescription === "true") {
    filtered = filtered.filter(
      (repo) => repo.description
    );
  }

  if (hasTopics === "true") {
    filtered = filtered.filter(
      (repo) =>
        repo.topics &&
        repo.topics.length > 0
    );
  }

  return filtered;
}
