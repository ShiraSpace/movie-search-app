'use client';

import { JSX, useState } from 'react';
import type { WatchlistItem } from '@/lib/watchlist';
import {
  WATCHLIST_BUTTON_TEST_IDS,
  WATCHLIST_BUTTON_LABELS,
} from './constants';

interface WatchlistButtonProps {
  movie: WatchlistItem;
  initialInWatchlist: boolean;
}

export const WatchlistButton = ({
  movie,
  initialInWatchlist,
}: WatchlistButtonProps): JSX.Element => {
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);

  const handleAdd = async (): Promise<void> => {
    await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    setInWatchlist(true);
  };

  const handleRemove = async (): Promise<void> => {
    await fetch(`/api/watchlist/${movie.imdbID}`, { method: 'DELETE' });
    setInWatchlist(false);
  };

  if (inWatchlist) {
    return (
      <button
        data-testid={WATCHLIST_BUTTON_TEST_IDS.removeButton}
        onClick={handleRemove}
        className="inline-flex h-11 w-fit cursor-pointer items-center justify-center rounded-(--radius) border border-transparent bg-(--danger-dim) px-5 text-[0.9rem] font-semibold text-(--danger) transition-colors hover:bg-(--danger) hover:text-white"
      >
        {WATCHLIST_BUTTON_LABELS.remove}
      </button>
    );
  }

  return (
    <button
      data-testid={WATCHLIST_BUTTON_TEST_IDS.addButton}
      onClick={handleAdd}
      className="inline-flex h-11 w-fit cursor-pointer items-center justify-center rounded-(--radius) bg-(--accent) px-5 text-[0.9rem] font-semibold text-[#111] transition-opacity hover:opacity-90"
    >
      {WATCHLIST_BUTTON_LABELS.add}
    </button>
  );
};
