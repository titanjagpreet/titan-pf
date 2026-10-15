/**
 * Portfolio projects. Edit entries here. Import a cover/screenshot from public/assets/ as `image`
 * (static imports give next/image the dimensions and a blur placeholder).
 * Omit projectUrl if not deployed (hides the "Live" badge). Omit githubUrl if the repo is private
 * (hides the GitHub button and "Open source" badge). Use nextProjectSlug when you have multiple projects.
 */

import type { StaticImageData } from "next/image";
import lighterPulseImage from "@/public/assets/lp-hero.png";
import liquidationsImage from "@/public/assets/liquidations.png";
import walletxImage from "@/public/assets/walletx-hero.png";
import liveCursorsImage from "@/public/assets/live-cursors.png";
import lighterOiImage from "@/public/assets/lighter-oi.png";
import turborepoPipelineImage from "@/public/assets/turborepo-pipeline.png";
import pramanaImage from "@/public/assets/pramana.jpg";

export interface TechnicalSection {
  heading: string;
  /** Use double newlines between paragraphs for spacing. */
  body: string;
}

export interface ProjectHighlight {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short (~2 line) pitch for cards and the command palette. */
  summary: string;
  description: string;
  /** What kind of project this is, e.g. "Product", "Backend service". */
  kind: string;
  /** 2-3 headline facts shown at the top of the case study. */
  highlights?: ProjectHighlight[];
  techStack?: string[];
  challenges?: string[];
  learnings?: string[];
  overview?: string;
  /** Optional tech-blog style sections for the case study page. */
  technicalSections?: TechnicalSection[];
  content?: string;
  featured?: boolean;
  nextProjectSlug?: string;
  image?: StaticImageData;
  projectUrl?: string;
  githubUrl?: string;
  whatItDoes?: string[];
  examples?: { shortcut: string; value: string }[];
  /** Optional section titles for the case study (defaults: "What it does", "Technical challenges", "Learnings"). */
  headings?: { whatItDoes?: string; challenges?: string; learnings?: string };
  /** Planned improvements, shown as a "Next steps" section. */
  nextSteps?: string[];
  technicalBreakdown?: { title: string; body: string }[];
  challengesDetail?: { title: string; content: string }[];
  whoItsFor?: string;
}

