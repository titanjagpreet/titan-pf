"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Scope heading scan to this element so footer / related sections are ignored */
const DEFAULT_CONTENT_ROOT = "#post-content";

export function TableOfContents({
  contentRootSelector = DEFAULT_CONTENT_ROOT,
}: {
  contentRootSelector?: string;
}) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector(contentRootSelector);
    if (!root) {
      setHeadings([]);
      return;
    }

    const elements = Array.from(root.querySelectorAll("h2, h3"))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.substring(1)),
      }));

    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [contentRootSelector]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 sm:text-sm">
        On this page
      </h3>
      <ul className="columns-1 gap-x-10 gap-y-2 text-sm sm:columns-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className="break-inside-avoid py-0.5"
            style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block rounded-md py-0.5 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 dark:hover:text-white dark:focus-visible:ring-zinc-500",
                activeId === heading.id
                  ? "font-semibold text-zinc-950 dark:text-white"
                  : "text-zinc-700 dark:text-zinc-400"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
