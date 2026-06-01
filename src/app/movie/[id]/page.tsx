import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JSX } from 'react';
import { getMovieById } from '@/lib/movie-detail';
import { MovieBadges } from '@/components/MovieBadges';
import { MovieCredits } from '@/components/MovieCredits';
import { MoviePlot } from '@/components/MoviePlot';
import { MoviePoster } from '@/components/MoviePoster';

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) notFound();

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text)"
      >
        ← Back to results
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[260px_1fr]">
        <MoviePoster src={movie.Poster} title={movie.Title} />

        <div className="flex flex-col gap-4">
          <h1 className="text-[1.8rem] leading-tight font-bold">
            {movie.Title}
          </h1>
          <MovieBadges
            year={movie.Year}
            rated={movie.Rated}
            runtime={movie.Runtime}
            imdbRating={movie.imdbRating}
            genre={movie.Genre}
          />
          <MoviePlot plot={movie.Plot} />
          <MovieCredits
            director={movie.Director}
            actors={movie.Actors}
            released={movie.Released}
            country={movie.Country}
          />
        </div>
      </div>
    </main>
  );
}
