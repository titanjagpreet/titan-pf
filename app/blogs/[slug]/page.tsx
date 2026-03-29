import { getBlogBySlug, getBlogSlugs, getRelatedBlogs } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/MDXContent";
import { ScrollProgress } from "@/components/blog/ScrollProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BlogCard } from "@/components/blog/BlogCard";
import { SECTION_WIDTH } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const blog = getBlogBySlug(resolvedParams.slug);
    const ogImages =
      blog.coverImage && blog.coverImage.trim() !== ""
        ? [{ url: blog.coverImage }]
        : undefined;

    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        type: "article",
        publishedTime: blog.date,
        authors: ["Jagpreet Singh"],
        ...(ogImages && { images: ogImages }),
      },
      twitter: {
        card: ogImages ? "summary_large_image" : "summary",
        title: blog.title,
        description: blog.description,
        ...(ogImages && { images: ogImages.map((i) => i.url) }),
      },
    };
  } catch (e) {
    return {
      title: "Blog Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  let blog;
  try {
    blog = getBlogBySlug(resolvedParams.slug);
  } catch (e) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.slug, blog.tags);
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <ScrollProgress />
      <div className="pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16">
        <div className={SECTION_WIDTH}>
          <Link
            href="/blogs"
            className="mb-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-500 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Back to blogs
          </Link>

          <div className="mb-6 sm:mb-8">
            <div className="mb-4 flex flex-wrap gap-2 sm:mb-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-zinc-300/40 bg-(--blog-surface) px-2 py-1 text-xs font-medium text-zinc-800 dark:border-white/10 dark:text-zinc-200 sm:px-2.5 sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:mb-6 sm:text-2xl md:text-3xl">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <time dateTime={blog.date}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>{blog.readingTime}</span>
              </div>
            </div>
          </div>

          <div className="blog-post-cover relative mb-8 w-full overflow-hidden rounded-2xl border border-zinc-300/50 shadow-sm dark:border-white/10 sm:mb-10 md:mb-12">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
            />
          </div>

          {/* Article first in DOM so TOC can resolve #post-content; grid rows show TOC above */}
          <div className="grid grid-cols-1 gap-8 sm:gap-10">
            <article
              id="post-content"
              className="blog-post-article prose prose-zinc col-start-1 row-start-2 w-full max-w-none px-1 dark:prose-invert sm:px-2 prose-headings:scroll-mt-28 prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-p:max-w-none prose-li:max-w-none prose-img:rounded-xl prose-pre:max-w-full prose-pre:overflow-x-hidden prose-pre:whitespace-pre-wrap prose-pre:bg-transparent prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none"
            >
              <MDXContent source={blog.content} />
            </article>
            <div className="blog-toc-card col-start-1 row-start-1 rounded-2xl p-4 shadow-sm ring-1 ring-zinc-200/60 dark:ring-white/5 sm:p-5">
              <TableOfContents contentRootSelector="#post-content" />
            </div>
          </div>

          {relatedBlogs.length > 0 && (
            <div className="mt-16 border-t border-zinc-200 pt-10 dark:border-zinc-800 sm:mt-20 sm:pt-12">
              <h2 className="mb-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:mb-8 sm:text-2xl md:text-3xl">
                Related Posts
              </h2>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog.slug} blog={relatedBlog} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
