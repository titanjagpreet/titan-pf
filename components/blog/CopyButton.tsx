"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

/**
 * Copies the code of the surrounding `[data-code-block]`. Reading the rendered text (instead of
 * receiving it as a prop) works with highlighted output, whose children are spans, not strings.
 */
export function CopyButton({ className }: { className?: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const copy = async () => {
    const code = ref.current?.closest("[data-code-block]")?.querySelector("pre");
    // Highlighted blank lines render as a single space; strip trailing whitespace per line.
    const text = code?.textContent?.replace(/[ \t]+$/gm, "").replace(/\n$/, "") ?? "";
    if (!text || !(await copyText(text))) return;
    setIsCopied(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      className={cn(
        "z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition-[color,background-color,transform] duration-150 ease-snappy hover:bg-zinc-200/50 hover:text-zinc-900 active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-accent dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-100",
        className
      )}
      aria-label={isCopied ? "Copied" : "Copy code"}
    >
      <span className="relative h-4 w-4">
        <Copy
          className={cn(
            "absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-200 ease-snappy",
            isCopied ? "scale-50 opacity-0" : "scale-100 opacity-100"
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 h-4 w-4 text-accent transition-[opacity,transform] duration-200 ease-snappy",
            isCopied ? "scale-100 opacity-100" : "scale-50 opacity-0"
          )}
        />
      </span>
    </button>
  );
}
