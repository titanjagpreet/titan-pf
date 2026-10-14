"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeNode {
  id: string;
  name: string;
  depth: number;
  parent?: string;
  /** Uses state or event handlers, so it has to run on the client. */
  interactive?: boolean;
  /** Illustrative JS cost if this component ships to the browser. */
  weight: number;
}

const TREE: TreeNode[] = [
  { id: "page", name: "Page", depth: 0, weight: 4 },
  { id: "header", name: "Header", depth: 1, parent: "page", weight: 3 },
  { id: "search", name: "SearchBox", depth: 2, parent: "header", interactive: true, weight: 6 },
  { id: "list", name: "ProductList", depth: 1, parent: "page", weight: 14 },
  { id: "card", name: "ProductCard", depth: 2, parent: "list", weight: 5 },
  { id: "like", name: "LikeButton", depth: 3, parent: "card", interactive: true, weight: 2 },
  { id: "footer", name: "Footer", depth: 1, parent: "page", weight: 2 },
];

const byId = Object.fromEntries(TREE.map((n) => [n.id, n]));
const MAX = TREE.reduce((sum, n) => sum + n.weight, 0);

/** A component is client if it, or any component that imports it, is marked "use client". */
function clientSource(id: string, marked: Set<string>): string | null {
  let node: TreeNode | undefined = byId[id];
  while (node) {
    if (marked.has(node.id)) return node.id;
    node = node.parent ? byId[node.parent] : undefined;
  }
  return null;
}

/** Interactive demo for the RSC post: toggle "use client" and watch what ships to the browser. */
export function ServerClientTree() {
  const [marked, setMarked] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const shipped = TREE.filter((n) => clientSource(n.id, marked)).reduce((sum, n) => sum + n.weight, 0);
  const broken = TREE.filter((n) => n.interactive && !clientSource(n.id, marked));
  const ideal = broken.length === 0 && shipped === TREE.filter((n) => n.interactive).reduce((s, n) => s + n.weight, 0);

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-(--blog-surface-border) bg-(--blog-surface)">
      <div className="flex items-center justify-between gap-3 border-b border-(--blog-surface-border) px-4 py-2.5">
        <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
          Try it: click a component to add <span className="text-zinc-800 dark:text-zinc-200">&apos;use client&apos;</span>
        </figcaption>
        <button
          type="button"
          onClick={() => setMarked(new Set())}
          disabled={marked.size === 0}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-40 dark:hover:text-zinc-100"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <ul className="space-y-1 p-3 font-mono text-[13px]">
        {TREE.map((node) => {
          const source = clientSource(node.id, marked);
          const isMarked = marked.has(node.id);
          const inherited = !!source && !isMarked;
          const needsClient = node.interactive && !source;
          return (
            <li key={node.id} style={{ paddingLeft: `${node.depth * 1.25}rem` }}>
              <button
                type="button"
                onClick={() => toggle(node.id)}
                aria-pressed={isMarked}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition-[background-color,border-color,transform] duration-150 ease-snappy active:scale-[0.99]",
                  source
                    ? "border-amber-400/50 bg-amber-100/60 dark:border-amber-400/30 dark:bg-amber-400/10"
                    : "border-zinc-300/60 bg-white/60 hover:border-zinc-400 dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-white/20"
                )}
              >
                <span className="text-zinc-900 dark:text-zinc-100">{`<${node.name} />`}</span>
                {isMarked ? (
                  <span className="rounded bg-amber-500/90 px-1.5 py-0.5 text-[10px] text-white dark:bg-amber-400 dark:text-zinc-900">
                    &apos;use client&apos;
                  </span>
                ) : null}
                {needsClient ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400">
                    <TriangleAlert className="h-3 w-3" /> uses state
                  </span>
                ) : null}
                <span
                  className={cn(
                    "ml-auto text-[11px]",
                    source ? "text-amber-700 dark:text-amber-300" : "text-zinc-500"
                  )}
                >
                  {source ? (inherited ? `client (via ${byId[source].name})` : "client") : "server"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-(--blog-surface-border) px-4 py-3">
        <div className="flex items-baseline justify-between font-mono text-[11px] text-zinc-500">
          <span>JavaScript sent to the browser</span>
          <span className="tabular-nums text-zinc-800 dark:text-zinc-200">
            {shipped} / {MAX} units <span className="text-zinc-500">(illustrative)</span>
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <motion.div
            className="h-full origin-left rounded-full bg-amber-500 dark:bg-amber-400"
            initial={false}
            animate={{ scaleX: shipped / MAX }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          {broken.length > 0
            ? broken.length === 1
              ? `${broken[0].name} needs state, so it has to be a Client Component.`
              : `${broken.map((n) => n.name).join(" and ")} need state, so they have to be Client Components.`
            : ideal
              ? "That's the sweet spot: only the interactive leaves ship JavaScript, and the data-heavy parts stay on the server."
              : "Everything works, but some components ship JavaScript they don't need. Try moving 'use client' further down the tree."}
        </p>
      </div>
    </figure>
  );
}
