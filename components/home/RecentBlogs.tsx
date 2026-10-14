import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SECTION_WIDTH } from "@/lib/constants";

export function RecentBlogs() {
  const blogs = getAllBlogs().slice(0, 2);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className={SECTION_WIDTH}>
        <SectionHeading
          badge="Writing"
          title="Recent Blogs"
          action={
            <Link
              href="/blogs"
              className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              View all blogs
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
