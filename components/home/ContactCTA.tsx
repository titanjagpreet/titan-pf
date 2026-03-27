"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, User } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SECTION_WIDTH } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-600 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900/80 dark:to-zinc-900/50 p-6 text-center shadow-xl shadow-black/10 dark:shadow-black/30 sm:p-10 md:p-14"
        >
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:text-base md:text-lg">
            Hey, you scrolled this far, let&apos;s talk.
          </p>

          <div className="mt-6 flex justify-center sm:mt-8">
            <Link
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Free Call"
              className="group inline-flex rounded-lg border border-zinc-400 bg-zinc-900 shadow-sm transition-[max-width,box-shadow,border-color] duration-500 ease-out hover:border-zinc-300 hover:shadow-md active:scale-[0.98] dark:border-zinc-500 dark:bg-zinc-800 dark:hover:border-zinc-400 dark:hover:bg-zinc-700 max-w-[min(22rem,calc(100vw-3rem))] md:max-w-[min(15rem,calc(100vw-3rem))] md:hover:max-w-[min(22rem,calc(100vw-3rem))] overflow-x-hidden overflow-y-visible"
            >
              <span className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-white sm:gap-2.5 sm:px-2.5 sm:py-1.5 sm:text-sm">
                <Image
                  src={siteConfig.profileImageUrl}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-full object-cover ring-2 ring-white/10"
                />
                {/* Plus + guest: clip X only so circles stay round (overflow-hidden was flattening sides) */}
                <span className="flex min-h-9 min-w-0 shrink-0 items-center gap-2 overflow-x-hidden overflow-y-visible py-0.5 transition-[max-width,opacity] duration-500 ease-out max-w-[6rem] opacity-100 md:max-w-0 md:opacity-0 md:group-hover:max-w-[6rem] md:group-hover:opacity-100">
                  <Plus className="h-3.5 w-3.5 shrink-0 text-zinc-300 sm:h-4 sm:w-4" aria-hidden />
                  <span
                    className="box-border flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-zinc-700 dark:border-white/10 dark:bg-zinc-600 sm:size-8"
                    aria-hidden
                  >
                    <User className="size-3.5 text-zinc-200 sm:size-4" strokeWidth={2} />
                  </span>
                </span>
                <span className="whitespace-nowrap pr-0.5">Book a Free Call</span>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
