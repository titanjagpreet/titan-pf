"use client";

import { motion } from "framer-motion";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionBadge({ children, className = "" }: SectionBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`inline-block rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-1 text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-500 ${className}`}
    >
      {children}
    </motion.span>
  );
}
