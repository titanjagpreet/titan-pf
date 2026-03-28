/**
 * Portfolio projects. Edit entries here. Add imageUrl when you have a cover or screenshot in public/assets/.
 * Omit projectUrl if not deployed. Omit githubUrl if the repo is private (hides the GitHub button). Use nextProjectSlug when you have multiple projects.
 */

export interface TechnicalSection {
  heading: string;
  /** Use double newlines between paragraphs for spacing. */
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  status?: string;
  techStack?: string[];
  challenges?: string[];
  learnings?: string[];
  overview?: string;
  /** Optional tech-blog style sections for the case study page. */
  technicalSections?: TechnicalSection[];
  content?: string;
  featured?: boolean;
  nextProjectSlug?: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  whatItDoes?: string[];
  examples?: { shortcut: string; value: string }[];
  technicalBreakdown?: { extension: string; backend: string };
  challengesDetail?: { title: string; content: string }[];
  whoItsFor?: string;
}

export const projects: Project[] = [
  {
    slug: "lighterpulse",
    imageUrl: "/assets/lp-hero.png",
    title: "LighterPulse",
    description:
      "Analytics and exploration platform for the Lighter.xyz ecosystem, covering dashboards, a block explorer, exchange statistics, multi-venue funding comparison, and protocol announcements. Redis-backed caching and a split between live and cached data paths keep the UI responsive.",
    status: "All Systems Operational",
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
    imageUrl: "/assets/liquidations.png",
    title: "Lighter Liquidations",
    description:
      "Backend service for Lighter.xyz that ingests perpetuals liquidation events over WebSockets, deduplicates noisy replay batches, aggregates notional USD into per-minute buckets in Upstash Redis, and serves a rolling 24 hour liquidation total over HTTP.",
    status: "All Systems Operational",
    featured: true,
    githubUrl: "https://github.com/titanjagpreet/lighter-liquidations",
    nextProjectSlug: "walletx",
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
    technicalBreakdown: {
      extension:
        "The system is split into two independent processes: a long-running worker and a stateless HTTP server. The worker maintains WebSocket connections, processes incoming liquidation events, and updates Redis in real time. The API server reads aggregated data from Redis and exposes it via REST endpoints.",
      backend:
        "WebSocket ingestion is handled using Node.js with persistent connections and reconnection logic. Redis (Upstash REST) is used as a time-series store where each minute acts as a bucket. Deduplication logic ensures idempotent aggregation by filtering repeated events within batch windows. The rolling 24-hour metric is computed dynamically by summing active buckets.",
    },
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
    slug: "walletx",
    imageUrl: "/assets/walletx-hero.png",
    title: "WalletX",
    description:
      "Full-stack FinTech-style wallet demo: P2P transfers, balances, history, and dashboard analytics. MongoDB multi-document transactions enforce ACID semantics so debits and credits stay consistent under concurrency (simulated funds, not real money).",
    status: "All Systems Operational",
    featured: true,
    projectUrl: "https://walletx-coral.vercel.app/",
    githubUrl: "https://github.com/titanjagpreet/walletx",
    nextProjectSlug: "live-cursors",
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
    technicalBreakdown: {
      extension:
        "Frontend is built with React + Vite using TypeScript, with TanStack Query for server state management and Recharts for analytics. The UI is component-driven with Tailwind and Radix, focusing on responsive and accessible FinTech-style design.",
      backend:
        "Backend follows an MVC architecture using Express and Mongoose. Core business logic is implemented in a transfer service that uses MongoDB sessions and multi-document transactions to ensure ACID compliance. JWT handles authentication, while Zod validates all inputs before execution.",
    },
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
    slug: "live-cursors",
    imageUrl: "/assets/live-cursors.png",
    title: "Live Cursors",
    description:
      "Real-time collaborative cursors over WebSockets: throttled pointer streams, broadcast fan-out, and Bézier-smoothed rendering with perfect-cursors and GPU-friendly SVG transforms.",
    status: "All Systems Operational",
    featured: true,
    githubUrl: "https://github.com/titanjagpreet/live-cursors",
    /* Add projectUrl when the client is deployed publicly */
    nextProjectSlug: "lighterpulse",
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
    technicalBreakdown: {
      extension:
        "Frontend is built with React + Vite using TypeScript. WebSocket communication is handled via react-use-websocket, while cursor rendering uses perfect-cursors for Bézier interpolation. SVG + CSS transforms are used for GPU-accelerated rendering and smooth animations.",
      backend:
        "Backend is a stateful WebSocket server built with Node.js and ws. Each client connects with a username, receives a UUID, and sends throttled cursor updates. The server maintains in-memory state and broadcasts updates to all connected clients in real time.",
    },
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
];
