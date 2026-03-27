"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SECTION_WIDTH } from "@/lib/constants";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface GitHubActivityProps {
  initialData?: {
    totalContributions: number;
    weeks: { contributionDays: ContributionDay[] }[];
  } | null;
}

function getContributionColor(count: number): string {
  if (count === 0) return "bg-zinc-200 dark:bg-zinc-800";
  if (count <= 3) return "bg-emerald-200 dark:bg-emerald-900";
  if (count <= 6) return "bg-emerald-400 dark:bg-emerald-700";
  if (count <= 9) return "bg-emerald-500";
  return "bg-emerald-600 dark:bg-emerald-400";
}

export function GitHubActivity({ initialData }: GitHubActivityProps) {
  const [data, setData] = useState(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/github?username=${siteConfig.githubUsername}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (json.data?.weeks?.length) {
          setData(json.data);
        } else if (process.env.NEXT_PUBLIC_USE_MOCK_GITHUB === "true") {
          setData(generateMockData());
        } else {
          setData(null);
        }
      } catch {
        if (process.env.NEXT_PUBLIC_USE_MOCK_GITHUB === "true") {
          setData(generateMockData());
        } else {
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [initialData]);

  if (loading) {
    return (
      <section className="py-8 sm:py-10 md:py-16">
        <div className={SECTION_WIDTH}>
          <div className="rounded-xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/50 p-4 sm:p-6 md:p-8">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 sm:text-lg">GitHub Activity</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-500">
              Fetching your GitHub activity data...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const weeks = data?.weeks ?? [];
  const total = data?.totalContributions ?? 0;
  const hasData = weeks.length > 0;

  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/50 p-4 shadow-xl shadow-black/10 dark:shadow-black/20 sm:p-6 md:p-8"
        >
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 sm:text-lg">GitHub Activity</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-500">
            {siteConfig.githubUsername}&apos;s coding journey over the past year
          </p>
          {hasData ? (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Total: <strong className="text-zinc-900 dark:text-zinc-100">{total.toLocaleString()}</strong>{" "}
              contributions
            </p>
          ) : (
            <div className="mt-3 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-400">
              <p className="font-medium text-zinc-800 dark:text-zinc-200">Couldn&apos;t load live contributions</p>
              <p className="mt-2">
                This usually means <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">GITHUB_TOKEN</code> is missing or invalid. Add a{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Personal Access Token
                </a>{" "}
                with <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">read:user</code> to{" "}
                <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">.env.local</code>, restart the dev server, and confirm{" "}
                <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">githubUsername</code> in{" "}
                <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">data/site.ts</code> matches your GitHub login.
              </p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                Previously, missing API data showed random placeholder data (~1000+ contributions). That fallback is off unless you set{" "}
                <code className="rounded bg-zinc-200 px-1 py-0.5 dark:bg-zinc-800">NEXT_PUBLIC_USE_MOCK_GITHUB=true</code>.
              </p>
            </div>
          )}

          <div className="mt-6 min-w-0 overflow-hidden">
            {hasData ? (
              <div
                className="grid gap-0.5 sm:gap-1"
                style={{ gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) =>
                  weeks.map((week, weekIndex) => {
                    const day = week.contributionDays[dayIndex];
                    if (!day) return null;
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`aspect-square min-w-0 rounded-sm ${getContributionColor(day.contributionCount)}`}
                        title={`${day.date}: ${day.contributionCount} contributions`}
                      />
                    );
                  })
                )}
              </div>
            ) : (
              <div className="flex h-24 items-center justify-center rounded-lg bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-500">
                No contribution grid to display
              </div>
            )}
          </div>

          {hasData ? (
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-500">
            <span>Less</span>
            <div className="flex gap-0.5">
              <div className="h-2 w-2 rounded-sm bg-zinc-200 dark:bg-zinc-800 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-sm bg-emerald-200 dark:bg-emerald-900 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-sm bg-emerald-400 dark:bg-emerald-700 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-sm bg-emerald-500 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-sm bg-emerald-600 dark:bg-emerald-400 sm:h-2.5 sm:w-2.5" />
            </div>
            <span>More</span>
          </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

function generateMockData(): {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
} {
  const weeks: { contributionDays: ContributionDay[] }[] = [];
  const today = new Date();
  let total = 0;

  for (let w = 0; w < 53; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (52 - w) * 7 - (6 - d));
      const count = Math.random() > 0.3 ? Math.floor(Math.random() * 10) : 0;
      total += count;
      days.push({
        date: date.toISOString().split("T")[0],
        contributionCount: count,
      });
    }
    weeks.push({ contributionDays: days });
  }

  return { totalContributions: total, weeks };
}
