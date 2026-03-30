import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} - ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.siteDescription,
  keywords: [
    "Jagpreet Singh",
    "Jagpreet Singh developer",
    "Full Stack Developer",
    "React developer",
    "Node.js developer",
    "TypeScript developer",
    "MongoDB",
    "PostgreSQL",
    "Web3 developer",
    "backend developer",
    "software engineer",
    "jpsingh.dev",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.siteDescription,
    images: [
      {
        url: "/assets/og-banner.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.siteDescription,
    creator: "@titan47",
    images: ["/assets/og-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8E9" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <a
            href="#main-content"
            className="absolute left-[-9999px] top-4 z-[100] rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white outline-none ring-2 ring-zinc-400 transition-none focus:left-4 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
