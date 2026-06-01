'use client';

import { JSX } from 'react';
import { useWatchlist } from '@/lib/useWatchlist';
import type { WatchlistItem } from '@/lib/useWatchlist';
import {
  WATCHLIST_BUTTON_TEST_IDS,
  WATCHLIST_BUTTON_LABELS,
} from './constants';

interface WatchlistButtonProps {
  movie: WatchlistItem;
}

export const WatchlistButton = ({
  movie,
}: WatchlistButtonProps): JSX.Element => {
  const { add, remove, isIn } = useWatchlist();
  const inWatchlist = isIn(movie.imdbID);

  if (inWatchlist) {
    return (
      <button
        data-testid={WATCHLIST_BUTTON_TEST_IDS.removeButton}
        onClick={() => remove(movie.imdbID)}
        className="inline-flex h-11 w-fit cursor-pointer items-center justify-center rounded-(--radius) border border-transparent bg-(--danger-dim) px-5 text-[0.9rem] font-semibold text-(--danger) transition-colors hover:bg-(--danger) hover:text-white"
      >
        {WATCHLIST_BUTTON_LABELS.remove}
      </button>
    );
  }

  return (
    <button
      data-testid={WATCHLIST_BUTTON_TEST_IDS.addButton}
      onClick={() => add(movie)}
      className="inline-flex h-11 w-fit cursor-pointer items-center justify-center rounded-(--radius) bg-(--accent) px-5 text-[0.9rem] font-semibold text-[#111] transition-opacity hover:opacity-90"
    >
      {WATCHLIST_BUTTON_LABELS.add}
    </button>
  );
};
