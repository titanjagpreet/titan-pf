"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SECTION_WIDTH } from "@/lib/constants";

/** PDF fragment hints for embedded viewers: ask to hide thumbnails/outline on open (Chrome may ignore). */
function pdfIframeSrc(url: string): string {
  const [base, hash = ""] = url.split("#");
  const params = new URLSearchParams(hash.replace(/;/g, "&"));
  params.set("navpanes", "0");
  params.set("pagemode", "UseNone");
  const q = params.toString();
  return q ? `${base}#${q}` : `${base}#navpanes=0&pagemode=UseNone`;
}

export function ResumePageContent() {
  const pdfSrc = siteConfig.resumeUrl;
  const previewSrc = pdfIframeSrc(pdfSrc);

  return (
    <div className="pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="text-center text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
            {siteConfig.name}&apos;s Resume
          </h1>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={pdfSrc}
              download
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Download className="h-4 w-4 shrink-0" />
              Download PDF
            </a>
            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              Open in new tab
            </a>
          </div>

          {/* Browser-style PDF preview (native viewer, like Chrome / Google-style toolbar) */}
          <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 sm:mt-10 sm:rounded-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-200/80 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800/80">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              </span>
              <span className="ml-2 truncate text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                Resume preview
              </span>
            </div>
            <iframe
              title="Resume PDF preview"
              src={previewSrc}
              className="h-[min(86vh,920px)] w-full bg-zinc-50 dark:bg-zinc-950"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
