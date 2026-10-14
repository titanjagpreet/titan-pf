"use client";

import { trackSpotlight } from "@/lib/spotlight";
import { cn } from "@/lib/utils";

/** Wraps server-rendered content in a `.spotlight` surface that follows the cursor. */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("spotlight", className)} onPointerMove={trackSpotlight}>
      {children}
    </div>
  );
}
