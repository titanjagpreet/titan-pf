import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/mdx";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-zinc-500"
    >
      <article className="blog-card-surface flex h-full flex-col overflow-hidden rounded-2xl transition-all hover:border-zinc-400/50 hover:shadow-md dark:hover:border-white/15 dark:hover:shadow-black/40">
        <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-300/40 dark:border-white/10">
          <Image
            src={blog.coverImage}
            alt={`Cover image for ${blog.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md border border-zinc-300/40 bg-(--blog-surface) px-2 py-1 text-xs font-medium text-zinc-800 dark:border-white/10 dark:text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
            {blog.title}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-zinc-700 dark:text-zinc-400">
            {blog.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
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
    </Link>
  );
}
