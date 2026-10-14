import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SECTION_WIDTH } from "@/lib/constants";
import { toCardProject } from "@/lib/project-card";

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className={SECTION_WIDTH}>
        <PageHeader
          badge={`${projects.length} ${projects.length === 1 ? "project" : "projects"}`}
          title="Projects"
          description="My projects and work across different technologies and domains."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={toCardProject(project)} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
