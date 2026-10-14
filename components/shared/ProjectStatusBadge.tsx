import { Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

/** Meaningful status pills derived from the project's links: "Live" (deployed) and "Open source" (public repo). */
export function ProjectBadges({
  project,
  showKind = false,
}: {
  project: Pick<Project, "projectUrl" | "githubUrl" | "kind">;
  showKind?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
      {project.projectUrl ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      ) : null}
      {project.githubUrl ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300/70 px-2.5 py-0.5 font-mono text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          <Code2 className="h-3 w-3" aria-hidden />
          Open source
        </span>
      ) : null}
      {showKind ? (
        <span className="truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-500">{project.kind}</span>
      ) : null}
    </div>
  );
}
