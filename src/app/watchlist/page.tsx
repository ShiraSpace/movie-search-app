'use client';

import { JSX, useEffect, useState } from 'react';
import type { WatchlistItem } from '@/lib/watchlist';
import { WatchlistCard } from '@/components/WatchlistCard';

export default function WatchlistPage(): JSX.Element {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/watchlist')
      .then((r) => r.json())
      .then((data: WatchlistItem[]) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (imdbID: string): Promise<void> => {
    await fetch(`/api/watchlist/${imdbID}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  return (
    <main className="mx-auto max-w-[1100px] px-6 pt-10 pb-24">
      <h1 className="text-[1.5rem] font-bold">My Watchlist</h1>
      <p className="mt-1 mb-8 text-[0.9rem] text-(--text-muted)">
        {loading
          ? 'Loading…'
          : `${items.length} saved ${items.length === 1 ? 'movie' : 'movies'}`}
      </p>

      {!loading && items.length === 0 && (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl opacity-40">🎬</div>
          <h2 className="mb-2 text-[1.1rem] font-semibold">
            Your watchlist is empty
          </h2>
          <p className="text-[0.9rem] text-(--text-muted)">
            Search for movies and add them here
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
          {items.map((item) => (
            <WatchlistCard
              key={item.imdbID}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </main>
  );
}
