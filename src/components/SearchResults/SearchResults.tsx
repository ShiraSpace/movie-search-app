import { JSX } from 'react';
import { MovieCard } from '@/components/MovieCard';
import { Movie } from '@/lib/movie-fetcher';
import { SEARCH_RESULTS_CONTENT, SEARCH_RESULTS_TEST_IDS } from './constants';

interface SearchResultsProps {
  loading: boolean;
  error: string | null;
  searched: boolean;
  results: Movie[];
}

const SKELETON_COUNT = 8;

export const SearchResults = ({
  loading,
  error,
  searched,
  results,
}: SearchResultsProps): JSX.Element => {
  if (loading) {
    return (
      <div
        data-testid={SEARCH_RESULTS_TEST_IDS.skeleton}
        className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-5"
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-(--radius) border border-(--border)"
          >
            <div className="aspect-[2/3] w-full animate-pulse bg-(--surface-hover)" />
            <div className="p-3">
              <div className="mb-1.5 h-3 animate-pulse rounded bg-(--border)" />
              <div className="h-2.5 w-1/2 animate-pulse rounded bg-(--border)" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p
        data-testid={SEARCH_RESULTS_TEST_IDS.error}
        className="text-center text-sm text-(--danger)"
      >
        {error}
      </p>
    );
  }

  if (searched && results.length === 0) {
    return (
      <div
        data-testid={SEARCH_RESULTS_TEST_IDS.emptyState}
        className="flex flex-col items-center gap-2 py-16 text-center"
      >
        <span className="text-5xl opacity-40">🎬</span>
        <p className="font-medium">{SEARCH_RESULTS_CONTENT.emptyTitle}</p>
        <p className="text-sm text-(--text-muted)">
          {SEARCH_RESULTS_CONTENT.emptySubtitle}
        </p>
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <>
        <p
          data-testid={SEARCH_RESULTS_TEST_IDS.label}
          className="mb-5 text-xs text-(--text-muted)"
        >
          <strong className="text-(--text)">{results.length}</strong> results
          found
        </p>
        <div
          data-testid={SEARCH_RESULTS_TEST_IDS.grid}
          className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-5"
        >
          {results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </>
    );
  }

  return <></>;
};
