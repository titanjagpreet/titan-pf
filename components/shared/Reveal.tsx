"use client";

import { motion } from "framer-motion";
import { fadeUp, IN_VIEW_ONCE } from "@/lib/motion";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section";
  children: React.ReactNode;
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ as = "div", children, className, id, ...rest }: RevealProps) {
  const Component = as === "section" ? motion.section : motion.div;
  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW_ONCE}
      variants={fadeUp}
      aria-labelledby={rest["aria-labelledby"]}
    >
      {children}
    </Component>
  );
}
