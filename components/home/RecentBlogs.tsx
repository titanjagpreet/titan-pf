import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { SECTION_WIDTH } from "@/lib/constants";

export function RecentBlogs() {
  const blogs = getAllBlogs().slice(0, 2);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <div className="mb-8 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionBadge className="mb-3">Writing</SectionBadge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
              Recent Blogs
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-600" />
          </div>
          <Link
            href="/blogs"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 sm:self-auto dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View all blogs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
