'use client';

import { useState } from 'react';
import { Movie } from './movie-fetcher';

interface UseMovieSearch {
  results: Movie[];
  loading: boolean;
  error: string | null;
  searched: boolean;
  handleSearch: (query: string) => Promise<void>;
}

export const useMovieSearch = (): UseMovieSearch => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query: string): Promise<void> => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      setResults(await res.json());
    } catch {
      setError('Something went wrong. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searched, handleSearch };
};
