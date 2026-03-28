"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-0 right-0 z-50 px-4 sm:left-1/2 sm:right-auto sm:w-auto sm:max-w-2xl sm:-translate-x-1/2 sm:px-4"
      >
        {/* Mobile: split layout — hamburger left, Contact + theme right */}
        <div className="flex items-center justify-between sm:hidden">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-zinc-300 bg-white/80 text-zinc-600 backdrop-blur-xl transition-colors hover:bg-zinc-100 dark:border-white/[0.08] dark:bg-[rgba(30,30,30,0.6)] dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="flex min-h-[40px] items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop: centered pill navbar */}
        <div
          className={cn(
            "hidden sm:flex sm:items-center sm:justify-center sm:gap-6 sm:rounded-full sm:px-5 sm:py-1.5",
            "border border-zinc-300 dark:border-white/[0.08]",
            "bg-white/80 dark:bg-[rgba(30,30,30,0.6)] backdrop-blur-xl",
            "shadow-lg shadow-black/10 dark:shadow-black/20"
          )}
        >
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel — opens from left */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 top-[4.5rem] z-40 flex w-[calc(100%-2rem)] max-w-xs flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] items-center gap-2 rounded-xl bg-zinc-900 px-4 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
