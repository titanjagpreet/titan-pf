import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { CopyButton } from "./CopyButton";

const components = {
  h1: (props: any) => (
    <h1
      className="mt-8 mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="mt-6 mb-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="mb-6 leading-relaxed text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),
  a: (props: any) => {
    const href = props.href;
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-700 dark:hover:decoration-zinc-100"
          {...props}
        />
      );
    }
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-700 dark:hover:decoration-zinc-100"
        {...props}
      />
    );
  },
  ul: (props: any) => (
    <ul
      className="mb-6 ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="mb-6 ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="mt-6 mb-6 rounded-r-lg border-l-4 border-zinc-400/70 bg-(--blog-surface) py-3 pl-4 pr-4 italic text-zinc-800 dark:border-zinc-500 dark:text-zinc-300"
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="my-8 border-zinc-200 dark:border-zinc-800" {...props} />
  ),
  img: (props: any) => (
    <div className="relative my-8 overflow-hidden rounded-xl border border-zinc-300/50 shadow-sm dark:border-white/10">
      <Image
        src={props.src}
        alt={props.alt || ""}
        width={1200}
        height={630}
        className="w-full object-cover"
      />
    </div>
  ),
  pre: (props: any) => {
    // Extract raw string content from children for the copy button
    let rawContent = "";
    if (props.children && props.children.props && props.children.props.children) {
      rawContent = props.children.props.children;
    }

    const language = props["data-language"] || (props.children && props.children.props && props.children.props["data-language"]) || "code";

    return (
      <div className="group relative my-6 max-w-full min-w-0 overflow-hidden rounded-xl border border-(--blog-code-border) bg-(--blog-code-bg) shadow-sm">
        <div className="flex items-center justify-between border-b border-(--blog-code-border) bg-zinc-100 px-4 py-2 dark:bg-[#161b22]">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {language}
            </span>
          </div>
          {rawContent && (
            <CopyButton 
              text={rawContent} 
              className="bg-transparent dark:bg-transparent border-none shadow-none text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50" 
            />
          )}
        </div>
        <pre
          className="blog-code-pre max-w-full overflow-x-hidden whitespace-pre-wrap wrap-break-word p-4 text-sm [&_code]:block [&_code]:min-w-0 [&_code]:w-full [&_code]:max-w-full [&_code]:whitespace-pre-wrap [&_code]:wrap-break-word [&_code]:bg-transparent [&_code]:text-(--blog-code-text)"
          {...props}
        />
      </div>
    );
  },
  code: (props: any) => {
    // If it's a block code (inside pre), it will have a specific structure from rehype-pretty-code
    // If it's inline code, it won't have the data-language attribute (usually)
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
