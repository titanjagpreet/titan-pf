"use client";

import { ArrowUp, Volume2, VolumeX } from "lucide-react";
import { setSoundEnabled, useSoundEnabled } from "@/lib/sound";

const buttonClass =
  "inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 font-mono text-[11px] text-zinc-500 transition-[color,background-color,transform] duration-150 ease-snappy hover:bg-zinc-200/60 hover:text-zinc-900 active:scale-[0.96] dark:hover:bg-white/10 dark:hover:text-zinc-100";

export function SoundToggle() {
  const enabled = useSoundEnabled();
  return (
    <button
      type="button"
      onClick={() => setSoundEnabled(!enabled)}
      className={buttonClass}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute interface sounds" : "Unmute interface sounds"}
    >
      {enabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      {enabled ? "Sound on" : "Sound off"}
    </button>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className={`group ${buttonClass}`}
    >
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 ease-snappy group-hover:-translate-y-0.5" />
      Back to top
    </button>
  );
}
