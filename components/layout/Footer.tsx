"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SECTION_WIDTH } from "@/lib/constants";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border-t border-zinc-200 dark:border-zinc-800 py-6 ${className}`}
    >
      <div className={`${SECTION_WIDTH} text-center text-sm text-zinc-600 dark:text-zinc-500`}>
        <p>{siteConfig.footer}</p>
      </div>
    </motion.footer>
  );
}
