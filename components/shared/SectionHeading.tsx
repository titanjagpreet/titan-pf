"use client";

import { motion } from "framer-motion";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { fadeUp, fadeUpBlur, IN_VIEW_ONCE, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge: string;
  title: string;
  /** Optional element aligned to the right on wider screens (e.g. a "View all" link). */
  action?: React.ReactNode;
  className?: string;
}

/** Home section header: badge, title and underline resolve in sequence the first time they scroll into view. */
export function SectionHeading({ badge, title, action, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW_ONCE}
      variants={stagger(0.07)}
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        <motion.div variants={fadeUp}>
          <SectionBadge className="mb-3">{badge}</SectionBadge>
        </motion.div>
        <motion.h2
          variants={fadeUpBlur}
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl"
        >
          {title}
        </motion.h2>
        <motion.div
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            show: { scaleX: 1, opacity: 1, transition: { duration: 0.6 } },
          }}
          className="mt-4 h-px w-16 origin-left bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-600"
        />
      </div>
      {action ? <motion.div variants={fadeUp}>{action}</motion.div> : null}
    </motion.div>
  );
}
