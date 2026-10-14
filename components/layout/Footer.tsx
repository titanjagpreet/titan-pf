import Link from "next/link";
import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/data/site";
import { SECTION_WIDTH } from "@/lib/constants";
import { LocalTime } from "@/components/shared/LocalTime";
import { BackToTop, SoundToggle } from "@/components/layout/FooterControls";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const socialClass =
  "flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-[color,background-color,transform] duration-200 ease-snappy hover:-translate-y-0.5 hover:bg-zinc-200/60 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-zinc-100";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-zinc-200 py-8 dark:border-zinc-800">
      <div className={`${SECTION_WIDTH} flex flex-col items-center gap-5 text-center text-sm`}>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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

        <div className="flex items-center gap-1">
          <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="GitHub">
            <SiGithub className="h-4 w-4" />
          </a>
          <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="LinkedIn">
            <FaLinkedin className="h-4 w-4" />
          </a>
          <a href={siteConfig.socialLinks.email} className={socialClass} aria-label="Email">
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
          <span className="px-3 font-mono text-[11px] text-zinc-500">
            {siteConfig.location} · <LocalTime />
          </span>
          <SoundToggle />
          <BackToTop />
        </div>

        <p className="text-zinc-600 dark:text-zinc-500">
          {siteConfig.footer} © {year}
        </p>
      </div>
    </footer>
  );
}
