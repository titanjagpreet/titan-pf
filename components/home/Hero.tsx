"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Send, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
// import { SiX } from "react-icons/si"; // X (Twitter) icon — uncomment with the social link block below
import { FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/data/site";
import { techStack } from "@/data/tech-stack";
import { TechIcon } from "@/components/shared/TechIcon";
import { SECTION_WIDTH } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative min-h-[80vh] pt-20 pb-8 sm:min-h-[85vh] sm:pt-24 sm:pb-12">
      <div className={SECTION_WIDTH}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8"
        >
          {/* Profile Image - Top left, content flows below */}
          <motion.div variants={item} className="shrink-0">
            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative h-20 w-20 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 sm:h-24 sm:w-24 md:h-28 md:w-28"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteConfig.profileImageUrl}
                alt={siteConfig.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
                style={{ display: "none" }}
              >
                <span className="text-xl font-semibold">
                  {siteConfig.name.charAt(0)}
                </span>
              </div>
            </motion.div>
          </motion.div>
          {/* Content - Below image, left-aligned */}
          <div className="space-y-6">
            {/* Main heading - "Hi, I'm Name" primary, "— Title" secondary */}
            <motion.h1
              variants={item}
              className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl"
            >
              <span className="text-zinc-900 dark:text-zinc-100">Hi, I&apos;m {siteConfig.name}</span>
              <span className="text-zinc-500 dark:text-zinc-400"> — {siteConfig.title}.</span>
            </motion.h1>

            {/* Tagline - single line on desktop, two lines on mobile/tablet */}
            <motion.div variants={item} className="block md:flex md:flex-nowrap md:items-baseline">
              <p className="text-xs text-zinc-900 dark:text-zinc-100 sm:text-sm">
                <span className="font-bold">aka</span> {siteConfig.alias}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 sm:text-base md:ml-1">
                <span className="hidden md:inline">— </span>
                {siteConfig.tagline}
              </p>
            </motion.div>

            {/* CTA Buttons: Resume = soft fill (lighter than hover), Get in touch = solid */}
            <motion.div variants={item} className="flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/resume"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-900 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:min-h-0 sm:px-4 sm:text-sm"
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                Resume / CV
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-zinc-900 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-100 transition-all hover:bg-zinc-800 active:scale-95 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:min-h-0 sm:px-4 sm:text-sm"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                Get in touch
              </Link>
            </motion.div>

            {/* Social Icons - visible in both modes */}
            <motion.div variants={item} className="flex gap-4 sm:gap-6">
              {/* Twitter / X — commented out (not public); restore import SiX above and uncomment this block to show:
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 sm:min-h-0 sm:min-w-0 sm:hover:bg-transparent sm:dark:hover:bg-transparent"
                aria-label="X (Twitter)"
              >
                <SiX className="h-6 w-6" />
              </a>
              */}
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 sm:min-h-0 sm:min-w-0 sm:hover:bg-transparent sm:dark:hover:bg-transparent"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 sm:min-h-0 sm:min-w-0 sm:hover:bg-transparent sm:dark:hover:bg-transparent"
                aria-label="GitHub"
              >
                <SiGithub className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.socialLinks.email}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 sm:min-h-0 sm:min-w-0 sm:hover:bg-transparent sm:dark:hover:bg-transparent"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </motion.div>

            {/* Tech Badges - visible in both modes */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-1.5 pt-4 sm:gap-2 sm:pt-5"
            >
              {techStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[30px] items-center gap-0.5 rounded-lg border border-dashed border-zinc-300 bg-[#EEEADF] px-1.5 py-0.5 text-[10px] font-semibold text-zinc-900 transition-all duration-200 hover:border-zinc-400 hover:bg-[#E5E3D5] hover:scale-[1.025] dark:border-zinc-600 dark:bg-[#373637] dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-[#434344] sm:min-h-0 sm:gap-1 sm:px-1.5 sm:py-1 sm:text-xs md:gap-1.5 md:px-2 md:py-1 md:text-sm"
                >
                  <TechIcon name={tech.icon} color={tech.color} className="h-3 w-3 shrink-0 md:h-3 md:w-3" />
                  {tech.name}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
