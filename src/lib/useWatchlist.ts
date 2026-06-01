'use client';

import { useCallback, useSyncExternalStore } from 'react';

export interface WatchlistItem {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const STORAGE_KEY = 'movie-watchlist';

// Module-level cache keeps snapshots referentially stable across renders
let cachedRaw = '';
let cachedItems: WatchlistItem[] = [];

const getSnapshot = (): WatchlistItem[] => {
  const raw = localStorage.getItem(STORAGE_KEY) ?? '[]';
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedItems = JSON.parse(raw) as WatchlistItem[];
  }
  return cachedItems;
};

const SERVER_SNAPSHOT: WatchlistItem[] = [];
const getServerSnapshot = (): WatchlistItem[] => SERVER_SNAPSHOT;

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const writeStorage = (items: WatchlistItem[]): void => {
  const raw = JSON.stringify(items);
  cachedRaw = raw;
  cachedItems = items;
  localStorage.setItem(STORAGE_KEY, raw);
  window.dispatchEvent(new Event('storage'));
};

interface UseWatchlist {
  items: WatchlistItem[];
  add: (movie: WatchlistItem) => void;
  remove: (imdbID: string) => void;
  isIn: (imdbID: string) => boolean;
}

export const useWatchlist = (): UseWatchlist => {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((movie: WatchlistItem): void => {
    const current = getSnapshot();
    if (current.some((m) => m.imdbID === movie.imdbID)) return;
    writeStorage([...current, movie]);
  }, []);

  const remove = useCallback((imdbID: string): void => {
    writeStorage(getSnapshot().filter((m) => m.imdbID !== imdbID));
  }, []);

  const isIn = useCallback(
    (imdbID: string): boolean => items.some((m) => m.imdbID === imdbID),
    [items]
  );

  return { items, add, remove, isIn };
};
