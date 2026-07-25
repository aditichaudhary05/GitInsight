import githubApi from "./githubApi.js";


export async function getUser(username) {
  try {
    const { data } = await githubApi.get(`/users/${username}`);
    return data;

  } catch (error) {

    if (error.response?.status === 404) {
      const err = new Error("GitHub user not found");
      err.status = 404;
      throw err;
    }

    throw error;
  }
}

export async function getRepositories(username) {
  const repositories = [];
  const perPage = 100;
  let page = 1;

  while (true) {
    const { data } = await githubApi.get(
      `/users/${encodeURIComponent(username)}/repos`,
      { params: { per_page: perPage, page } }
    );
    repositories.push(...data);
    if (data.length < perPage) return repositories;
    page += 1;
  }
}

export async function getRepositoryLanguages(owner, repo) {
  const { data } = await githubApi.get(
    `/repos/${owner}/${repo}/languages`
  );

  return data;
}
