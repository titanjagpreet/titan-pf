"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { TOAST_EVENT } from "@/lib/toast";

export function Toaster() {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  useEffect(() => {
    let timeout: number | undefined;
    const onToast = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      setToast({ id: Date.now(), message });
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setToast(null), 2200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"
    >
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-4 py-2 text-sm font-medium text-zinc-900 shadow-lg shadow-black/10 backdrop-blur dark:border-white/10 dark:bg-zinc-900/95 dark:text-zinc-100"
          >
            <Check className="h-4 w-4 text-accent" />
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
