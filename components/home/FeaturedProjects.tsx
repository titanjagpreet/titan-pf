"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SECTION_WIDTH } from "@/lib/constants";

const featuredProjects = projects.filter((p) => p.featured);

export function FeaturedProjects() {
  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-14"
        >
          <SectionBadge className="mb-3">Featured</SectionBadge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
            Projects
          </h2>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-600" />
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Show all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
