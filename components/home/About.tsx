"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SECTION_WIDTH } from "@/lib/constants";

export function About() {
  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <SectionBadge className="mb-3">Yours Truly</SectionBadge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
              About Me
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-600" />
          </div>

          {/* Two-column layout: image left, text right */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-10 md:items-start">
            {/* Profile image in card frame */}
            <div className="flex justify-center md:justify-start">
              <div className="overflow-hidden rounded-2xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 shadow-xl shadow-black/10 dark:shadow-black/30">
                <div className="relative h-56 w-40 sm:h-64 sm:w-48 md:h-80 md:w-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={siteConfig.profileImageUrl}
                    alt={`${siteConfig.name}, ${siteConfig.title}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) (fallback as HTMLElement).style.display = "flex";
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-500"
                    style={{ display: "none" }}
                  >
                    <span className="text-6xl font-semibold">
                      {siteConfig.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                {siteConfig.name}
              </h3>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-500">
                TL;DR: {siteConfig.tagline}
              </p>
              {siteConfig.aboutBioParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
