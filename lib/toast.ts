/** Minimal global toast: dispatch from anywhere, rendered by <Toaster /> in the root layout. */
export const TOAST_EVENT = "site:toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}
