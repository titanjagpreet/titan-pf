# Portfolio

A production-ready personal portfolio and blog. The site presents projects (with case studies), MDX-based writing, resume and work history, and contact flows including optional Cal.com scheduling.

---

## Overview

| | |
| --- | --- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Content** | MDX posts in-repo; project metadata as structured data |

The UI is optimized for clarity and performance: server components by default, client islands for interactivity (theme, motion, embeds), and static generation where it fits.

---

## Features

- **Home** – Hero (with availability + local time), featured projects, about, recent posts, GitHub activity heatmap, call-to-action
- **Projects** – Listing and per-project case study pages (overview, technical breakdown, challenges, learnings)
- **Blog** – MDX with frontmatter, reading time, and related posts
- **Resume & experience** – Dedicated pages for CV download and timeline content
- **Contact** – Working contact form (Resend, with a prefilled mailto fallback), Cal.com “Book a call” (loaded on demand), copy-email button
- **Interaction** – ⌘K / Ctrl+K command menu, project card → case study image morph (View Transitions), cursor spotlight on cards, circular theme reveal with switch sounds (mutable from the footer or ⌘K), scrollspy tables of contents
- **Motion** – CSS entrances so content is visible before JavaScript loads, shared easing tokens, and full `prefers-reduced-motion` support
- **SEO** – Metadata, Open Graph, `sitemap.xml`, `robots.txt`, canonical URL support

---

## Repository layout

```
app/                 # Routes, layouts, API routes
components/          # UI by feature (home, blog, projects, layout)
content/blogs/       # MDX blog posts
data/                # site.ts, projects.ts, shared config
lib/                 # MDX helpers, utilities, site URL helper
public/assets/       # Static assets (images, PDFs)
```

---

## Getting started

**Requirements:** Node.js 20+ recommended (align with your deployment target).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Optimized production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site origin (e.g. `https://example.com`). Used for canonical URLs, sitemap, and Open Graph when deployed. |
| `GITHUB_TOKEN` | Personal access token (`read:user`) for the GitHub activity heatmap. Fetched on the server and revalidated hourly; without it the section is hidden. |
| `NEXT_PUBLIC_USE_MOCK_GITHUB` | Set to `true` to preview the heatmap with random data (overrides the token). |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for the contact form. Without it, the form offers a prefilled mailto link instead. |
| `CONTACT_TO_EMAIL` | Optional. Where contact messages go (defaults to `email` in `data/site.ts`). |
| `CONTACT_FROM_EMAIL` | Optional. Sender address, e.g. `Portfolio <hello@yourdomain.com>` (must be a domain verified in Resend; defaults to Resend's test sender). |

Site copy, social links, availability pill, time zone, Cal.com booking path, and similar settings live in **`data/site.ts`**. Project entries and case study fields (summary, kind, highlights, screenshot import) are edited in **`data/projects.ts`**. New blog posts are added under **`content/blogs/`** as `.mdx` files with YAML frontmatter.

---

## Deployment

Deploy to any platform that supports Next.js (e.g. [Vercel](https://vercel.com)). Set `NEXT_PUBLIC_SITE_URL` to your live domain in the hosting environment.

---

## License

All rights reserved. This repository is private unless otherwise stated.
