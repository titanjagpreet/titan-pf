"use client";

import { MotionConfig } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/** Honors prefers-reduced-motion (keeps fades, drops movement) and sets the default easing. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: EASE_OUT }}>
      {children}
    </MotionConfig>
  );
}
