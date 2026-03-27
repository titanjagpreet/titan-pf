import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SECTION_WIDTH } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Jagpreet Singh",
  description: "Thoughts, tutorials, and insights on web development, tech, and more.",
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16">
      <div className={SECTION_WIDTH}>
        <div className="mb-8 sm:mb-12">
          <SectionBadge className="mb-3">Writing</SectionBadge>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
            Blogs
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-700 dark:text-zinc-400">
            Thoughts, tutorials, and notes on web development and tech.
            {blogs.length > 0 && (
              <span className="mt-2 block text-sm text-zinc-500 dark:text-zinc-500">
                {blogs.length} {blogs.length === 1 ? "post" : "posts"} published
              </span>
            )}
          </p>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-600" />
        </div>

        {blogs.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
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
