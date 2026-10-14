"use client";

import { addTransitionType, startTransition, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { PROJECT_OPEN } from "@/lib/project-transition";

/**
 * Click handler for links into a case study. Plain left-clicks navigate inside a transition
 * tagged PROJECT_OPEN; modified clicks (new tab, etc.) fall through to the browser.
 * `beforeNavigate` runs synchronously first (used to name the clicked card's image).
 */
export function useOpenProject(beforeNavigate?: () => void) {
  const router = useRouter();
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    beforeNavigate?.();
    startTransition(() => {
      addTransitionType(PROJECT_OPEN);
      router.push(href);
    });
  };
}
