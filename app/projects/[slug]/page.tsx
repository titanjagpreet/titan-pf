import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectCaseStudyView } from "@/components/projects/ProjectCaseStudyView";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} - Project Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const nextProject = project.nextProjectSlug
    ? projects.find((p) => p.slug === project.nextProjectSlug) ?? null
    : null;
  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <ProjectCaseStudyView
      project={project}
      nextProject={nextProject}
      relatedProjects={relatedProjects}
    />
  );
}
