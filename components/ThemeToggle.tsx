"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { flushSync } from "react-dom";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Preload the sound
    audioRef.current = new Audio("/assets/sounds/switch-on.mp3");
    audioRef.current.volume = 0.5; // Soft volume
  }, []);

  if (!mounted) return null;

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore auto-play restrictions if user hasn't interacted with document yet
      });
    }
  };

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound();
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    // Fallback for browsers that don't support View Transitions API
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Get click coordinates for the circle animation
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    // Pass coordinates to CSS
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
    document.documentElement.style.setProperty("--r", `${endRadius}px`);

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-full p-2 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center sm:min-h-0 sm:min-w-0 sm:p-1.5",
        "border border-zinc-300 dark:border-white/[0.08]",
        "bg-transparent hover:bg-zinc-200 dark:hover:bg-white/10",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-600 dark:text-zinc-500" />
      )}
    </button>
  );
}
