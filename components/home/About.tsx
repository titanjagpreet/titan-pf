import Image from "next/image";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { LocalTime } from "@/components/shared/LocalTime";
import { SECTION_WIDTH } from "@/lib/constants";
import profileImage from "@/public/assets/profile.jpg";

export function About() {
  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <SectionHeading badge="Yours Truly" title="About Me" />

        <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:items-start md:gap-10">
          {/* Profile image in card frame */}
          <div className="flex justify-center md:justify-start">
            <div className="group overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-xl shadow-black/10 transition-transform duration-500 ease-snappy hover:-rotate-1 hover:scale-[1.02] dark:border-zinc-700/50 dark:bg-zinc-800/30 dark:shadow-black/30">
              <div className="relative h-56 w-40 sm:h-64 sm:w-48 md:h-80 md:w-56">
                <Image
                  src={profileImage}
                  alt={`${siteConfig.name}, ${siteConfig.title}`}
                  fill
                  placeholder="blur"
                  sizes="224px"
                  className="object-cover transition-transform duration-700 ease-snappy group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              {siteConfig.name}
            </h3>
            {siteConfig.aboutBioParagraphs.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                {paragraph}
              </p>
            ))}

            <dl className="divide-y divide-dashed divide-zinc-300 border-y border-dashed border-zinc-300 text-sm dark:divide-zinc-700 dark:border-zinc-700">
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">Based in</dt>
                <dd className="text-right text-zinc-800 dark:text-zinc-200">
                  {siteConfig.location} ·{" "}
                  <LocalTime className="font-mono text-xs text-zinc-500 dark:text-zinc-400" />
                </dd>
              </div>
              {siteConfig.aboutFacts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">{fact.label}</dt>
                  <dd className="text-right text-zinc-800 dark:text-zinc-200">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
