import Link from "next/link";
import { SECTION_WIDTH } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:pt-32">
      <div className={SECTION_WIDTH}>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
          That link does not exist or it was moved. Try the home page or projects instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
