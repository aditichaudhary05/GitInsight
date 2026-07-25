import { getLanguageData } from "../services/languages/languageService.js";

export async function getLanguagesHandler(req, res, next) {
  try {
    const { username } = req.params;
    const { language } = req.query;

    const data = await getLanguageData(username, {
      language,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
}