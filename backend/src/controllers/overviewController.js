import { getOverviewData } from "../services/overview/overviewService.js";

export async function getOverview(req, res, next) {
  try {
    const { username } = req.params;

    const overview = await getOverviewData(username);

    res.json(overview);

  } catch (error) {
    next(error);
  }
}