export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
}

export interface GitHubContributionData {
  totalContributions: number;
  weeks: {
    contributionDays: GitHubContributionDay[];
  }[];
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

/** Contribution data is refreshed at most once an hour (ISR), so visitors never wait on GitHub. */
const REVALIDATE_SECONDS = 3600;

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

/**
 * Returns null when GITHUB_TOKEN is missing or the request fails; the section is then hidden.
 * Set NEXT_PUBLIC_USE_MOCK_GITHUB=true to preview the graph with random data (overrides the token).
 */
export async function fetchGitHubContributions(
  username: string
): Promise<GitHubContributionData | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_GITHUB === "true") return generateMockData();

  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

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
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (data.errors) return null;

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar?.weeks?.length) return null;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };
  } catch {
    return null;
  }
}

/** Mirrors GitHub's shape, including partial first/last weeks. */
function generateMockData(): GitHubContributionData {
  const { from, to } = contributionWindow();
  const start = new Date(from.slice(0, 10));
  const end = new Date(to.slice(0, 10));
  const weeks: GitHubContributionData["weeks"] = [];
  let total = 0;

  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    if (weeks.length === 0 || d.getUTCDay() === 0) weeks.push({ contributionDays: [] });
    const count = Math.random() > 0.35 ? Math.floor(Math.random() * 12) : 0;
    total += count;
    weeks[weeks.length - 1].contributionDays.push({
      date: d.toISOString().slice(0, 10),
      contributionCount: count,
      contributionLevel:
        count === 0
          ? "NONE"
          : count <= 3
            ? "FIRST_QUARTILE"
            : count <= 6
              ? "SECOND_QUARTILE"
              : count <= 9
                ? "THIRD_QUARTILE"
                : "FOURTH_QUARTILE",
    });
  }

  return { totalContributions: total, weeks };
}
