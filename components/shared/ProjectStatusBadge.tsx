/** Status pill for project cards (home + /projects) */
export function ProjectStatusBadge({ status }: { status: string }) {
  return (
    <div className="inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 sm:text-xs">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <span className="truncate">{status}</span>
    </div>
  );
}
