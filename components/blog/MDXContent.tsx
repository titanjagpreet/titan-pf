import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { CopyButton } from "./CopyButton";
import { ServerClientTree } from "./ServerClientTree";

type Props<T extends keyof React.JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<T>;

/** Headings get a hover "#" anchor link (ids come from rehype-slug). */
function anchored(Tag: "h2" | "h3", className: string) {
  function Heading({ id, children, ...props }: Props<"h2">) {
    return (
      <Tag id={id} className={`group/heading scroll-mt-28 ${className}`} {...props}>
        {children}
        {id ? (
          <a
            href={`#${id}`}
            aria-label="Link to this section"
            className="ml-2 inline-block text-zinc-400 no-underline opacity-0 transition-opacity duration-150 hover:text-accent focus-visible:opacity-100 group-hover/heading:opacity-100 dark:text-zinc-600"
          >
            #
          </a>
        ) : null}
      </Tag>
    );
  }
  return Heading;
}

const linkClass =
  "font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 transition-[text-decoration-color] duration-200 hover:decoration-accent dark:text-zinc-100 dark:decoration-zinc-700";

const components = {
  h1: (props: Props<"h1">) => (
    <h1
      className="mt-8 mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl"
      {...props}
    />
  ),
  h2: anchored("h2", "mt-10 mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"),
  h3: anchored("h3", "mt-8 mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"),
  h4: (props: Props<"h4">) => (
    <h4
      className="mt-6 mb-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
      {...props}
    />
  ),
  p: (props: Props<"p">) => (
    <p className="mb-6 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  a: ({ href, ...props }: Props<"a">) => {
    if (href?.startsWith("/") || href?.startsWith("#")) {
      return <Link href={href} className={linkClass} {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...props} />;
  },
  ul: (props: Props<"ul">) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  ol: (props: Props<"ol">) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  li: (props: Props<"li">) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: Props<"blockquote">) => (
    <blockquote
      className="mt-6 mb-6 rounded-r-lg border-l-4 border-zinc-400/70 bg-(--blog-surface) py-3 pl-4 pr-4 italic text-zinc-800 dark:border-zinc-500 dark:text-zinc-300"
      {...props}
    />
  ),
  hr: (props: Props<"hr">) => <hr className="my-8 border-zinc-200 dark:border-zinc-800" {...props} />,
  img: ({ src, alt }: Props<"img">) =>
    typeof src === "string" ? (
      <span className="relative my-8 block overflow-hidden rounded-xl border border-zinc-300/50 shadow-sm dark:border-white/10">
        <Image
          src={src}
          alt={alt || "Blog post image"}
          width={1200}
          height={630}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full object-cover"
        />
      </span>
    ) : null,
  pre: ({ children, ...props }: Props<"pre"> & { "data-language"?: string }) => {
    const child = React.isValidElement<{ "data-language"?: string }>(children) ? children : null;
    const language = props["data-language"] || child?.props["data-language"] || "code";

    return (
      <div
        data-code-block
        className="group relative my-6 max-w-full min-w-0 overflow-hidden rounded-xl border border-(--blog-code-border) bg-(--blog-code-bg) shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-(--blog-code-border) bg-zinc-100 px-4 py-2 dark:bg-[#161b22]">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5" aria-hidden>
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {language}
            </span>
          </div>
          <CopyButton />
        </div>
        <pre
          className="blog-code-pre max-w-full overflow-x-hidden whitespace-pre-wrap wrap-break-word p-4 text-sm [&_code]:block [&_code]:min-w-0 [&_code]:w-full [&_code]:max-w-full [&_code]:whitespace-pre-wrap [&_code]:wrap-break-word [&_code]:bg-transparent [&_code]:text-(--blog-code-text)"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },
  code: (props: Props<"code"> & { "data-language"?: string }) => {
    // Block code (inside pre) carries data-language from rehype-pretty-code; inline code does not.
    const isInline = !props["data-language"];

    if (isInline) {
      return (
        <code
          className="rounded-md border border-(--blog-code-border) bg-(--blog-inline-code-bg) px-1.5 py-0.5 text-[0.875em] font-medium text-(--blog-inline-code-text)"
          {...props}
        />
      );
    }

    return (
      <code
        className="block min-w-0 w-full max-w-full whitespace-pre-wrap wrap-break-word text-(--blog-code-text)"
        {...props}
      />
    );
  },
  /** Interactive components available inside posts */
  ServerClientTree,
};

const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} options={options} />
    </div>
  );
}
