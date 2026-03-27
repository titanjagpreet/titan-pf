"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/data/experiences";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/50 p-4 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-6"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
            {experience.company}
          </h3>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {experience.role}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">
            {experience.period}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-500">
            {experience.location}
          </p>
        </div>
        <ul className="space-y-2">
          {experience.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <span className="text-zinc-600 dark:text-zinc-500">•</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
