import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/mdx";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/projects",
    "/blogs",
    "/contact",
    "/resume",
    "/work-experience",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path, i) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: i === 0 ? "weekly" : "weekly",
    priority: i === 0 ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogs().map((blog) => ({
    url: `${base}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
