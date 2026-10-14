import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const root = process.cwd();
const blogsDirectory = path.join(root, "content", "blogs");

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string;
  readingTime: string;
  slug: string;
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getBlogBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(blogsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const readTime = readingTime(content).text;

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    coverImage: data.coverImage,
    readingTime: readTime,
    slug: realSlug,
    content,
  };
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .sort((blog1, blog2) => (blog1.date > blog2.date ? -1 : 1));
  return blogs;
}

export function getRelatedBlogs(currentSlug: string, tags: string[]): BlogPost[] {
  const allBlogs = getAllBlogs();
  
  return allBlogs
    .filter((blog) => blog.slug !== currentSlug)
    .filter((blog) => blog.tags.some((tag) => tags.includes(tag)))
    .slice(0, 3);
}

export interface BlogHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * h2/h3 headings for the table of contents, with the same ids rehype-slug generates
 * (github-slugger over the heading's plain text). Fenced code blocks are skipped.
 */
export function getBlogHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_~]/g, "")
      .trim();
    headings.push({ id: slugger.slug(text), text, level: match[1].length });
  }

  return headings;
}
