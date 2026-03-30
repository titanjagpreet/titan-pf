import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectCaseStudyView } from "@/components/projects/ProjectCaseStudyView";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site-url";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}/projects/${project.slug}`;
  const ogDescription = `${project.description} — a project by Jagpreet Singh.`;
  return {
    title: project.title,
    description: ogDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Jagpreet Singh`,
      description: ogDescription,
      url,
      type: "article",
      authors: ["Jagpreet Singh"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Jagpreet Singh`,
      description: ogDescription,
    },
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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      />
      <ProjectCaseStudyView
        project={project}
        nextProject={nextProject}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
