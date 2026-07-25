import { achievementDefinitions } from "../data/achievements.js";

const daysSince = date => (Date.now() - new Date(date).getTime()) / 86_400_000;

function buildMetrics(user, repositories) {
  const publicRepositories = repositories.filter(repo => !repo.fork).length;
  const totalStars = repositories.reduce((sum, repo) => sum + Number(repo.stargazers_count || 0), 0);
  const totalForks = repositories.reduce((sum, repo) => sum + Number(repo.forks_count || 0), 0);
  const languages = new Set(repositories.map(repo => repo.language).filter(Boolean)).size;
  const topics = new Set(repositories.flatMap(repo => repo.topics || [])).size;
  const activeRepositories = repositories.filter(repo => daysSince(repo.updated_at) <= 365).length;
  const recentRepositories = repositories.filter(repo => daysSince(repo.updated_at) <= 30).length;
  const describedRepositories = repositories.filter(repo => repo.description?.trim()).length;
  const licensedRepositories = repositories.filter(repo => repo.license).length;
  const accountYears = Math.max(0, Math.floor(daysSince(user.created_at) / 365.25));

  return {
    publicRepositories, totalStars, totalForks, languages, topics, activeRepositories,
    recentRepositories, describedRepositories, licensedRepositories, accountYears,
    followers: Number(user.followers || 0), following: Number(user.following || 0),
    publicGists: Number(user.public_gists || 0), joinedBefore2020: new Date(user.created_at).getFullYear() < 2020 ? 1 : 0,
    completeProfile: user.bio && user.company && user.location ? 1 : 0,
  };
}

function trendFromRepositories(repositories, unlockedCount) {
  const currentYear = new Date().getFullYear();
  const years = [...new Set(repositories.map(repo => new Date(repo.created_at).getFullYear()).filter(Number.isFinite)), currentYear]
    .filter((year, index, values) => values.indexOf(year) === index)
    .sort((a, b) => a - b);
  let points = 0;
  return years.flatMap(year => Array.from({ length: 12 }, (_, monthIndex) => {
    const earnedThisMonth = repositories.filter(repo => {
      const created = new Date(repo.created_at);
      return created.getFullYear() === year && created.getMonth() === monthIndex;
    }).length;
    points += earnedThisMonth * 50;
    return {
      year,
      month: new Date(year, monthIndex).toLocaleString("en", { month: "short" }).toUpperCase(),
      value: points + unlockedCount * 25,
    };
  }));
}

export function getAchievementAnalytics(user, repositories) {
  const metrics = buildMetrics(user, repositories);
  const achievements = achievementDefinitions.map(definition => {
    const { current, target } = definition.progress(metrics);
    const unlocked = current >= target;
    return {
      id: definition.id, title: definition.title, description: definition.description,
      icon: definition.icon, tone: definition.tone, points: definition.points,
      unlocked, current, target, progress: Math.min(100, Math.round((current / target) * 100)),
    };
  });
  const unlocked = achievements.filter(achievement => achievement.unlocked);
  const locked = achievements.filter(achievement => !achievement.unlocked);
  const totalPoints = unlocked.reduce((total, achievement) => total + achievement.points, 0);
  const recentlyEarned = [...unlocked]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)
    .map((achievement, index) => ({ ...achievement, earnedAt: repositories[index]?.updated_at || user.updated_at }));

  return {
    summary: {
      totalAchievements: achievementDefinitions.length,
      unlocked: unlocked.length,
      locked: locked.length,
      totalPoints,
      categories: new Set(achievementDefinitions.map(achievement => achievement.tone)).size,
    },
    achievements,
    unlocked,
    locked,
    recentlyEarned,
    pointHistory: trendFromRepositories(repositories, unlocked.length),
  };
}
