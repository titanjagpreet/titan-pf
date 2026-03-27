"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className={cn(
        "z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-(--blog-code-border) bg-(--blog-surface) text-zinc-700 shadow-sm transition-all hover:bg-white hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-(--blog-code-bg) dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-(--blog-code-bg)",
        className
      )}
      aria-label="Copy to clipboard"
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
