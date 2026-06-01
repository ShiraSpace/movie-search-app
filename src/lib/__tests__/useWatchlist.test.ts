import { renderHook, act } from '@testing-library/react';
import { useWatchlist } from '../useWatchlist';

const INCEPTION = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Poster: 'N/A',
};

const INTERSTELLAR = {
  imdbID: 'tt0816692',
  Title: 'Interstellar',
  Year: '2014',
  Poster: 'N/A',
};

describe('useWatchlist', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts empty', () => {
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.items).toEqual([]);
  });

  it('reads existing localStorage on mount', () => {
    localStorage.setItem('movie-watchlist', JSON.stringify([INCEPTION]));
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.items).toHaveLength(1);
  });

  it('add persists a movie to localStorage', () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => result.current.add(INCEPTION));
    expect(result.current.items).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('movie-watchlist')!)).toHaveLength(
      1
    );
  });

  it('add does not duplicate an existing movie', () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => result.current.add(INCEPTION));
    act(() => result.current.add(INCEPTION));
    expect(result.current.items).toHaveLength(1);
  });

  it('remove deletes a movie by imdbID', () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => result.current.add(INCEPTION));
    act(() => result.current.add(INTERSTELLAR));
    act(() => result.current.remove('tt1375666'));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].imdbID).toBe('tt0816692');
  });

  it('isIn returns true for an added movie', () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => result.current.add(INCEPTION));
    expect(result.current.isIn('tt1375666')).toBe(true);
  });

  it('isIn returns false for a movie not in the list', () => {
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.isIn('tt9999999')).toBe(false);
  });
});
