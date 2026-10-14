"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/data/site";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

/** Copies the email address with a small "Copied" tooltip. Falls back to mailto if the clipboard is blocked. */
export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const onClick = async () => {
    const ok = await copyText(siteConfig.email);
    if (!ok) {
      window.location.href = siteConfig.socialLinks.email;
      return;
    }
    setCopied(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3 font-mono text-xs text-zinc-600 transition-[color,background-color,transform] duration-150 ease-snappy hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.97] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 sm:text-sm",
        className
      )}
      aria-label={copied ? "Email copied" : `Copy email address ${siteConfig.email}`}
    >
      <span className="relative h-4 w-4">
        <AnimatePresence initial={false} mode="popLayout">
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              <Check className="h-4 w-4 text-accent" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              <Copy className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {siteConfig.email}
      <AnimatePresence>
        {copied ? (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
          >
            Copied!
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
}
