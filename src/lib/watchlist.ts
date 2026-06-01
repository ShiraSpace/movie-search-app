import fs from 'fs';
import path from 'path';

export interface WatchlistItem {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const DB_PATH = path.join(process.cwd(), 'src/db/watchlist.json');

const readDb = (): WatchlistItem[] => {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as WatchlistItem[];
};

const writeDb = (items: WatchlistItem[]): void => {
  fs.writeFileSync(DB_PATH, JSON.stringify(items, null, 2));
};

export const getWatchlist = (): WatchlistItem[] => readDb();

export const addToWatchlist = (movie: WatchlistItem): void => {
  const items = readDb();
  if (items.some((m) => m.imdbID === movie.imdbID)) return;
  writeDb([...items, movie]);
};

export const removeFromWatchlist = (imdbID: string): void => {
  const items = readDb();
  writeDb(items.filter((m) => m.imdbID !== imdbID));
};

export const isInWatchlist = (imdbID: string): boolean =>
  readDb().some((m) => m.imdbID === imdbID);
