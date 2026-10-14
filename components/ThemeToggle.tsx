"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { preloadSound, SOUNDS } from "@/lib/sound";
import { switchTheme } from "@/lib/theme-switch";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => {
        // Keyboard activation reports 0,0; reveal from the button's center instead.
        const rect = e.currentTarget.getBoundingClientRect();
        const fromPointer = e.clientX !== 0 || e.clientY !== 0;
        switchTheme(setTheme, {
          x: fromPointer ? e.clientX : rect.left + rect.width / 2,
          y: fromPointer ? e.clientY : rect.top + rect.height / 2,
        });
      }}
      onPointerEnter={() => {
        preloadSound(SOUNDS.switchOn);
        preloadSound(SOUNDS.switchOff);
      }}
      className={cn(
        "relative flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full p-2 sm:min-h-[32px] sm:min-w-[32px] sm:p-1.5",
        "border border-zinc-300 dark:border-white/[0.08]",
        "bg-transparent text-zinc-600 transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-200 active:scale-[0.94] dark:text-zinc-400 dark:hover:bg-white/10",
        className
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {/* Both icons are always rendered; the .dark class (set before paint) decides which shows,
          so the button never pops in after hydration. */}
      <Sun className="absolute h-[18px] w-[18px] rotate-90 scale-0 opacity-0 transition-[transform,opacity] duration-300 ease-snappy dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <Moon className="h-[18px] w-[18px] rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-300 ease-snappy dark:-rotate-90 dark:scale-0 dark:opacity-0" />
    </button>
  );
}
