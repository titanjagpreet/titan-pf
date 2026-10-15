import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, Globe, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ProjectBadges } from "@/components/shared/ProjectStatusBadge";
import { ProjectImageFrame } from "@/components/shared/ProjectImageFrame";
import { Reveal } from "@/components/shared/Reveal";
import { TableOfContents, type TocItem } from "@/components/shared/TableOfContents";
import { projectImageTransition } from "@/lib/project-transition";
import { toCardProject } from "@/lib/project-card";
import { SECTION_WIDTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProjectCaseStudyViewProps {
  project: Project;
  nextProject: Project | null;
  relatedProjects: Project[];
}

const sectionClass = "mb-16 scroll-mt-28 border-t border-zinc-200 pt-12 dark:border-zinc-800";
const h2Class = "text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl";
const bodyClass = "text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-7";

const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={cn("max-w-3xl space-y-3", bodyClass)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudyView({ project, nextProject, relatedProjects }: ProjectCaseStudyViewProps) {
  // "Challenges" repeats "Technical challenges" when both exist; keep the detailed one.
  const showShortChallenges = !!project.challenges?.length && !project.challengesDetail?.length;

  // Section titles can be tailored per project (e.g. a learning project reads "What I learned").
  const titles = {
    whatItDoes: project.headings?.whatItDoes ?? "What it does",
    challenges: project.headings?.challenges ?? "Technical challenges",
    learnings: project.headings?.learnings ?? "Learnings",
  };

  const toc: TocItem[] = [
    { id: "overview", text: "Overview", level: 2 },
    project.whatItDoes?.length ? { id: "what-it-does", text: titles.whatItDoes, level: 2 } : null,
    project.technicalBreakdown?.length ? { id: "technical-breakdown", text: "Technical breakdown", level: 2 } : null,
    project.challengesDetail?.length ? { id: "technical-challenges", text: titles.challenges, level: 2 } : null,
    project.whoItsFor ? { id: "who-its-for", text: "Who it is for", level: 2 } : null,
    project.technicalSections?.length ? { id: "deep-dive", text: "Technical deep dive", level: 2 } : null,
    showShortChallenges ? { id: "challenges", text: "Challenges", level: 2 } : null,
    project.learnings?.length ? { id: "learnings", text: titles.learnings, level: 2 } : null,
    project.nextSteps?.length ? { id: "next-steps", text: "Next steps", level: 2 } : null,
  ].filter((item): item is TocItem => item !== null);

  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_48rem_minmax(0,1fr)]">
        <div className={cn(SECTION_WIDTH, "xl:col-start-2")}>
          <Link
            href="/projects"
            className="enter group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            style={at(0)}
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover:-translate-x-1" />
            Back to Projects
          </Link>

          {/* Shared element: morphs from the project card image when opened from a card */}
          <ViewTransition name={`project-image-${project.slug}`} {...projectImageTransition}>
            <ProjectImageFrame
              image={project.image}
              title={project.title}
              priority
              sizes="(min-width: 768px) 720px, calc(100vw - 48px)"
              className="mb-10 rounded-2xl border border-zinc-300 shadow-xl shadow-black/10 dark:border-zinc-700/50 dark:shadow-black/30 sm:p-10"
            />
          </ViewTransition>

          <header className="mb-12">
            <div className="enter flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between" style={at(1)}>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl md:text-5xl">
                {project.title}
              </h1>
              <ProjectBadges project={project} showKind />
            </div>

            <p className="enter mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400" style={at(2)}>
              {project.description}
            </p>

            {(project.projectUrl || project.githubUrl) && (
              <div className="enter mt-8 flex flex-wrap items-center gap-3" style={at(3)}>
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-800 active:scale-[0.97] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
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
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-300 bg-transparent px-6 text-sm font-medium text-zinc-900 transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-100 active:scale-[0.97] dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Github className="h-4 w-4" />
                    View Source Code
                  </a>
                )}
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <dl className="enter mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3" style={at(4)}>
                {project.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="flex flex-col-reverse rounded-xl border border-dashed border-zinc-300 bg-white/50 px-4 py-3.5 dark:border-zinc-700 dark:bg-zinc-900/40"
                  >
                    <dt className="mt-1 text-xs leading-snug text-zinc-500 dark:text-zinc-400">{h.label}</dt>
                    <dd className="font-mono text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {h.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {project.techStack && project.techStack.length > 0 && (
              <div className="enter mt-10" style={at(5)}>
                <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  Tech stack
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="inline-flex items-center rounded-md border border-zinc-300/40 bg-(--blog-surface) px-2.5 py-1.5 font-mono text-xs text-zinc-800 dark:border-white/10 dark:text-zinc-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          <Reveal as="section" id="overview" className="mb-16 scroll-mt-28">
            <h2 className={cn(h2Class, "mb-4")}>Overview</h2>
            <div className="max-w-3xl space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {(project.overview || project.description).split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          {project.whatItDoes && project.whatItDoes.length > 0 && (
            <Reveal as="section" id="what-it-does" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-4")}>{titles.whatItDoes}</h2>
              <Bullets items={project.whatItDoes} />
            </Reveal>
          )}

          {project.technicalBreakdown && project.technicalBreakdown.length > 0 && (
            <Reveal as="section" id="technical-breakdown" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-6")}>Technical breakdown</h2>
              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                {project.technicalBreakdown.map((part) => (
                  <div key={part.title}>
                    <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">{part.title}</h3>
                    <p className={bodyClass}>{part.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {project.challengesDetail && project.challengesDetail.length > 0 && (
            <Reveal as="section" id="technical-challenges" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-8")}>{titles.challenges}</h2>
              <ol className="max-w-3xl space-y-10">
                {project.challengesDetail.map((item, i) => (
                  <li key={i} className="grid grid-cols-[2rem_1fr] gap-x-3">
                    <span className="pt-0.5 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                      <p className={bodyClass}>{item.content}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {project.whoItsFor && (
            <Reveal as="section" id="who-its-for" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-4")}>Who it is for</h2>
              <p className={cn("max-w-3xl", bodyClass)}>{project.whoItsFor}</p>
            </Reveal>
          )}

          {project.technicalSections && project.technicalSections.length > 0 && (
            <Reveal as="section" id="deep-dive" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-6")}>Technical deep dive</h2>
              <div className="max-w-3xl space-y-10">
                {project.technicalSections.map((section, i) => (
                  <div key={i}>
                    <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
                      {section.heading}
                    </h3>
                    <div className={bodyClass}>
                      {section.body.split(/\n\n+/).map((para, j) => (
                        <p key={j} className={j > 0 ? "mt-4" : ""}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {showShortChallenges && (
            <Reveal as="section" id="challenges" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-4")}>Challenges</h2>
              <Bullets items={project.challenges!} />
            </Reveal>
          )}

          {project.learnings && project.learnings.length > 0 && (
            <Reveal as="section" id="learnings" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-4")}>{titles.learnings}</h2>
              <Bullets items={project.learnings} />
            </Reveal>
          )}

          {project.nextSteps && project.nextSteps.length > 0 && (
            <Reveal as="section" id="next-steps" className={sectionClass}>
              <h2 className={cn(h2Class, "mb-4")}>Next steps</h2>
              <Bullets items={project.nextSteps} />
            </Reveal>
          )}

          {nextProject && (
            <div className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-5 transition-[border-color,background-color] duration-200 hover:border-zinc-300 hover:bg-white/60 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
              >
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">Next project</span>
                  <span className="mt-1 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">{nextProject.title}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-zinc-400 transition-transform duration-300 ease-snappy group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
              </Link>
            </div>
          )}

          <Reveal className="mt-20">
            <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">More projects</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={toCardProject(p)} index={i} />
              ))}
            </div>
            <Link
              href="/projects"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <aside className="hidden xl:col-start-3 xl:block">
          <div className="sticky top-28 pl-8 pr-6">
            <TableOfContents items={toc} variant="rail" title="Case study" />
          </div>
        </aside>
      </div>
    </div>
  );
}
