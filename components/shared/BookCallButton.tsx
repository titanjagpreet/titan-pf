"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
import { Plus, User } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

let calApi: ReturnType<typeof getCalApi> | null = null;

/** Loads the Cal.com embed script once, on demand (when the button nears the viewport, is hovered, or clicked). */
function loadCal() {
  calApi ??= getCalApi().then((cal) => {
    cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    return cal;
  });
  return calApi;
}

export function BookCallButton({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void loadCal();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onPointerEnter={() => void loadCal()}
      onFocus={() => void loadCal()}
      onClick={async () => {
        const cal = await loadCal();
        cal("modal", { calLink: siteConfig.calComBookingPath, config: { layout: "month_view" } });
      }}
      aria-label="Book a Free Call"
      className={cn(
        "group inline-flex max-w-[min(22rem,calc(100vw-3rem))] cursor-pointer overflow-x-hidden overflow-y-visible rounded-lg border border-zinc-400 bg-zinc-900 shadow-sm transition-[max-width,box-shadow,border-color,background-color,transform] duration-500 ease-snappy hover:border-zinc-300 hover:shadow-md active:scale-[0.98] dark:border-zinc-500 dark:bg-zinc-800 dark:hover:border-zinc-400 dark:hover:bg-zinc-700 md:max-w-[min(15rem,calc(100vw-3rem))] md:hover:max-w-[min(22rem,calc(100vw-3rem))] md:focus-visible:max-w-[min(22rem,calc(100vw-3rem))]",
        className
      )}
    >
      <span className="flex items-center px-2 py-1 text-xs font-medium text-white sm:px-2.5 sm:py-1.5 sm:text-sm">
        <Image
          src={siteConfig.profileImageUrl}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 rounded-full object-cover ring-2 ring-white/10"
        />
        {/* Plus + guest: clip X only so circles stay round (overflow-hidden was flattening sides) */}
        <span className="flex min-h-9 min-w-0 shrink-0 items-center gap-2 overflow-x-hidden overflow-y-visible py-0.5 pl-2 transition-[max-width,opacity,padding] duration-500 ease-snappy max-w-[6rem] opacity-100 md:max-w-0 md:pl-0 md:opacity-0 md:group-hover:max-w-[6rem] md:group-hover:pl-2 md:group-hover:opacity-100 md:group-focus-visible:max-w-[6rem] md:group-focus-visible:pl-2 md:group-focus-visible:opacity-100">
          <Plus className="h-3.5 w-3.5 shrink-0 text-zinc-300 sm:h-4 sm:w-4" aria-hidden />
          <span
            className="box-border flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-zinc-700 dark:border-white/10 dark:bg-zinc-600 sm:size-8"
            aria-hidden
          >
            <User className="size-3.5 text-zinc-200 sm:size-4" strokeWidth={2} />
          </span>
        </span>
        <span className="whitespace-nowrap pl-2.5 pr-0.5">Book a Free Call</span>
      </span>
    </button>
  );
}
