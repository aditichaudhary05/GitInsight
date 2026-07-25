import { getRepositoryData } from "../services/repositories/repositoryService.js";


export async function getRepositoriesController(req, res, next) {
  try {
    const { username } = req.params;
    const {
  sort,
  order,
  search,
  language,
  fork,
  archived,
  hasDescription,
  hasTopics,
  visibility,
  page,
  limit,
} = req.query;

    const data = await getRepositoryData(username, {
  sort,
  order,
  search,
  language,
  fork,
  archived,
  hasDescription,
  hasTopics,
  visibility,
  page,
  limit,
});
    res.json(data);
  } catch (error) {
    next(error);
  }
}
