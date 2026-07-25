export function formatProfile(user) {
  return {
    username: user.login,
    name: user.name,
    avatar: user.avatar_url,
    bio: user.bio,

    company: user.company,
    location: user.location,
    website: user.blog,
    twitter: user.twitter_username,

    email: user.email,

    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    publicGists: user.public_gists,

    createdAt: user.created_at,
    updatedAt: user.updated_at,

    profileUrl: user.html_url,
  };
}