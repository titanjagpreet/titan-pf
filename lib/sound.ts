import { useSyncExternalStore } from "react";

/** UI sounds: short, only ever in response to a user action, and mutable from the footer or ⌘K. */

export const SOUNDS = {
  switchOn: "/assets/sounds/switch-on.mp3",
  switchOff: "/assets/sounds/switch-off.mp3",
} as const;

const STORAGE_KEY = "sound";
const listeners = new Set<() => void>();

export function isSoundEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Storage blocked (private mode): the preference just won't persist.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSoundEnabled() {
  return useSyncExternalStore(subscribe, isSoundEnabled, () => true);
}

const audioCache = new Map<string, HTMLAudioElement>();

export function preloadSound(src: string) {
  if (typeof window === "undefined" || audioCache.has(src)) return;
  const audio = new Audio(src);
  audio.preload = "auto";
  audioCache.set(src, audio);
}

export function playSound(src: string, volume = 0.5) {
  if (!isSoundEnabled()) return;
  preloadSound(src);
  const audio = audioCache.get(src);
  if (!audio) return;
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Autoplay restrictions: ignore.
  });
}

let audioContext: AudioContext | null = null;

/** A tiny synthesized "tick" for confirmations like copy-to-clipboard (no asset needed). */
export function playTick() {
  if (!isSoundEnabled()) return;
  try {
    audioContext ??= new AudioContext();
    const t = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1500, t);
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.05);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  } catch {
    // Web Audio unavailable: stay silent.
  }
}
