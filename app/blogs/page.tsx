import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SECTION_WIDTH } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";
import { Metadata } from "next";

const base = getSiteUrl().replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing by Jagpreet Singh on React, Next.js, backend architecture, and lessons from building real-world applications.",
  alternates: { canonical: `${base}/blogs` },
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className={SECTION_WIDTH}>
        <PageHeader
          badge="Writing"
          title="Blogs"
          description={
            <>
              Thoughts, tutorials, and notes on web development and tech.
              {blogs.length > 0 && (
                <span className="mt-2 block font-mono text-xs text-zinc-500 dark:text-zinc-500">
                  {blogs.length} {blogs.length === 1 ? "post" : "posts"} published
                </span>
              )}
            </>
          }
        />

        {blogs.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {blogs.map((blog, i) => (
              <div key={blog.slug} className="enter" style={{ "--i": 3 + i } as React.CSSProperties}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-(--blog-surface-border) bg-(--blog-surface) px-6 py-16 text-center shadow-sm sm:py-20">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base">
              No posts yet
            </p>
            <p className="max-w-md text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
              Add an <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[11px] dark:bg-zinc-800">.mdx</code>{" "}
              file under{" "}
              <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
                content/blogs/
              </code>{" "}
              with YAML frontmatter (title, description, date, tags, coverImage).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
