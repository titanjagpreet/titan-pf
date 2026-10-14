import type { Variants } from "framer-motion";

/** UI ease-out (matches --ease-snappy in globals.css). */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Scroll reveals fire once, slightly before the element is fully in view. */
export const IN_VIEW_ONCE = { once: true, margin: "0px 0px -40px 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** For headings: adds a light blur so text resolves into focus. */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

export const stagger = (gap = 0.05, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
