import Link from 'next/link';

export const Header = (): JSX.Element => {
  return (
    <header
      data-testid="header"
      className="sticky top-0 z-[100] flex h-[60px] items-center justify-between px-8"
      style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Link
        href="/"
        data-testid="header-title"
        className="text-xl font-bold tracking-tight"
        style={{ color: 'var(--accent)' }}
      >
        Movie<span style={{ color: 'var(--text)' }}>Search</span>
      </Link>
      <nav>
        <Link
          href="/watchlist"
          data-testid="header-watchlist-link"
          className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Watchlist
        </Link>
      </nav>
    </header>
  );
};
