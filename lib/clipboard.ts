import { playTick } from "@/lib/sound";

/** Copies text and plays the confirmation tick. Returns false if the clipboard is unavailable. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    playTick();
    return true;
  } catch {
    return false;
  }
}
