"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Copy,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Moon,
  NotebookPen,
  PenLine,
  Search,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/data/site";
import { OPEN_PALETTE_EVENT } from "@/lib/command-palette";
import { copyText } from "@/lib/clipboard";
import { setSoundEnabled, useSoundEnabled } from "@/lib/sound";
import { switchTheme } from "@/lib/theme-switch";
import { toast } from "@/lib/toast";

interface PaletteEntry {
  title: string;
  href: string;
  hint?: string;
}

interface CommandPaletteProps {
  projects: PaletteEntry[];
  posts: PaletteEntry[];
}

const itemClass =
  "group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 outline-none data-[selected=true]:bg-zinc-900/[0.06] data-[selected=true]:text-zinc-900 dark:text-zinc-300 dark:data-[selected=true]:bg-white/[0.08] dark:data-[selected=true]:text-white";

const iconClass = "h-4 w-4 shrink-0 text-zinc-400 group-data-[selected=true]:text-zinc-700 dark:text-zinc-500 dark:group-data-[selected=true]:text-zinc-200";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-zinc-500";

/** ⌘K / Ctrl+K menu: jump to any page, project or post, and run quick actions. */
export function CommandPalette({ projects, posts }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const soundOn = useSoundEnabled();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  /** Close first, then act, so focus returns to the page before navigation or a toast. */
  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const go = (href: string) => run(() => router.push(href));
  const external = (href: string) => run(() => window.open(href, "_blank", "noopener,noreferrer"));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      loop
      overlayClassName="cmdk-overlay fixed inset-0 z-[80] bg-black/25 backdrop-blur-[2px]"
      contentClassName="cmdk-content fixed left-1/2 top-[12vh] z-[81] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 shadow-2xl shadow-black/20 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95 dark:shadow-black/50"
    >
      <div className="flex items-center gap-3 border-b border-zinc-200 px-4 dark:border-white/10">
        <Search className="h-4 w-4 shrink-0 text-zinc-400" />
        <Command.Input
          placeholder="Search pages, projects, posts…"
          className="h-12 w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus-visible:outline-none dark:text-zinc-100"
        />
        <kbd className="hidden shrink-0 rounded border border-zinc-200 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-white/10 sm:inline">
          esc
        </kbd>
      </div>

      <Command.List className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-zinc-500">No results.</Command.Empty>

        <Command.Group heading="Pages" className={groupClass}>
          <Command.Item value="Home" onSelect={() => go("/")} className={itemClass}>
            <Home className={iconClass} /> Home
          </Command.Item>
          <Command.Item value="Projects" onSelect={() => go("/projects")} className={itemClass}>
            <FolderGit2 className={iconClass} /> Projects
          </Command.Item>
          <Command.Item value="Blogs" keywords={["writing", "posts"]} onSelect={() => go("/blogs")} className={itemClass}>
            <NotebookPen className={iconClass} /> Blogs
          </Command.Item>
          <Command.Item value="Resume" keywords={["cv"]} onSelect={() => go("/resume")} className={itemClass}>
            <FileText className={iconClass} /> Resume
          </Command.Item>
          <Command.Item value="Contact" keywords={["email", "message", "call"]} onSelect={() => go("/contact")} className={itemClass}>
            <Mail className={iconClass} /> Contact
          </Command.Item>
        </Command.Group>

        {projects.length > 0 && (
          <Command.Group heading="Projects" className={groupClass}>
            {projects.map((p) => (
              <Command.Item
                key={p.href}
                value={`project ${p.title}`}
                keywords={p.hint ? [p.hint] : undefined}
                onSelect={() => go(p.href)}
                className={itemClass}
              >
                <FolderGit2 className={iconClass} />
                <span className="truncate">{p.title}</span>
                {p.hint ? (
                  <span className="ml-auto shrink-0 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">{p.hint}</span>
                ) : null}
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {posts.length > 0 && (
          <Command.Group heading="Writing" className={groupClass}>
            {posts.map((p) => (
              <Command.Item key={p.href} value={`post ${p.title}`} onSelect={() => go(p.href)} className={itemClass}>
                <PenLine className={iconClass} />
                <span className="truncate">{p.title}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Actions" className={groupClass}>
          <Command.Item
            value="Copy email address"
            onSelect={() =>
              run(async () => {
                if (await copyText(siteConfig.email)) toast("Email copied to clipboard");
              })
            }
            className={itemClass}
          >
            <Copy className={iconClass} /> Copy email address
          </Command.Item>
          <Command.Item
            value="Toggle theme"
            keywords={["dark", "light", "mode"]}
            onSelect={() => run(() => switchTheme(setTheme))}
            className={itemClass}
          >
            <Moon className={iconClass} /> Toggle theme
          </Command.Item>
          <Command.Item
            value={soundOn ? "Mute sounds" : "Unmute sounds"}
            keywords={["sound", "audio"]}
            onSelect={() =>
              run(() => {
                setSoundEnabled(!soundOn);
                toast(soundOn ? "Sounds muted" : "Sounds on");
              })
            }
            className={itemClass}
          >
            {soundOn ? <VolumeX className={iconClass} /> : <Volume2 className={iconClass} />}
            {soundOn ? "Mute sounds" : "Unmute sounds"}
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Elsewhere" className={groupClass}>
          <Command.Item value="GitHub" onSelect={() => external(siteConfig.socialLinks.github)} className={itemClass}>
            <SiGithub className={iconClass} /> GitHub
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-zinc-400" />
          </Command.Item>
          <Command.Item value="LinkedIn" onSelect={() => external(siteConfig.socialLinks.linkedin)} className={itemClass}>
            <FaLinkedin className={iconClass} /> LinkedIn
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-zinc-400" />
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="flex items-center gap-4 border-t border-zinc-200 px-4 py-2 font-mono text-[10px] text-zinc-500 dark:border-white/10">
        <span>
          <kbd>↑</kbd> <kbd>↓</kbd> navigate
        </span>
        <span>
          <kbd>↵</kbd> open
        </span>
        <span className="ml-auto">
          <kbd>esc</kbd> close
        </span>
      </div>
    </Command.Dialog>
  );
}
