import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SECTION_WIDTH } from "@/lib/constants";
import { toCardProject } from "@/lib/project-card";

const featuredProjects = projects.filter((p) => p.featured);

export function FeaturedProjects() {
  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <SectionHeading badge="Featured" title="Projects" />

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={toCardProject(project)} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Show all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
