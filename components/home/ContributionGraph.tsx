"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "framer-motion";
import type { ContributionLevel, GitHubContributionData } from "@/lib/github";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  NONE: "bg-zinc-200 dark:bg-zinc-800",
  FIRST_QUARTILE: "bg-emerald-200 dark:bg-emerald-900",
  SECOND_QUARTILE: "bg-emerald-400 dark:bg-emerald-700",
  THIRD_QUARTILE: "bg-emerald-500 dark:bg-emerald-500",
  FOURTH_QUARTILE: "bg-emerald-600 dark:bg-emerald-400",
};

const LEVELS = Object.keys(LEVEL_CLASS) as ContributionLevel[];

const WEEKDAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const dayFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

interface Cell {
  date: string;
  count: number;
  level: ContributionLevel;
  column: number;
  row: number;
}

/**
 * Places every day explicitly by (week, weekday). GitHub's first and last weeks are partial,
 * so placing cells in document order would shift whole rows.
 */
function layoutGraph(weeks: GitHubContributionData["weeks"]) {
  const cells: Cell[] = [];
  const months: { label: string; column: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    for (const day of week.contributionDays) {
      const date = new Date(`${day.date}T00:00:00Z`);
      cells.push({
        date: day.date,
        count: day.contributionCount,
        level: day.contributionLevel ?? "NONE",
        column: weekIndex,
        row: date.getUTCDay(),
      });
    }
    const first = week.contributionDays[0];
    if (!first) return;
    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month !== lastMonth) {
      months.push({ label: monthFormat.format(new Date(`${first.date}T00:00:00Z`)), column: weekIndex });
      lastMonth = month;
    }
  });

  // Drop a leading label that would collide with the next one (partial first month).
  if (months.length > 1 && months[1].column - months[0].column < 3) months.shift();

  return { cells, months, columns: weeks.length };
}

function describe(cell: { date: string; count: number }) {
  const when = dayFormat.format(new Date(`${cell.date}T00:00:00Z`));
  if (cell.count === 0) return `No contributions · ${when}`;
  return `${cell.count} contribution${cell.count === 1 ? "" : "s"} · ${when}`;
}

export function ContributionGraph({ data }: { data: GitHubContributionData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; text: string; date: string } | null>(null);

  const { cells, months, columns } = useMemo(() => layoutGraph(data.weeks), [data.weeks]);
  const total = data.totalContributions;

  // Entrance: only when the graph starts below the fold. The DOM attribute drives CSS,
  // so nothing re-renders and the graph is fully visible without JS.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.phase = "armed";
    if (totalRef.current) totalRef.current.textContent = "0";

    let stopCount: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.dataset.phase = "shown";
        const controls = animate(0, total, {
          duration: 1.2,
          ease: EASE_OUT,
          onUpdate: (v) => {
            if (totalRef.current) totalRef.current.textContent = Math.round(v).toLocaleString("en-US");
          },
        });
        stopCount = () => controls.stop();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stopCount?.();
    };
  }, [total]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-date]");
    const container = containerRef.current;
    if (!target || !container) {
      if (tip) setTip(null);
      return;
    }
    const date = target.dataset.date!;
    if (tip?.date === date) return;
    const cellRect = target.getBoundingClientRect();
    const boxRect = container.getBoundingClientRect();
    // Keep the ~220px tooltip inside the card near the edges.
    const half = Math.min(110, boxRect.width / 2);
    const x = cellRect.left - boxRect.left + cellRect.width / 2;
    setTip({
      date,
      x: Math.min(Math.max(x, half), boxRect.width - half),
      y: cellRect.top - boxRect.top,
      text: describe({ date, count: Number(target.dataset.count) }),
    });
  };

  return (
    <div ref={containerRef} className="relative mt-6">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Total:{" "}
        <strong ref={totalRef} className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
          {total.toLocaleString("en-US")}
        </strong>{" "}
        contributions
      </p>

      <div className="mt-4 min-w-0 overflow-hidden">
        <div
          role="img"
          aria-label={`GitHub contribution graph: ${total.toLocaleString("en-US")} contributions in the last year`}
          className="grid gap-[2px] sm:gap-[3px]"
          style={{
            gridTemplateColumns: `auto repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: "auto repeat(7, auto)",
          }}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setTip(null)}
        >
          {months.map((m) => (
            <span
              key={`${m.label}-${m.column}`}
              className="whitespace-nowrap pb-1 font-mono text-[9px] leading-none text-zinc-500 sm:text-[10px]"
              style={{ gridColumn: `${m.column + 2} / span 4`, gridRow: 1 }}
            >
              {m.label}
            </span>
          ))}
          {Object.entries(WEEKDAY_LABELS).map(([day, label]) => (
            <span
              key={label}
              className="hidden pr-2 font-mono text-[10px] leading-none text-zinc-500 sm:flex sm:items-center"
              style={{ gridColumn: 1, gridRow: Number(day) + 2 }}
            >
              {label}
            </span>
          ))}
          {cells.map((cell) => (
            <div
              key={cell.date}
              data-date={cell.date}
              data-count={cell.count}
              className={cn(
                "heat-cell aspect-square min-w-0 rounded-[2px] sm:rounded-[3px]",
                LEVEL_CLASS[cell.level],
                tip?.date === cell.date && "ring-1 ring-zinc-900/40 dark:ring-white/50"
              )}
              style={
                {
                  gridColumn: cell.column + 2,
                  gridRow: cell.row + 2,
                  "--d": cell.column + cell.row,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {tip ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+6px)] whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 font-mono text-[11px] text-zinc-100 shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.text}
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-end gap-2 font-mono text-[11px] text-zinc-600 dark:text-zinc-500">
        <span>Less</span>
        <div className="flex gap-0.5">
          {LEVELS.map((level) => (
            <div key={level} className={cn("h-2.5 w-2.5 rounded-[2px]", LEVEL_CLASS[level])} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
