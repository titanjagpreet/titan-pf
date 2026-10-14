"use client";

import { useState, ViewTransition } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Github } from "lucide-react";
import type { CardProject } from "@/lib/project-card";
import { ProjectBadges } from "@/components/shared/ProjectStatusBadge";
import { ProjectImageFrame } from "@/components/shared/ProjectImageFrame";
import { EASE_OUT, IN_VIEW_ONCE } from "@/lib/motion";
import { trackSpotlight } from "@/lib/spotlight";
import { projectImageTransition } from "@/lib/project-transition";
import { useOpenProject } from "@/lib/use-open-project";

interface ProjectCardProps {
  project: CardProject;
  index?: number;
}

const iconLinkClass =
  "relative z-[4] flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg text-zinc-500 transition-colors duration-150 hover:bg-zinc-200/70 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200";

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  // Only the clicked card's image gets the shared name, so it alone morphs into the case study hero
  // (other cards would otherwise pair with the "More projects" cards on the next page).
  const [morph, setMorph] = useState(false);
  const openProject = useOpenProject(() => flushSync(() => setMorph(true)));
  const href = `/projects/${project.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW_ONCE}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: (index % 2) * 0.06 }}
      onPointerMove={trackSpotlight}
      className="spotlight group flex flex-col overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-lg shadow-black/5 transition-[border-color,box-shadow] duration-300 ease-snappy hover:border-zinc-400/80 hover:shadow-xl has-[.card-link:focus-visible]:outline-2 has-[.card-link:focus-visible]:outline-offset-2 has-[.card-link:focus-visible]:outline-accent dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:shadow-black/20 dark:hover:border-zinc-600/60 dark:hover:shadow-black/30"
    >
      <ViewTransition name={morph ? `project-image-${project.slug}` : undefined} {...projectImageTransition}>
        <ProjectImageFrame
          image={project.image}
          title={project.title}
          sizes="(min-width: 768px) 360px, calc(100vw - 48px)"
          className="border-b border-zinc-200 dark:border-zinc-800"
          imageClassName="transition-transform duration-500 ease-snappy group-hover:-translate-y-1 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </ViewTransition>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">{project.kind}</p>
            <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-lg">
              {/* Stretched link: the whole card opens the case study */}
              <Link
                href={href}
                onClick={openProject}
                className="card-link outline-none after:absolute after:inset-0 after:z-[3] after:content-['']"
              >
                {project.title}
              </Link>
            </h3>
          </div>
          <div className="-mr-2 -mt-2 flex shrink-0 gap-0.5">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={`Visit ${project.title} live site`}
                title="Live site"
              >
                <Globe className="h-[18px] w-[18px]" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={`View ${project.title} source on GitHub`}
                title="Source code"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
            )}
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>

        {project.techStack && project.techStack.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.techStack.slice(0, 3).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-zinc-300/60 bg-(--blog-surface) px-2 py-0.5 font-mono text-[11px] text-zinc-700 dark:border-white/10 dark:text-zinc-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <ProjectBadges project={project} />
          <span
            aria-hidden
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100"
          >
            Case study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
