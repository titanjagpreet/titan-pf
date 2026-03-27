"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Globe, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SECTION_WIDTH } from "@/lib/constants";

interface ProjectCaseStudyViewProps {
  project: Project;
  nextProject: Project | null;
  relatedProjects: Project[];
}

const sectionClass = "mb-16 border-t border-zinc-200 pt-12 dark:border-zinc-800";

export function ProjectCaseStudyView({
  project,
  nextProject,
  relatedProjects,
}: ProjectCaseStudyViewProps) {
  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className={SECTION_WIDTH}>
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            {project.status && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.status}</p>
            )}
          </div>

          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>

          {(project.projectUrl || project.githubUrl) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <Globe className="h-4 w-4" />
                  Visit Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-300 bg-transparent px-6 text-sm font-medium text-zinc-900 transition-all hover:scale-105 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Github className="h-4 w-4" />
                  View Source Code
                </a>
              )}
            </div>
          )}
        </motion.div>

        {project.techStack && project.techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-zinc-300/40 bg-(--blog-surface) px-2.5 py-1.5 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="prose prose-zinc mb-16 max-w-none dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-700 dark:prose-p:text-zinc-300"
        >
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Overview</h2>
          <p className="whitespace-pre-wrap leading-relaxed">
            {project.overview || project.description}
          </p>
        </motion.div>

        {project.whatItDoes && project.whatItDoes.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className={sectionClass}
          >
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              What it does
            </h2>
            <ul className="max-w-3xl space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
              {project.whatItDoes.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {project.technicalBreakdown && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={sectionClass}
          >
            <h2 className="mb-6 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Technical breakdown
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <div>
                <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  System architecture
                </h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
                  {project.technicalBreakdown.extension}
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Ingestion and data layer
                </h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
                  {project.technicalBreakdown.backend}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {project.challengesDetail && project.challengesDetail.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className={sectionClass}
          >
            <h2 className="mb-8 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Technical challenges
            </h2>
            <div className="max-w-3xl space-y-10">
              {project.challengesDetail.map((item, i) => (
                <div key={i}>
                  <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {project.whoItsFor && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className={sectionClass}
          >
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Who it is for
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
              {project.whoItsFor}
            </p>
          </motion.section>
        )}

        {project.technicalSections && project.technicalSections.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className={sectionClass}
            aria-labelledby="legacy-technical-sections-heading"
          >
            <h2
              id="legacy-technical-sections-heading"
              className="mb-6 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl"
            >
              Technical deep dive
            </h2>
            <div className="max-w-3xl space-y-10">
              {project.technicalSections.map((section, i) => (
                <div key={i}>
                  <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
                    {section.heading}
                  </h3>
                  <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
                    {section.body.split(/\n\n+/).map((para, j) => (
                      <p key={j} className={j > 0 ? "mt-4" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className={sectionClass}
          >
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Challenges
            </h2>
            <ul className="max-w-3xl space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {project.learnings && project.learnings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={sectionClass}
          >
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Learnings
            </h2>
            <ul className="max-w-3xl space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7">
              {project.learnings.map((l, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {nextProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
            className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800"
          >
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Next Project: {nextProject.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            Related Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-6 inline-block text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
