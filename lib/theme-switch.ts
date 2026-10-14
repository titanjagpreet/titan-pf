import { flushSync } from "react-dom";
import { playSound, SOUNDS } from "@/lib/sound";

/**
 * Toggles light/dark with a circular reveal from `origin` (defaults to the viewport center).
 * Falls back to an instant swap without View Transitions support or with reduced motion.
 */
export function switchTheme(
  setTheme: (theme: string) => void,
  origin?: { x: number; y: number }
) {
  const root = document.documentElement;
  const nextTheme = root.classList.contains("dark") ? "light" : "dark";

  // Light switch metaphor: lights on for light mode, off for dark mode.
  playSound(nextTheme === "light" ? SOUNDS.switchOn : SOUNDS.switchOff);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduceMotion) {
    setTheme(nextTheme);
    return;
  }

  const x = origin?.x ?? innerWidth / 2;
  const y = origin?.y ?? innerHeight / 2;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  root.style.setProperty("--x", `${x}px`);
  root.style.setProperty("--y", `${y}px`);
  root.style.setProperty("--r", `${endRadius}px`);
  root.classList.add("theme-transition");

  const transition = document.startViewTransition(() => {
    flushSync(() => setTheme(nextTheme));
  });
  transition.finished.finally(() => root.classList.remove("theme-transition"));
}
