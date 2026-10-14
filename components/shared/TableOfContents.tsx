"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  /** 2 for top-level sections, 3 for subsections. */
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  /** "card": inline block above content. "rail": compact sticky list beside content (xl screens). */
  variant?: "card" | "rail";
  title?: string;
  className?: string;
}

/** Scrollspy table of contents. Headings come from the server, so nothing shifts after hydration. */
export function TableOfContents({ items, variant = "card", title = "On this page", className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    // Fires whenever a heading crosses the line 20% from the top (in either direction);
    // the active item is the last heading above that line, or the first one near the top.
    const observer = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.2;
        let current = items[0]?.id ?? "";
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top - line <= 0) current = item.id;
        }
        setActiveId(current);
      },
      { rootMargin: "0px 0px -80% 0px" }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  if (variant === "rail") {
    return (
      <nav aria-label={title} className={cn("text-sm", className)}>
        <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">{title}</p>
        <ul className="space-y-0.5 border-l border-zinc-200 dark:border-zinc-800">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => onClick(e, item.id)}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "-ml-px block border-l py-1 pr-2 leading-snug transition-colors duration-200",
                    item.level > 2 ? "pl-6 text-[13px]" : "pl-4",
                    active
                      ? "border-zinc-900 font-medium text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                      : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
                  )}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={title} className={cn("space-y-3 sm:space-y-4", className)}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-900 dark:text-zinc-50">
        {title}
      </p>
      <ul className="columns-1 gap-x-10 text-sm sm:columns-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="break-inside-avoid py-0.5"
            style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => onClick(e, item.id)}
              className={cn(
                "block rounded-md py-0.5 transition-colors hover:text-zinc-950 dark:hover:text-white",
                activeId === item.id
                  ? "font-semibold text-zinc-950 dark:text-white"
                  : "text-zinc-700 dark:text-zinc-400"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
