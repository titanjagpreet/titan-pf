"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { SECTION_WIDTH } from "@/lib/constants";

export function WorkExperiencePageContent() {
  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
            Work Experience
          </h1>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            My work experiences across different companies and roles.
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base font-medium text-zinc-600 dark:text-zinc-400"
          >
            All Experiences ({experiences.length} experiences)
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
