import { getUser } from "../github/githubService.js";
import { formatProfile } from "../../utils/profileFormatter.js";

export async function getProfileData(username) {
  const user = await getUser(username);

  return formatProfile(user);
}