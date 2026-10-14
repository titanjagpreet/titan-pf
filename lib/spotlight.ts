import type { PointerEvent } from "react";

/** Pointer handler for `.spotlight` cards: writes the cursor position to CSS vars (no re-render). */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}
