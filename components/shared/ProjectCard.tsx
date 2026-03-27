"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectStatusBadge } from "@/components/shared/ProjectStatusBadge";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/50 shadow-lg shadow-black/10 dark:shadow-black/20 transition-all hover:border-zinc-400 dark:hover:border-zinc-600/50 hover:shadow-xl dark:hover:shadow-black/30"
    >
      {/* Image placeholder area */}
      <div className="aspect-video w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-500 dark:text-zinc-600">
            <span className="text-xs">Image coming soon</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-6">
        {/* Title row with icons */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base md:text-lg">
            {project.title}
          </h3>
          <div className="flex shrink-0 gap-2">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                aria-label="View project"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>

        {/* Bottom row: status left, View Details right */}
        <div className="mt-auto flex items-center justify-between pt-2">
          {project.status && <ProjectStatusBadge status={project.status} />}
          <Link
            href={`/projects/${project.slug}`}
            className="group/link ml-auto inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
