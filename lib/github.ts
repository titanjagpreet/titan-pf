export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

export interface GitHubContributionData {
  totalContributions: number;
  weeks: {
    contributionDays: GitHubContributionDay[];
  }[];
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const CONTRIBUTION_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/** Rolling last ~365 days in UTC (matches GitHub profile “contributions in the last year”). */
function contributionWindow(): { from: string; to: string } {
  const to = new Date();
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);
  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

export async function fetchGitHubContributions(
  username: string
): Promise<GitHubContributionData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  const { from, to } = contributionWindow();

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { username, from, to },
      }),
      cache: "no-store",
    });

    const data = await response.json();
    if (data.errors) return null;

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };
  } catch {
    return null;
  }
}
