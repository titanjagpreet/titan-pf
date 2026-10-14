"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/data/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: siteConfig.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getTime = () => formatter.format(new Date());

/** Live clock in the site owner's time zone. Renders a placeholder on the server (pages are static). */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, () => null);
  return (
    <span className={className}>
      <time className="tabular-nums">
        {time ?? "--:--"}
      </time>{" "}
      {siteConfig.timeZoneLabel}
    </span>
  );
}
