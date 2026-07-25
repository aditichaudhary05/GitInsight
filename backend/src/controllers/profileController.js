import { getProfileData } from "../services/profile/profileService.js";

export async function getProfileHandler(req, res, next) {
  try {
    const { username } = req.params;

    const data = await getProfileData(username);

    res.json(data);
  } catch (error) {
    next(error);
  }
}