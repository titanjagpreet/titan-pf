import type { Project } from "@/data/projects";

/** The subset of a project a card needs; keeps long case-study text out of the client payload. */
export type CardProject = Pick<
  Project,
  "slug" | "title" | "summary" | "kind" | "image" | "projectUrl" | "githubUrl" | "techStack"
>;

export function toCardProject(p: Project): CardProject {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    kind: p.kind,
    image: p.image,
    projectUrl: p.projectUrl,
    githubUrl: p.githubUrl,
    techStack: p.techStack?.slice(0, 3),
  };
}
