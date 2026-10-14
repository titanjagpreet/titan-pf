import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Send, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
// import { SiX } from "react-icons/si"; // X (Twitter) icon — uncomment with the social link block below
import { FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/data/site";
import { techStack } from "@/data/tech-stack";
import { TechIcon } from "@/components/shared/TechIcon";
import { LocalTime } from "@/components/shared/LocalTime";
import { SECTION_WIDTH } from "@/lib/constants";
import profileImage from "@/public/assets/profile.jpg";

/** Stagger position for the CSS `enter` animation (see globals.css). */
const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

const socialLinkClass =
  "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition-[color,transform] duration-200 ease-snappy hover:-translate-y-0.5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:min-h-0 sm:min-w-0";

function Words({ text, offset }: { text: string; offset: number }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 ? " " : null}
      <span className="enter-word" style={at(offset + i)}>
        {word}
      </span>
    </Fragment>
  ));
}

export function Hero() {
  const lead = `Hi, I'm ${siteConfig.name}`;
  const role = `— ${siteConfig.title}.`;

  return (
    <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14">
      <div className={SECTION_WIDTH}>
        <div className="flex flex-col gap-7">
          {/* Avatar + availability */}
          <div className="enter flex items-center gap-4 sm:gap-5" style={at(0)}>
            <div className="group/avatar relative h-20 w-20 shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-200 ring-1 ring-black/5 transition-transform duration-500 ease-snappy group-hover/avatar:-rotate-6 group-hover/avatar:scale-105 dark:bg-zinc-800 dark:ring-white/10">
                <Image
                  src={profileImage}
                  alt={`${siteConfig.name}, ${siteConfig.title}`}
                  fill
                  priority
                  placeholder="blur"
                  sizes="112px"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              {siteConfig.availability ? (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-100/60 px-2.5 py-1 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {siteConfig.availability}
                </span>
              ) : null}
              <span className="pl-1">
                {siteConfig.location} · <LocalTime />
              </span>
            </div>
          </div>

          <div className="space-y-5">
            <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.6rem]">
              <span className="text-zinc-900 dark:text-zinc-100">
                <Words text={lead} offset={0} />
              </span>{" "}
              <span className="text-zinc-500 dark:text-zinc-400">
                <Words text={role} offset={lead.split(" ").length} />
              </span>
            </h1>

            <p className="enter text-sm text-zinc-600 dark:text-zinc-400 sm:text-base" style={at(3)}>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">aka {siteConfig.alias}</span>
              {" — "}
              {siteConfig.tagline}
            </p>

            <p
              className="enter max-w-xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg"
              style={at(4)}
            >
              {siteConfig.intro}
            </p>
          </div>

          {/* CTAs + socials */}
          <div className="enter flex flex-wrap items-center gap-x-6 gap-y-4" style={at(5)}>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/resume"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm font-medium text-zinc-900 transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-100 active:scale-[0.97] dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600 sm:px-4"
              >
                <FileText className="h-4 w-4" />
                Resume / CV
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-zinc-900 bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-100 transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-800 active:scale-[0.97] dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:px-4"
              >
                <Send className="h-4 w-4" />
                Get in touch
              </Link>
            </div>

            <div className="flex gap-3 sm:gap-5">
              {/* Twitter / X — commented out (not public); restore import SiX above and uncomment this block to show:
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              */}
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-[22px] w-[22px]" />
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="GitHub"
              >
                <SiGithub className="h-[22px] w-[22px]" />
              </a>
              <a href={siteConfig.socialLinks.email} className={socialLinkClass} aria-label="Email">
                <Mail className="h-[22px] w-[22px]" />
              </a>
            </div>
          </div>

          {/* Tech badges: monochrome at rest, bloom into brand color on hover */}
          <ul className="enter flex flex-wrap gap-1.5 pt-2 sm:gap-2" style={at(6)} aria-label="Tech stack">
            {techStack.map((tech) => (
              <li
                key={tech.name}
                style={{ "--brand": tech.color ?? "var(--foreground)" } as React.CSSProperties}
                className="group/tech flex items-center gap-1.5 rounded-lg border border-dashed border-zinc-300 bg-[#EEEADF] px-2 py-1 text-xs font-semibold text-zinc-800 transition-[border-color,background-color] duration-200 hover:border-zinc-400 hover:bg-[#E5E3D5] dark:border-zinc-600 dark:bg-[#373637] dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-[#434344] md:text-sm"
              >
                <TechIcon
                  name={tech.icon}
                  className="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-200 group-hover/tech:text-(--brand) dark:text-zinc-400"
                />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
