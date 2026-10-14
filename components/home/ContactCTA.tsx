import { BookCallButton } from "@/components/shared/BookCallButton";
import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { Reveal } from "@/components/shared/Reveal";
import { SECTION_WIDTH } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <Reveal className="rounded-2xl border border-dashed border-zinc-300 bg-gradient-to-b from-white to-zinc-50 p-6 text-center shadow-xl shadow-black/10 dark:border-zinc-600 dark:from-zinc-900/80 dark:to-zinc-900/50 dark:shadow-black/30 sm:p-10 md:p-14">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:text-base md:text-lg">
            Hey, you scrolled this far, let&apos;s talk.
          </p>

          <div className="mt-6 flex justify-center sm:mt-8">
            <BookCallButton />
          </div>

          <div className="mt-4 flex flex-col items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500">
            <span>or copy my email</span>
            <CopyEmailButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
