import Link from 'next/link';
import { JSX } from 'react';
import { HEADER_CONTENT, HEADER_TEST_IDS } from './constants';

export const Header = (): JSX.Element => {
  return (
    <header
      data-testid={HEADER_TEST_IDS.header}
      className="sticky top-0 z-100 flex h-15 items-center justify-between border-b border-(--border) bg-(--surface) px-8"
    >
      <Link
        href={HEADER_CONTENT.titleHref}
        data-testid={HEADER_TEST_IDS.title}
        className="text-xl font-bold tracking-tight text-(--accent)"
      >
        {HEADER_CONTENT.titlePrefix}
        <span className="text-(--text)">{HEADER_CONTENT.titleSuffix}</span>
      </Link>
      <nav>
        <Link
          href={HEADER_CONTENT.watchlistHref}
          data-testid={HEADER_TEST_IDS.watchlistLink}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-(--text-muted) transition-colors"
        >
          {HEADER_CONTENT.watchlistLabel}
        </Link>
      </nav>
    </header>
  );
};
