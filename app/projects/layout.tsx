import { getSiteUrl } from "@/lib/site-url";

const base = getSiteUrl().replace(/\/$/, "");

export const metadata = {
  title: "Projects",
  description:
    "Projects by Jagpreet Singh: full stack applications, real-time systems, Web3 integrations, and detailed technical case studies.",
  alternates: { canonical: `${base}/projects` },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
