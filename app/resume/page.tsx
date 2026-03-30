import { ResumePageContent } from "@/components/resume/ResumePageContent";
import { getSiteUrl } from "@/lib/site-url";

const base = getSiteUrl().replace(/\/$/, "");

export const metadata = {
  title: "Resume",
  description:
    "Download Jagpreet Singh's resume. Full Stack Developer experienced in React, Node.js, TypeScript, MongoDB, PostgreSQL, and Web3.",
  alternates: { canonical: `${base}/resume` },
};

export default function ResumePage() {
  return <ResumePageContent />;
}
