import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/mdx";
import { Calendar, Clock } from "lucide-react";
import { Spotlight } from "@/components/shared/Spotlight";

interface BlogCardProps {
  blog: Pick<BlogPost, "slug" | "title" | "description" | "date" | "tags" | "coverImage" | "readingTime">;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Spotlight className="blog-card-surface h-full overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-300 ease-snappy group-hover:border-zinc-400/50 group-hover:shadow-md dark:group-hover:border-white/15 dark:group-hover:shadow-black/40">
        <article className="flex h-full flex-col">
          <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-300/40 dark:border-white/10">
            <Image
              src={blog.coverImage}
              alt={`Cover image for ${blog.title}`}
              fill
              sizes="(min-width: 768px) 360px, calc(100vw - 48px)"
              className="object-cover transition-transform duration-700 ease-snappy group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-zinc-300/40 bg-(--blog-surface) px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-700 dark:border-white/10 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300 sm:text-xl">
              {blog.title}
            </h3>
            <p className="mb-4 line-clamp-2 flex-1 text-sm text-zinc-700 dark:text-zinc-400">
              {blog.description}
            </p>
            <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={blog.date}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{blog.readingTime}</span>
              </div>
            </div>
          </div>
        </article>
      </Spotlight>
    </Link>
  );
}
