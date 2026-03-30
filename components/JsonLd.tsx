import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

export function JsonLd() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.alias,
    url: siteUrl,
    image: `${siteUrl}${siteConfig.profileImageUrl}`,
    jobTitle: siteConfig.title,
    description: siteConfig.siteDescription,
    email: siteConfig.email,
    sameAs: [
      siteConfig.socialLinks.github,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.twitter,
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "WebSockets",
      "Web3",
      "Express.js",
      "Tailwind CSS",
      "Prisma",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} - ${siteConfig.title}`,
    url: siteUrl,
    description: siteConfig.siteDescription,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl,
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.alias,
      url: siteUrl,
      image: `${siteUrl}${siteConfig.profileImageUrl}`,
      jobTitle: siteConfig.title,
      description: siteConfig.siteDescription,
      sameAs: [
        siteConfig.socialLinks.github,
        siteConfig.socialLinks.linkedin,
        siteConfig.socialLinks.twitter,
      ],
    },
    dateCreated: "2026-03-17",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  image,
}: ArticleJsonLdProps) {
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl,
    },
    ...(image && {
      image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
