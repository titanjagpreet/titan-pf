import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-zinc-300 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-500",
        className
      )}
    >
      {children}
    </span>
  );
}
