import { useSyncExternalStore } from "react";

export const OPEN_PALETTE_EVENT = "site:open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

const noopSubscribe = () => () => {};
const isApple = () => /mac|iphone|ipad|ipod/i.test(navigator.userAgent);

/** "⌘K" on Apple devices, "Ctrl K" elsewhere ("⌘K" during SSR). */
export function useShortcutLabel() {
  return useSyncExternalStore(
    noopSubscribe,
    () => (isApple() ? "⌘K" : "Ctrl K"),
    () => "⌘K"
  );
}
