import axios from "axios";
import { GITHUB_API_BASE_URL } from "../../config/github.js";
import { GITHUB_TOKEN } from "../../config/env.js";

const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

export default githubApi;