export const projects: Project[] = [
  {
    slug: "lighterpulse",
    image: lighterPulseImage,
    title: "LighterPulse",
    summary:
      "Analytics hub for Lighter.xyz: dashboards, a block explorer, exchange stats and cross-venue funding comparison.",
    kind: "Product",
    highlights: [
      { value: "4", label: "venues in funding comparison" },
      { value: "~1h", label: "Redis TTL on KPI aggregates" },
      { value: "<2s", label: "perceived load on a warm cache" },
    ],
    description:
      "Analytics and exploration platform for the Lighter.xyz ecosystem, covering dashboards, a block explorer, exchange statistics, multi-venue funding comparison, and protocol announcements. Redis-backed caching and a split between live and cached data paths keep the UI responsive.",
    featured: true,
    projectUrl: "https://lighterpulse.xyz",
    /* Private repo: omit githubUrl */
    nextProjectSlug: "lighter-liquidations",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Upstash Redis",
      "Dune Analytics",
      "WebSockets",
      "Next.js API Routes"
    ],
    overview:
      "LighterPulse is a single product surface for traders and researchers who use Lighter.xyz. It combines account-level dashboards (including dynamic routes keyed by address), a block and transaction explorer with hash- and height-based navigation, an exchange statistics view built around a fixed set of KPI cards, a funding comparison workflow across Lighter and major perpetual venues, and an announcements area for protocol and product updates.\n\nThe implementation prioritizes predictable latency: metrics that can tolerate staleness are served through a cached layer, while prices, positions, and explorer results stay on shorter-lived or on-demand fetches. The UI uses progressive disclosure and lazy loading so heavy panels do not block first paint on constrained networks.",
    technicalSections: [
      {
        heading: "Application architecture",
        body:
          "The app is structured on the Next.js App Router with feature-oriented route segments: marketing landing, dashboard with `[address]` dynamics, explorer with nested `tx/[txnhash]`, plus standalone sections for exchange statistics, funding comparison, announcements, and support. Shared layout and error boundaries (`error.tsx`, `global-error.tsx`, `not-found.tsx`) keep failures localized and recoverable.\n\nServer components are used where data can be resolved on the server without shipping unnecessary client JavaScript. Client components own interactivity: search inputs, manual refresh controls, charts, and WebSocket-driven updates. API routes under `app/api` encapsulate server-only secrets (for example Dune and Upstash credentials) and return JSON consumed by the client or by server components via internal fetch patterns where appropriate.",
      },
      {
        heading: "Data layer, caching, and external APIs",
        body:
          "Lighter.xyz public APIs supply account balances, positions, market metadata, and explorer-shaped data. Dune Analytics augments protocol- and chain-level metrics where SQL-defined datasets are the right source of truth. Funding comparison aggregates REST endpoints from Lighter, Binance, Bybit, and Hyperliquid; each integration is typed independently so schema drift on one venue does not break the others.\n\nUpstash Redis backs a metrics endpoint (for example `/api/metrics`) with a roughly one-hour TTL for expensive aggregates: TVL, user counts, retention-style figures, and similar KPIs that power the exchange statistics cards. Trading-adjacent views that require fresher data bypass that cache or use shorter TTLs. Manual refresh actions revalidate selected queries and surface last-updated timestamps so users can reason about freshness.",
      },
      {
        heading: "Real-time channels and client performance",
        body:
          "WebSockets (configured via public `wss` URL where the protocol exposes streaming data) support live updates on views that benefit from push-style refreshes without polling loops. Where sockets are not used, the client batches parallel `fetch` calls and avoids waterfall requests on dashboard and explorer entry.\n\nTailwind CSS 4 and a small set of third-party UI primitives (Radix, Lucide, plus motion-heavy presentation components) keep styling consistent. Images and non-critical panels load lazily; route-level code splitting is largely inherited from the App Router's per-segment bundles.",
      },
      {
        heading: "Types, validation, and operational concerns",
        body:
          "Domain types live in dedicated modules (funding, explorer, exchange statistics, transactions, routes) so API mappers and UI props stay aligned. Input validation utilities guard address, hash, and numeric search parameters before hitting upstream APIs, reducing avoidable 4xx noise and improving error messaging.\n\nSEO primitives (`sitemap.ts`, `robots.ts`) and metadata on layouts support discoverability for a public deployment. Environment variables are documented for local and hosted setups: API base URLs, WebSocket URL, Dune key, Upstash REST URL and token, and optional analytics IDs.",
      },
    ],
    challenges: [
      "Defining a single caching policy that works across KPI aggregates (hour-safe), pair statistics (minutes-level), and user-specific dashboard data (near real-time) without contradictory UI states",
      "Normalizing funding rate and market structures across four exchanges with different field names, precisions, and update cadences",
      "Chaining Lighter, Dune, and venue APIs in explorer and dashboard flows while keeping time-to-interactive acceptable on 3G-class connections",
      "Handling explorer edge cases: invalid hashes, delayed confirmation messaging, and empty result sets without breaking search UX",
      "Sharing data-fetch helpers between server and client code paths without duplicating business logic or leaking secrets to the bundle",
    ],
    learnings: [
      "Hour-scoped Redis caching for aggregate metrics reduced redundant upstream calls by a large margin and brought several views into a consistent sub-2 second perceived load when the cache was warm",
      "Labeling surfaces explicitly as live versus cached, plus manual refresh and timestamps, reduced support questions about stale numbers more than micro-optimizing TTLs alone",
      "Investing in per-domain TypeScript models early paid off when exchange APIs shipped minor breaking changes; refactors stayed localized to mapper functions",
      "Lazy loading below-the-fold panels and deferring non-critical third-party work improved Lighthouse scores without changing product scope",
      "Centralizing secrets in Route Handlers and validating all user-derived IDs before proxying to Lighter or Dune simplified security review and error handling",
    ],
  },
  {
    slug: "lighter-liquidations",
    image: liquidationsImage,
    title: "Lighter Liquidations",
    summary:
      "Streaming pipeline that ingests Lighter liquidations, dedupes replayed batches and serves a rolling 24h total.",
    kind: "Backend service",
    highlights: [
      { value: "1 min", label: "time-series bucket size" },
      { value: "24h", label: "rolling liquidation window" },
      { value: "2", label: "isolated processes: worker + API" },
    ],
    description:
      "Backend service for Lighter.xyz that ingests perpetuals liquidation events over WebSockets, deduplicates noisy replay batches, aggregates notional USD into per-minute buckets in Upstash Redis, and serves a rolling 24 hour liquidation total over HTTP.",
    featured: true,
    githubUrl: "https://github.com/titanjagpreet/lighter-liquidations",
    nextProjectSlug: "lighter-oi",
    techStack: [
      "Node.js",
      "WebSockets (Lighter streams)",
      "Upstash Redis",
      "Minute-bucket time series",
      "HTTP REST API",
    ],
    overview:
      "Lighter Liquidations is a real-time data pipeline that tracks liquidation activity across Lighter.xyz markets and maintains a rolling 24-hour liquidation metric. The system is designed to handle noisy WebSocket streams, eliminate duplicate events, and aggregate high-frequency data into a query-efficient time series.\n\nIt follows a split architecture: a persistent worker ingests and processes streaming data, while a stateless HTTP API serves pre-aggregated results. Redis acts as the aggregation layer using minute-level buckets with TTL-based retention.",
    whatItDoes: [
      "Consumes liquidation events from Lighter WebSocket streams in real time",
      "Deduplicates repeated or batched events to prevent inflated metrics",
      "Aggregates liquidation volume into minute-level time buckets",
      "Maintains a rolling 24-hour liquidation total using Redis TTL",
      "Exposes a lightweight HTTP API for dashboards and integrations",
    ],
    technicalBreakdown: [
      {
        title: "System architecture",
        body: "The system is split into two independent processes: a long-running worker and a stateless HTTP server. The worker maintains WebSocket connections, processes incoming liquidation events, and updates Redis in real time. The API server reads aggregated data from Redis and exposes it via REST endpoints.",
      },
      {
        title: "Ingestion and data layer",
        body: "WebSocket ingestion is handled using Node.js with persistent connections and reconnection logic. Redis (Upstash REST) is used as a time-series store where each minute acts as a bucket. Deduplication logic ensures idempotent aggregation by filtering repeated events within batch windows. The rolling 24-hour metric is computed dynamically by summing active buckets.",
      },
    ],
    challengesDetail: [
      {
        title: "Deduplication of noisy WebSocket streams",
        content:
          "Lighter streams often send repeated or batched liquidation events, which can lead to overcounting. A deduplication strategy was implemented by comparing key fields within short time windows, ensuring idempotent aggregation without dropping legitimate events.",
      },
      {
        title: "Designing a rolling time window",
        content:
          "Instead of storing a single aggregate value, liquidation data is stored in minute-level buckets with a 25-hour TTL. This allows efficient computation of a rolling 24-hour metric while keeping memory usage bounded and predictable.",
      },
      {
        title: "Separation of ingestion and serving layers",
        content:
          "Running WebSocket ingestion and API serving in the same process created stability issues. Splitting them into worker and server processes ensured better fault isolation and allowed independent scaling and restarts.",
      },
      {
        title: "Handling WebSocket reliability",
        content:
          "Frequent disconnects and network instability required implementing reconnection logic and ensuring no data corruption during reconnect cycles. The system prioritizes consistency over completeness, avoiding incorrect spikes in metrics.",
      },
    ],
    whoItsFor:
      "Built for analytics platforms, trading dashboards, and developers who need accurate real-time liquidation data from Lighter.xyz without handling raw WebSocket streams or dealing with duplicate event noise.",
    challenges: [
      "Deduplicating noisy WebSocket liquidation events",
      "Handling reconnects without corrupting aggregates",
      "Designing efficient rolling 24h time window",
      "Choosing optimal bucket granularity (per-minute)",
      "Syncing worker and API without race conditions",
      "Avoiding spikes from replayed event batches",
    ],
    learnings: [
      "Idempotency is critical in streaming systems",
      "Bucketed time-series > single aggregate values",
      "Separate ingestion and serving layers",
      "Consistency matters more than completeness",
      "Redis works well for short-term time-series",
      "Always design for failure scenarios",
    ],
  },
  {
    slug: "lighter-oi",
    image: lighterOiImage,
    title: "Lighter OI Aggregator",
    summary:
      "Snapshot service that totals open interest across every Lighter market every 15 minutes and serves it from one REST endpoint.",
    kind: "Backend service",
    highlights: [
      { value: "15 min", label: "snapshot refresh cycle" },
      { value: "× 2", label: "one-sided feed normalised to the two-sided total" },
      { value: "1", label: "endpoint: GET /api/open-interest" },
    ],
    description:
      "Background service for Lighter.xyz that computes total open interest across every perpetuals market. A worker takes a WebSocket snapshot every 15 minutes, normalises it to the two-sided figure Lighter shows in its own app and stores it in Upstash Redis; a stateless Express API serves it to dashboards with a single read.",
    githubUrl: "https://github.com/titanjagpreet/lighter-oi",
    nextProjectSlug: "walletx",
    techStack: ["Node.js", "WebSockets (ws)", "Upstash Redis", "Express", "REST API"],
    overview:
      "Lighter OI Aggregator answers a question every Lighter dashboard needs: how much open interest is there across the whole exchange right now? Lighter's market-stats stream reports open interest market by market, so an exchange-wide figure means summing every market, and keeping a socket open in every client just to add those numbers up is wasteful.\n\nThe service splits the problem into two small processes. A worker connects on a schedule, reads one complete snapshot of every market, computes the total and disconnects. A stateless HTTP API reads the stored figure from Redis, so clients get the number with one request and no streaming code.",
    whatItDoes: [
      "Subscribes to Lighter's market_stats/all channel and reads the initial snapshot of every market",
      "Sums open interest across all markets and doubles it, matching the two-sided total Lighter's own interface shows",
      "Persists the result to Upstash Redis, overwriting the previous value each cycle",
      "Repeats every 15 minutes, so newly listed or delisted markets are picked up without code changes",
      "Serves the latest total from GET /api/open-interest, with CORS enabled for browser clients",
    ],
    technicalBreakdown: [
      {
        title: "Snapshot worker",
        body: "Instead of holding a long-lived WebSocket, the worker opens a fresh connection each cycle, subscribes to market_stats/all and waits for the subscription snapshot. It accepts both payload shapes the channel can send (a map of market id to stats, or a single market object), keeps the latest open interest per market id, saves the doubled total once and closes the socket. A 60-second timeout guarantees a stalled connection can never block the next cycle.",
      },
      {
        title: "Storage and API",
        body: "Upstash Redis holds a single key, total_open_interest_usd, which is the only state the worker and the API share, so the two never depend on each other's memory or process. The Express server is stateless: one route reads the key and returns { total_open_interest_usd }, with failures mapped to a 500 response. One npm script starts both processes together.",
      },
    ],
    challengesDetail: [
      {
        title: "Normalising Lighter's open-interest figure",
        content:
          "The market stats stream reports open interest for one side of each market, so a plain sum comes out at half the number traders see in Lighter's app. The service doubles the total once, at write time, so every consumer reads the same figure and none of them has to know about the quirk.",
      },
      {
        title: "Choosing snapshots over a permanent stream",
        content:
          "Total open interest moves slowly compared with prices, so a permanent socket would add reconnection logic and memory for no real benefit. Reading one snapshot per cycle keeps the worker simple and cheap, and because each cycle sums whatever markets exist at that moment, listings and delistings are handled automatically.",
      },
      {
        title: "Never letting one cycle block the next",
        content:
          "A network stall during the snapshot could leave the worker waiting indefinitely. Every cycle resolves on close, on error or after a 60-second timeout, whichever comes first, so a bad connection costs at most one refresh.",
      },
      {
        title: "Handling two payload shapes",
        content:
          "The same channel can deliver a map of markets or a single market object depending on the message. The parser normalises both into one record keyed by market id before summing, so a market that appears in more than one message is never counted twice.",
      },
    ],
    whoItsFor:
      "Analytics dashboards, trading tools and bots that need Lighter's total open interest as a single number, without running their own WebSocket client or aggregation logic.",
    learnings: [
      "Match the refresh cadence to how fast the metric actually moves",
      "Normalise upstream quirks once, at write time, not in every client",
      "Separate processes should share state through a store, not memory",
      "Every network wait needs a timeout",
      "Small single-purpose services are easy to reason about and redeploy",
    ],
  },
  {
    slug: "walletx",
    image: walletxImage,
    title: "WalletX",
    summary:
      "FinTech-style wallet demo where every P2P transfer is atomic, backed by MongoDB multi-document transactions.",
    kind: "Full-stack demo",
    highlights: [
      { value: "ACID", label: "multi-document transfers" },
      { value: "JWT + Zod", label: "auth and input validation" },
      { value: "Rollback", label: "on any failure before commit" },
    ],
    description:
      "Full-stack FinTech-style wallet demo: P2P transfers, balances, history, and dashboard analytics. MongoDB multi-document transactions enforce ACID semantics so debits and credits stay consistent under concurrency (simulated funds, not real money).",
    featured: true,
    projectUrl: "https://walletx-coral.vercel.app/",
    githubUrl: "https://github.com/titanjagpreet/walletx",
    nextProjectSlug: "dockerized-turborepo-pipeline",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "MongoDB transactions",
      "JWT",
      "BCrypt",
      "Zod",
    ],
    overview:
      "WalletX is a full-stack FinTech-style application that simulates real-world wallet operations such as peer-to-peer transfers, balance management, and transaction history. The system is designed with strong consistency guarantees, ensuring that every transfer behaves like a real financial operation.\n\nAt its core, WalletX leverages MongoDB multi-document transactions to enforce ACID properties. All transfers are executed atomically using database sessions, preventing partial updates, double spending, or inconsistent balances even under concurrent requests.",
    whatItDoes: [
      "Executes peer-to-peer money transfers with atomic guarantees",
      "Maintains consistent balances across sender and receiver accounts",
      "Stores complete transaction history with audit trail",
      "Provides real-time dashboard with balance and analytics",
      "Implements secure authentication and user management",
    ],
    technicalBreakdown: [
      {
        title: "Frontend",
        body: "Frontend is built with React + Vite using TypeScript, with TanStack Query for server state management and Recharts for analytics. The UI is component-driven with Tailwind and Radix, focusing on responsive and accessible FinTech-style design.",
      },
      {
        title: "Backend",
        body: "Backend follows an MVC architecture using Express and Mongoose. Core business logic is implemented in a transfer service that uses MongoDB sessions and multi-document transactions to ensure ACID compliance. JWT handles authentication, while Zod validates all inputs before execution.",
      },
    ],
    challengesDetail: [
      {
        title: "Ensuring atomic money transfers",
        content:
          "A transfer involves debiting one account and crediting another. Without transactions, partial failures could corrupt balances. This was solved using MongoDB sessions and multi-document transactions to guarantee atomicity.",
      },
      {
        title: "Preventing double spending",
        content:
          "Concurrent requests or retries could result in duplicate transfers. The system enforces balance checks and executes all operations within a single transaction scope to maintain consistency.",
      },
      {
        title: "Maintaining consistency under failure",
        content:
          "Failures during transfer execution (server crash, validation error) must not leave the system in an invalid state. Transactions ensure automatic rollback on any failure before commit.",
      },
      {
        title: "Keeping transactions performant",
        content:
          "Long-running transactions can cause contention in MongoDB. Indexing and minimal query scope were used to keep transactions short and efficient.",
      },
    ],
    whoItsFor:
      "Designed for developers and recruiters to demonstrate understanding of real-world financial system design, including transactional integrity, backend architecture, and secure full-stack application development.",
    challenges: [
      "Ensuring atomic debit-credit operations",
      "Preventing double spending in concurrent requests",
      "Handling transaction rollback on failure",
      "Keeping MongoDB transactions performant",
      "Validating inputs before transactional execution",
      "Maintaining consistency across multiple documents",
    ],
    learnings: [
      "ACID is critical for financial systems",
      "MongoDB transactions enable true atomicity",
      "Idempotency prevents duplicate operations",
      "Validation should happen before DB logic",
      "Short transactions reduce contention",
      "Backend correctness > frontend complexity",
    ],
  },
  {
    slug: "dockerized-turborepo-pipeline",
    image: turborepoPipelineImage,
    title: "Dockerized Turborepo Pipeline",
    summary:
      "A learning project for CI/CD and Docker: containerised services shipped by GitHub Actions to a Linux VM behind Nginx and HTTPS.",
    kind: "Learning project · DevOps",
    highlights: [
      { value: "3", label: "GitHub Actions pipelines, one per service" },
      { value: ":<sha>", label: "commit-tagged images on Docker Hub" },
      { value: "4", label: "containers on one private Docker network" },
    ],
    description:
      "A hands-on project for learning CI/CD and containerisation end to end. It packages each service of a small Turborepo monorepo as its own Docker image, then uses GitHub Actions to build the images, push them to Docker Hub and deploy them over SSH to a Linux VM, where Nginx serves each one on its own subdomain over HTTPS. The apps are deliberately minimal; the pipeline and the infrastructure are the project.",
    githubUrl: "https://github.com/titanjagpreet/dockerized-turborepo-pipeline",
    nextProjectSlug: "live-cursors",
    headings: {
      whatItDoes: "What I set up",
      challenges: "Problems I worked through",
      learnings: "What I learned",
    },
    techStack: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Docker Hub",
      "Nginx",
      "Let's Encrypt (Certbot)",
      "Linux VM (SSH)",
      "Turborepo",
      "pnpm",
      "PostgreSQL",
      "Prisma",
    ],
    overview:
      "The goal was to learn how code gets from a git push to a running server without a hosting platform doing the work. To have something realistic to ship, the repository is a Turborepo monorepo with three minimal sample services (a Next.js page, an Express API with sign-up and sign-in, and a WebSocket server) that share one PostgreSQL database through a Prisma package. The services exist to be containerised and deployed; they are not the focus.\n\nEverything around them was set up by hand: a Dockerfile for each service, Docker Compose files for local and production runs, a GitHub Actions workflow per service that builds and pushes an image to Docker Hub, and an SSH deploy step that pulls the new image onto a Linux VM and recreates the container. On the VM, Nginx routes a subdomain to each container and Certbot provides the HTTPS certificates.",
    whatItDoes: [
      "A Dockerfile for each service (web, HTTP API and WebSocket server), all built from one shared pnpm workspace",
      "Docker Compose files for local development and for production, with every container on one private network",
      "A PostgreSQL 17 container with a named volume, so data survives restarts and redeploys",
      "One GitHub Actions workflow per service that runs only when that service, its Dockerfile or the shared packages change",
      "Image publishing to Docker Hub with two tags: the commit SHA and latest",
      "Automated deploys over SSH that pull the exact commit's image and recreate the container on the VM, with the Docker Hub and SSH credentials stored as GitHub Actions secrets",
      "An Nginx reverse proxy with a subdomain per service, WebSocket upgrades and Let's Encrypt HTTPS through Certbot",
    ],
    technicalBreakdown: [
      {
        title: "The CI/CD pipeline",
        body: "Each workflow checks out the repository, logs in to Docker Hub, builds the service's image with docker/build-push-action and pushes it as turbo-<service>:<sha> and :latest. A final step connects to the VM over SSH, pulls the SHA-tagged image, stops and removes the old container and starts the new one on the shared network. Path filters keep the three pipelines independent: a frontend change ships only the frontend, while a change under packages/** rebuilds all three services.",
      },
      {
        title: "Containers and runtime",
        body: "The Dockerfiles copy the workspace manifests and lockfile before the source, so the pnpm install layer stays cached until dependencies change. The Prisma client is generated at build time against a placeholder DATABASE_URL and the real one is supplied at run time. In Compose, services reach the database by name (postgres:5432) over the turbo-net network and wait for a pg_isready health check before starting, and the API runs prisma migrate deploy on startup so the schema is always current. Nginx forwards the Upgrade and Connection headers, so WebSocket traffic passes through the same proxy as HTTP.",
      },
    ],
    challengesDetail: [
      {
        title: "Rebuilding only what changed",
        content:
          "In a monorepo, a naive pipeline rebuilds and redeploys everything on every push. Filtering each workflow on its own app folder, its Dockerfile and packages/** made a frontend change ship only the frontend, while a change to the shared Prisma or UI package still rebuilds all three services.",
      },
      {
        title: "Knowing exactly what is deployed",
        content:
          "Deploying :latest makes it impossible to tell which commit is running. The deploy step pulls the image tagged with the commit SHA that triggered the workflow, so every container maps to one commit and rolling back means redeploying an earlier tag.",
      },
      {
        title: "Startup order and migrations",
        content:
          "Containers that start before Postgres is ready crash or fail their first queries. A pg_isready health check now gates the application containers, and running prisma migrate deploy in the API's start command keeps the schema current on every deploy without a manual step.",
      },
      {
        title: "Prisma inside Docker builds",
        content:
          "prisma generate needs a DATABASE_URL, but no database exists during docker build. A placeholder build argument lets the client generate, while the real connection string is only provided when the container runs.",
      },
      {
        title: "WebSockets behind a reverse proxy",
        content:
          "A plain reverse proxy breaks WebSocket connections at the upgrade handshake. Each Nginx server block uses HTTP/1.1 and forwards the Upgrade and Connection headers, so one proxy carries both HTTP and WebSocket traffic, with Certbot managing the certificates.",
      },
    ],
    learnings: [
      "How Docker layer caching works, and why manifests are copied before the source",
      "The difference between build-time and run-time configuration, and how to keep secrets out of images",
      "Container networking: services talk to each other by name on a shared network, not through localhost",
      "Health checks, not sleeps, should decide startup order",
      "Path filters keep monorepo pipelines fast and deploys small",
      "Tag images by commit SHA; latest is a convenience, not a deploy target",
      "How a reverse proxy, subdomains and TLS certificates fit together on a single VM",
    ],
    nextSteps: [
      "Multi-stage Docker builds to shrink the images",
      "Zero-downtime (blue-green) deploys instead of stop-then-start",
      "Turbo remote caching to speed up builds",
      "A staging environment ahead of production",
      "Container monitoring and logs with Prometheus and Grafana",
      "Infrastructure as code with Terraform",
    ],
  },
  {
    slug: "live-cursors",
    image: liveCursorsImage,
    title: "Live Cursors",
    summary:
      "Multiplayer cursors over WebSockets, with throttled pointer streams and Bézier-smoothed rendering.",
    kind: "Real-time demo",
    highlights: [
      { value: "~50ms", label: "pointer update throttle" },
      { value: "Bézier", label: "interpolated cursor motion" },
      { value: "O(n)", label: "broadcast fan-out per update" },
    ],
    description:
      "Real-time collaborative cursors over WebSockets: throttled pointer streams, broadcast fan-out, and Bézier-smoothed rendering with perfect-cursors and GPU-friendly SVG transforms.",
    featured: true,
    githubUrl: "https://github.com/titanjagpreet/live-cursors",
    /* Add projectUrl when the client is deployed publicly */
    nextProjectSlug: "pramana",
    techStack: [
      "Node.js",
      "WebSocket (ws)",
      "UUID",
      "React",
      "TypeScript",
      "perfect-cursors",
      "react-use-websocket"
    ],
    overview:
      "Live Cursors is a real-time collaborative system where multiple users share cursor positions over WebSockets with low latency. The application focuses on efficiently handling high-frequency input streams (mouse movements) and rendering them smoothly across clients.\n\nThe system combines throttled event streaming, broadcast-based WebSocket architecture, and client-side interpolation using Bézier smoothing to deliver fluid cursor motion without overwhelming network or CPU resources.",
    whatItDoes: [
      "Streams cursor positions between multiple users in real time",
      "Broadcasts user state to all connected clients via WebSockets",
      "Applies throttling to reduce network load from high-frequency events",
      "Renders smooth cursor motion using interpolation (perfect-cursors)",
      "Maintains unique user sessions using UUID-based identification",
    ],
    technicalBreakdown: [
      {
        title: "Frontend",
        body: "Frontend is built with React + Vite using TypeScript. WebSocket communication is handled via react-use-websocket, while cursor rendering uses perfect-cursors for Bézier interpolation. SVG + CSS transforms are used for GPU-accelerated rendering and smooth animations.",
      },
      {
        title: "Backend",
        body: "Backend is a stateful WebSocket server built with Node.js and ws. Each client connects with a username, receives a UUID, and sends throttled cursor updates. The server maintains in-memory state and broadcasts updates to all connected clients in real time.",
      },
    ],
    challengesDetail: [
      {
        title: "Handling high-frequency cursor events",
        content:
          "Raw mousemove events generate excessive network traffic. Throttling (~50ms) was implemented to reduce bandwidth while maintaining responsiveness.",
      },
      {
        title: "Achieving smooth real-time rendering",
        content:
          "Direct coordinate updates caused jittery motion. Bézier interpolation via perfect-cursors was used to smooth transitions between points.",
      },
      {
        title: "Managing WebSocket connection lifecycle",
        content:
          "Handling disconnects, reconnects, and stale users required proper cleanup and state synchronization to avoid ghost cursors.",
      },
      {
        title: "Preventing performance bottlenecks",
        content:
          "Frequent updates from multiple users could trigger excessive re-renders. Optimizations ensured minimal React updates and efficient DOM rendering.",
      },
    ],
    whoItsFor:
      "Designed for developers exploring real-time systems, collaborative applications, and performance optimization techniques using WebSockets and client-side rendering.",
    challenges: [
      "Handling high-frequency mouse events efficiently",
      "Reducing bandwidth using throttling",
      "Avoiding jitter in real-time cursor rendering",
      "Managing WebSocket disconnects and stale users",
      "Preventing excessive React re-renders",
      "Scaling broadcast to multiple clients",
    ],
    learnings: [
      "Throttle high-frequency events for performance",
      "Interpolation improves perceived smoothness",
      "WebSockets require lifecycle management",
      "Broadcast systems scale linearly (O(n))",
      "GPU transforms outperform layout updates",
      "Real-time UX depends on perception, not raw speed",
    ],
  },
  {
    slug: "pramana",
    image: pramanaImage,
    title: "Pramana",
    summary:
      "Farm-to-formulation traceability for Ayurvedic herbs: geotagged custody events, hash-linked into a chain anyone can verify from a QR code.",
    kind: "Full-stack prototype",
    highlights: [
      { value: "SHA-256", label: "hash-linked chain of custody" },
      { value: "3 roles", label: "farmer, transporter, manufacturer" },
      { value: "QR", label: "public verification, no sign-in" },
    ],
    description:
      "Traceability prototype for the Ayurvedic herb supply chain. Farmers register geotagged harvest batches, supply-chain actors append custody events, and every event is SHA-256 hash-linked to the one before it, so anyone who scans a batch's QR code sees its full journey on a timeline and a map, together with a check that the chain is unbroken.",
    githubUrl: "https://github.com/titanjagpreet/pramana",
    nextProjectSlug: "lighterpulse",
    techStack: [
      "Next.js 13 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Leaflet",
      "SHA-256 (Node crypto)",
      "bcrypt",
      "QR codes",
    ],
    overview:
      "Ayurvedic products depend on where and how their herbs were grown, but that history is usually lost somewhere between the farm and the shelf. Pramana (Sanskrit for \"proof\") records it as a chain of custody: a farmer registers a harvest with GPS coordinates, soil type and organic certification, and everyone who handles the batch afterwards adds an event with their own location, checkpoint and notes.\n\nEach event stores the hash of the event before it, so the history behaves like a ledger: removing or reordering a step breaks the chain. A public batch page, opened from the batch's QR code, shows the journey as a timeline and a map and verifies the chain before marking it as trusted. The ledger is deliberately simulated, with SHA-256 hash links and generated transaction ids, to prove the workflow before committing to a real blockchain network.",
    whatItDoes: [
      "Lets farmers register herb batches with live GPS coordinates, harvest date, quantity, soil type and organic certificate number",
      "Generates a QR code for every batch that opens its public traceability page",
      "Lets transporters record pickup, transport and quality-check events with location, vehicle, checkpoint and condition notes",
      "Enforces role permissions on the server, so each actor can only record the event types that belong to their role",
      "Links every event to the previous one with a SHA-256 hash and verifies the chain on the public page",
      "Shows the batch's journey as a step-by-step timeline and a Leaflet map connecting every recorded location",
    ],
    technicalBreakdown: [
      {
        title: "Application",
        body: "Built on the Next.js 13 App Router with TypeScript, Tailwind CSS and shadcn/ui. Each role has its own dashboard, protected by middleware that requires a session cookie, while batch pages and the API stay public so a QR scan works for anyone. Passwords are hashed with bcrypt. Dashboards use the browser's Geolocation API with permission tracking and a manual-coordinates fallback, and the journey map loads react-leaflet on the client only, avoiding server-rendering issues.",
      },
      {
        title: "Integrity layer",
        body: "Each event is assembled from its actor, type, location, timestamp and metadata, then hashed with SHA-256 together with the previous event's hash, so every record commits to the entire history before it. Batches also carry a root hash of the original harvest record. A verification endpoint walks the chain and returns whether it is continuous and, if not, the index where it breaks. Records are stored as JSON files and each event is logged as a simulated transaction with a generated id, which keeps the prototype self-contained.",
      },
    ],
    challengesDetail: [
      {
        title: "Making tampering visible",
        content:
          "A supply-chain record is only useful if changes to it can be detected. Hash-linking each event to its predecessor means a removed or reordered step breaks the chain, and the verification endpoint reports exactly where, so the public page can flag a broken history instead of quietly displaying it.",
      },
      {
        title: "Trust boundaries between roles",
        content:
          "A transporter must not be able to record a harvest, and a farmer must not be able to mark a batch as processed. Permissions are checked in the API against the stored user's role rather than in the UI, so a forged request is rejected with a 403.",
      },
      {
        title: "Capturing location in the field",
        content:
          "Location is the core of every event, but browsers expose GPS only on secure origins and only after the user grants permission. Dashboards track the permission state, explain what is needed and fall back to manually entered coordinates, so a denied prompt never blocks the workflow.",
      },
      {
        title: "Public verification without accounts",
        content:
          "Consumers scanning a QR code should not need an account. Middleware protects only the role dashboards and leaves batch pages and the API open, so verification works for anyone with the link.",
      },
    ],
    whoItsFor:
      "Ayurvedic brands, farmer cooperatives and regulators exploring farm-to-shelf provenance, and consumers who want proof of where a product's herbs came from.",
    learnings: [
      "A hash-linked log makes a supply-chain history tamper-evident without committing to a blockchain on day one",
      "Enforce permissions on the server; the UI should only reflect them",
      "Keep authentication for the people who write records; verification pages should be public",
      "Location capture needs a graceful path for denied permissions",
      "Proving the workflow on a simulated ledger first keeps the choice of chain open",
    ],
    nextSteps: [
      "Recompute each event's hash during verification, not only check that the links match",
      "Replace the JSON file storage with a database",
      "Signed, expiring sessions instead of a plain session cookie",
      "Finish the manufacturer flow: product creation and product QR pages",
      "Anchor batch root hashes on a public blockchain network",
    ],
  },
];
