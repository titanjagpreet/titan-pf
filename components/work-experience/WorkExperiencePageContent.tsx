import { experiences } from "@/data/experiences";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SECTION_WIDTH } from "@/lib/constants";

export function WorkExperiencePageContent() {
  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className={SECTION_WIDTH}>
        <PageHeader
          title="Work Experience"
          description="My work experiences across different companies and roles."
        />

        <div className="space-y-4">
          <h2 className="text-base font-medium text-zinc-600 dark:text-zinc-400">
            All Experiences ({experiences.length} experiences)
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
