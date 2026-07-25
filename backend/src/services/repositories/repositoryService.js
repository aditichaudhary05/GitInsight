import { getRepositories as fetchRepositories } from "../github/githubService.js";
import { formatRepository } from "../../utils/formatRepository.js";
import { searchRepositories } from "../../utils/searchRepositories.js";
import { filterRepositories } from "../../utils/filterRepositories.js";
import { sortRepositories } from "../../utils/sortRepositories.js";
import { paginateRepositories } from "../../utils/paginateRepositories.js";
import { getRepositoryStatistics } from "../../utils/repositoryStatistics.js";

export async function getRepositoryData(username, options) {
  // Fetch repositories from GitHub
  const repositories = await fetchRepositories(username);

const searchedRepositories = searchRepositories(
  repositories,
  options.search
);

const filteredRepositories = filterRepositories(
  searchedRepositories,
  options
);

const sortedRepositories = sortRepositories(
  filteredRepositories,
  options.sort,
  options.order
);

// Statistics BEFORE pagination
const statistics = getRepositoryStatistics(
  sortedRepositories
);

const {
  repositories: paginatedRepositories,
  pagination,
} = paginateRepositories(
  sortedRepositories,
  options.page,
  options.limit
);

return {
  statistics,
  repositories: paginatedRepositories.map(formatRepository),
  pagination,
};
}