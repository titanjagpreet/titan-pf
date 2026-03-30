import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const base = getSiteUrl().replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Jagpreet Singh for freelance work, collaboration, or hiring. Send a message or book a call.",
  alternates: { canonical: `${base}/contact` },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
