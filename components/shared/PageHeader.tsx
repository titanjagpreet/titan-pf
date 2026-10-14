import { SectionBadge } from "@/components/shared/SectionBadge";

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  badge?: string;
}

/** Top-of-page header. Animates with CSS so it is visible before JavaScript loads. */
export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <header className="mb-8 sm:mb-12">
      {badge ? (
        <div className="enter" style={{ "--i": 0 } as React.CSSProperties}>
          <SectionBadge className="mb-3">{badge}</SectionBadge>
        </div>
      ) : null}
      <h1
        className="enter text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {title}
      </h1>
      {description ? (
        <div
          className="enter mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {description}
        </div>
      ) : null}
      <div
        className="enter mt-5 h-px w-16 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-600"
        style={{ "--i": 3 } as React.CSSProperties}
      />
    </header>
  );
}
