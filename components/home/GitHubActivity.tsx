import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { fetchGitHubContributions } from "@/lib/github";
import { Reveal } from "@/components/shared/Reveal";
import { ContributionGraph } from "@/components/home/ContributionGraph";
import { SECTION_WIDTH } from "@/lib/constants";

/** Fetched on the server (revalidated hourly). If GitHub is unavailable the section is simply omitted. */
export async function GitHubActivity() {
  const data = await fetchGitHubContributions(siteConfig.githubUsername);
  if (!data) return null;

  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <Reveal className="rounded-2xl border border-zinc-300 bg-white p-4 shadow-xl shadow-black/10 dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:shadow-black/20 sm:p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 sm:text-lg">
                GitHub Activity
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">
                {siteConfig.githubUsername}&apos;s coding journey over the past year
              </p>
            </div>
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1 rounded-md font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              @{siteConfig.githubUsername}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <ContributionGraph data={data} />
        </Reveal>
      </div>
    </section>
  );
}
