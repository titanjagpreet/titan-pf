"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup, useMotionValueEvent, useScroll } from "framer-motion";
import { Mail, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { openCommandPalette, useShortcutLabel } from "@/lib/command-palette";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/resume", label: "Resume" },
];

/** Active for the page itself and anything nested under it (e.g. /projects/walletx). */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const shortcut = useShortcutLabel();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const pill = hovered ?? navLinks.find((l) => isActive(pathname, l.href))?.href ?? null;

  return (
    <>
      <header className="enter fixed top-4 left-0 right-0 z-50 px-4 sm:left-1/2 sm:right-auto sm:w-auto sm:max-w-2xl sm:-translate-x-1/2 sm:px-4">
        {/* Mobile: split layout — hamburger left, Contact + theme right */}
        <div className="flex items-center justify-between sm:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-zinc-300 bg-white/80 text-zinc-600 backdrop-blur-xl transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-100 active:scale-[0.94] dark:border-white/[0.08] dark:bg-[rgba(30,30,30,0.6)] dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="flex min-h-[40px] items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-50 active:scale-[0.97] dark:border-zinc-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <ThemeToggle className="bg-white/80 backdrop-blur-xl dark:bg-[rgba(30,30,30,0.6)]" />
          </div>
        </div>

        {/* Desktop: centered pill navbar; gets denser once the page scrolls */}
        <div
          className={cn(
            "hidden sm:flex sm:items-center sm:justify-center sm:gap-3 sm:rounded-full sm:py-1.5 sm:pl-2 sm:pr-1.5",
            "border border-zinc-300 dark:border-white/[0.08] backdrop-blur-xl",
            "transition-[background-color,box-shadow] duration-300 ease-snappy",
            scrolled
              ? "bg-white/90 shadow-xl shadow-black/10 dark:bg-[rgba(24,24,24,0.82)] dark:shadow-black/40"
              : "bg-white/70 shadow-lg shadow-black/5 dark:bg-[rgba(30,30,30,0.55)] dark:shadow-black/20"
          )}
        >
          <LayoutGroup id="desktop-nav">
            <nav className="flex items-center" onMouseLeave={() => setHovered(null)}>
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                      active
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                    )}
                  >
                    {pill === link.href && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          active
                            ? "bg-zinc-900/[0.07] dark:bg-white/[0.1]"
                            : "bg-zinc-900/[0.04] dark:bg-white/[0.06]"
                        )}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex h-8 items-center gap-1 rounded-full border border-zinc-300 px-2.5 font-mono text-[11px] text-zinc-500 transition-[color,background-color,transform] duration-150 ease-snappy hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.96] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
              aria-label="Open command menu"
              title="Command menu"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="font-mono">{shortcut}</kbd>
            </button>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 py-1.5 text-sm font-medium text-white transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-800 active:scale-[0.97] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

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

      {/* Mobile menu panel — opens from the hamburger */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            style={{ transformOrigin: "top left" }}
            className="fixed left-4 top-[4.5rem] z-40 flex w-[calc(100%-2rem)] max-w-xs flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i + 0.04, duration: 0.25 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium transition-colors",
                    isActive(pathname, link.href)
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openCommandPalette();
              }}
              className="flex min-h-[48px] items-center gap-2 rounded-xl px-4 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
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
