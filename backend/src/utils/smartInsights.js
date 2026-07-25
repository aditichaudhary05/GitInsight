export function getSmartInsights({
  repositories,
  languages,
  health,
  productivity,
}) {
  const insights = [];

  const totalRepositories = repositories.total || 0;
  const activeRatio = totalRepositories
    ? Math.round((productivity.activeRepositories / totalRepositories) * 100)
    : 0;
  const originalRatio = totalRepositories
    ? Math.round((repositories.original / totalRepositories) * 100)
    : 0;

  // Primary language
  if (languages.primaryLanguage) {
    insights.push(
      `${languages.primaryLanguage} is your most-used programming language.`
    );
  }

  if (languages.totalLanguages >= 6) {
    insights.push(`You work across ${languages.totalLanguages} programming languages, showing a broad technical range.`);
  }

  if (languages.totalLanguages === 1) {
    insights.push(`Your repositories are strongly focused on ${languages.primaryLanguage || "one primary language"}.`);
  }

  if (totalRepositories >= 50) {
    insights.push(`You have built a substantial portfolio of ${totalRepositories} repositories.`);
  } else if (totalRepositories >= 10) {
    insights.push(`Your ${totalRepositories} repositories form a growing project portfolio.`);
  } else if (totalRepositories > 0) {
    insights.push(`Every repository counts: your ${totalRepositories} projects are a strong foundation to build on.`);
  }

  if (repositories.original > repositories.forked) {
    insights.push(`${originalRatio}% of your repositories are original work.`);
  }

  if (repositories.forked > repositories.original) {
    insights.push(`Forked repositories make up a large part of your workspace—great for learning from open source.`);
  }

  if (repositories.private > 0) {
    insights.push(`You maintain ${repositories.private} private ${repositories.private === 1 ? "repository" : "repositories"} alongside your public work.`);
  }

  // Health score
  if (health.overallHealthScore >= 80) {
    insights.push("Your repositories have excellent overall health.");
  } else if (health.overallHealthScore >= 60) {
    insights.push("Your repositories are in good shape, but there is room for improvement.");
  } else {
    insights.push("Consider improving repository documentation, licenses, and topics.");
  }

  if (health.descriptionCoverage >= 80) {
    insights.push("Most of your repositories include descriptions, making your work easier to discover.");
  } else if (health.descriptionCoverage < 50) {
    insights.push("Adding descriptions to more repositories would make your projects easier to understand.");
  }

  if (health.topicsCoverage >= 70) {
    insights.push("Your use of repository topics makes your projects easier to find.");
  } else if (health.topicsCoverage < 30 && totalRepositories > 0) {
    insights.push("Adding relevant topics could improve the discoverability of your repositories.");
  }

  if (health.licenseCoverage >= 70) {
    insights.push("Your licensing coverage is strong, giving visitors clarity about reuse.");
  } else if (health.licenseCoverage < 30 && totalRepositories > 0) {
    insights.push("Consider adding licenses to more repositories to clarify how others can use your code.");
  }

  if (health.emptyRepositories > 0) {
    insights.push(`${health.emptyRepositories} ${health.emptyRepositories === 1 ? "repository is" : "repositories are"} empty and could be archived or developed further.`);
  }

  if (health.archivedRepositories > 0) {
    insights.push(`${health.archivedRepositories} ${health.archivedRepositories === 1 ? "project is" : "projects are"} archived, keeping your active portfolio focused.`);
  }

  // Productivity
  if (productivity.inactiveRepositories > productivity.activeRepositories) {
    insights.push(
      "You have more inactive repositories than active ones."
    );
  }

  if (activeRatio >= 75 && totalRepositories > 0) {
    insights.push(`${activeRatio}% of your repositories have been active in the past year.`);
  } else if (activeRatio > 0 && activeRatio < 40) {
    insights.push(`Only ${activeRatio}% of your repositories have been active in the past year—there is room for a refresh.`);
  }

  if (productivity.repositoriesCreatedThisYear > 0) {
    insights.push(
      `You created ${productivity.repositoriesCreatedThisYear} repositories this year.`
    );
  }

  if (productivity.repositoriesUpdatedThisYear > 0) {
    insights.push(`You updated ${productivity.repositoriesUpdatedThisYear} ${productivity.repositoriesUpdatedThisYear === 1 ? "repository" : "repositories"} this year.`);
  }

  if (productivity.repositoriesCreatedThisYear >= 5) {
    insights.push("You have had a productive year of creating new projects.");
  }

  if (productivity.activeRepositories === 0 && totalRepositories > 0) {
    insights.push("None of your repositories have been updated in the last year; a small maintenance pass could make a difference.");
  }

  // Archived repositories
  const archived = repositories.archived;

  if (archived > 0) {
    insights.push(
      `You have ${archived} archived repositories.`
    );
  }

  // Additional tailored observations for a varied insight feed.
  if (totalRepositories >= 100) insights.push("Your project catalogue is extensive—pinning a few standout repositories can help visitors find your best work.");
  if (repositories.public >= 20) insights.push(`${repositories.public} public repositories give your work strong open-source visibility.`);
  if (repositories.forked >= 10) insights.push(`You have explored ${repositories.forked} forked projects, a useful way to learn from the community.`);
  if (languages.totalLanguages >= 10) insights.push("Your broad language mix suggests you are comfortable selecting tools for different kinds of problems.");
  if (languages.totalLanguages >= 3 && languages.totalLanguages < 6) insights.push("Your stack has a healthy balance of focus and variety.");
  if (health.descriptionCoverage >= 60 && health.descriptionCoverage < 80) insights.push("A few more repository descriptions would make an already discoverable portfolio even clearer.");
  if (health.licenseCoverage >= 40 && health.licenseCoverage < 70) insights.push("You have started adding licenses; extending that coverage would make collaboration easier.");
  if (productivity.repositoriesUpdatedThisYear >= 10) insights.push("Your steady update activity shows a strong maintenance habit.");
  if (productivity.activeRepositories >= 5) insights.push(`${productivity.activeRepositories} active repositories show that multiple projects are moving forward at once.`);
  if (repositories.private === 0 && totalRepositories > 0) insights.push("Your portfolio is fully public, making it especially easy for others to explore your work.");

  return [...new Set(insights)];
}
