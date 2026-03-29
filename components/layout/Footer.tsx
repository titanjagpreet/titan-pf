"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SECTION_WIDTH } from "@/lib/constants";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border-t border-zinc-200 dark:border-zinc-800 py-6 ${className}`}
    >
      <div
        className={`${SECTION_WIDTH} flex flex-col items-center gap-4 text-center text-sm text-zinc-600 dark:text-zinc-500`}
      >
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-zinc-600 dark:text-zinc-500">{siteConfig.footer}</p>
      </div>
    </motion.footer>
  );
}
