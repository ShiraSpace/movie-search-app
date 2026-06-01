import fs from 'fs';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from '../watchlist';
import type { WatchlistItem } from '../watchlist';

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

const INCEPTION: WatchlistItem = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Poster: 'https://example.com/inception.jpg',
};

const INTERSTELLAR: WatchlistItem = {
  imdbID: 'tt0816692',
  Title: 'Interstellar',
  Year: '2014',
  Poster: 'https://example.com/interstellar.jpg',
};

describe('watchlist', () => {
  beforeEach(() => {
    mockFs.readFileSync.mockReturnValue(JSON.stringify([]));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getWatchlist', () => {
    it('returns empty array when watchlist is empty', () => {
      expect(getWatchlist()).toEqual([]);
    });

    it('returns all persisted items', () => {
      mockFs.readFileSync.mockReturnValue(JSON.stringify([INCEPTION]));
      const result = getWatchlist();
      expect(result).toHaveLength(1);
      expect(result[0].imdbID).toBe('tt1375666');
    });
  });

  describe('addToWatchlist', () => {
    it('persists a new movie to the JSON file', () => {
      addToWatchlist(INCEPTION);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('watchlist.json'),
        JSON.stringify([INCEPTION], null, 2)
      );
    });

    it('does not write when the movie is already in the list', () => {
      mockFs.readFileSync.mockReturnValue(JSON.stringify([INCEPTION]));
      addToWatchlist(INCEPTION);
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe('removeFromWatchlist', () => {
    it('removes a movie by imdbID and persists the result', () => {
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify([INCEPTION, INTERSTELLAR])
      );
      removeFromWatchlist('tt1375666');
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('watchlist.json'),
        JSON.stringify([INTERSTELLAR], null, 2)
      );
    });

    it('writes unchanged list when movie is not found', () => {
      mockFs.readFileSync.mockReturnValue(JSON.stringify([INCEPTION]));
      removeFromWatchlist('tt9999999');
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('watchlist.json'),
        JSON.stringify([INCEPTION], null, 2)
      );
    });
  });

  describe('isInWatchlist', () => {
    it('returns true when movie is present', () => {
      mockFs.readFileSync.mockReturnValue(JSON.stringify([INCEPTION]));
      expect(isInWatchlist('tt1375666')).toBe(true);
    });

    it('returns false when movie is absent', () => {
      expect(isInWatchlist('tt9999999')).toBe(false);
    });
  });
});
