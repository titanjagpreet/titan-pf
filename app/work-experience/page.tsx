import { WorkExperiencePageContent } from "@/components/work-experience/WorkExperiencePageContent";
import { getSiteUrl } from "@/lib/site-url";

const base = getSiteUrl().replace(/\/$/, "");

export const metadata = {
  title: "Work Experience",
  description:
    "Jagpreet Singh's professional experience as a Full Stack Developer, including roles working with React, Node.js, and backend systems.",
  alternates: { canonical: `${base}/work-experience` },
};

export default function WorkExperiencePage() {
  return <WorkExperiencePageContent />;
}
