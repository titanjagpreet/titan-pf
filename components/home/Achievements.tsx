"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SECTION_WIDTH } from "@/lib/constants";

export function Achievements() {
  const achievements = siteConfig.achievements;

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
            <SectionBadge className="mb-3">Achievements</SectionBadge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
              Glimpses of Achievements
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-600" />
          </div>

          {/* Horizontal marquee - right to left */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 sm:gap-6"
              animate={{
                x: [0, -((240 + 16) * achievements.length)], // ~card width + gap, responsive
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...achievements, ...achievements].map((item, i) => (
                <div
                  key={`${item.title}-${i}`}
                  className="group shrink-0 overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 shadow-xl shadow-black/10 dark:shadow-black/20"
                >
                  <div className="relative aspect-[4/3] w-56 overflow-hidden bg-zinc-200 dark:bg-zinc-800 sm:w-64 md:w-72">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <span className="text-sm">Image</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
