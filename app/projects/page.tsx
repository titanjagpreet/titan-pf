"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SECTION_WIDTH } from "@/lib/constants";

export default function ProjectsPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
            Projects
          </h1>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            My projects and work across different technologies and domains.
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base font-medium text-zinc-600 dark:text-zinc-400"
          >
            All Projects ({projects.length}{" "}
            {projects.length === 1 ? "project" : "projects"})
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
