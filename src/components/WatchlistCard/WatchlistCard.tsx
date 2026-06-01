'use client';

import Image from 'next/image';
import { JSX, useState } from 'react';
import type { WatchlistItem } from '@/lib/useWatchlist';
import { WATCHLIST_CARD_TEST_IDS } from './constants';

interface WatchlistCardProps {
  item: WatchlistItem;
  onRemove: (imdbID: string) => void;
}

export const WatchlistCard = ({
  item,
  onRemove,
}: WatchlistCardProps): JSX.Element => {
  const [imgError, setImgError] = useState(false);
  const showPoster = item.Poster && item.Poster !== 'N/A' && !imgError;

  return (
    <div
      data-testid={WATCHLIST_CARD_TEST_IDS.card}
      className="overflow-hidden rounded-(--radius) border border-(--border) bg-(--surface)"
    >
      {showPoster ? (
        <Image
          data-testid={WATCHLIST_CARD_TEST_IDS.poster}
          src={item.Poster}
          alt={item.Title}
          width={200}
          height={300}
          className="block aspect-[2/3] w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          data-testid={WATCHLIST_CARD_TEST_IDS.posterPlaceholder}
          className="flex aspect-[2/3] w-full items-center justify-center bg-(--border) text-2xl text-(--text-muted)"
        >
          🎬
        </div>
      )}
      <div className="flex items-start justify-between gap-2 p-3">
        <div>
          <p
            data-testid={WATCHLIST_CARD_TEST_IDS.title}
            className="text-[0.88rem] leading-snug font-semibold"
          >
            {item.Title}
          </p>
          <p
            data-testid={WATCHLIST_CARD_TEST_IDS.year}
            className="mt-0.5 text-[0.78rem] text-(--text-muted)"
          >
            {item.Year}
          </p>
        </div>
        <button
          data-testid={WATCHLIST_CARD_TEST_IDS.removeButton}
          onClick={() => onRemove(item.imdbID)}
          className="h-[34px] cursor-pointer rounded-(--radius) border border-transparent bg-(--danger-dim) px-[0.9rem] text-[0.82rem] font-semibold text-(--danger) transition-colors hover:bg-(--danger) hover:text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
