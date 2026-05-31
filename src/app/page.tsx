'use client';

import { JSX } from 'react';
import { SearchHero } from '@/components/SearchHero';
import { SearchResults } from '@/components/SearchResults';
import { useMovieSearch } from '@/lib/useMovieSearch';

export default function Home(): JSX.Element {
  const { results, loading, error, searched, handleSearch } = useMovieSearch();

  return (
    <main className="min-h-screen">
      <SearchHero onSearch={handleSearch} />
      <div className="px-8 pb-12">
        <SearchResults
          loading={loading}
          error={error}
          searched={searched}
          results={results}
        />
      </div>
    </main>
  );
}
