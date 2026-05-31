'use client';

import Link from 'next/link';
import Image from 'next/image';
import { JSX, useState } from 'react';
import { Movie } from '@/lib/movie-fetcher';
import { MOVIE_CARD_TEST_IDS } from './constants';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps): JSX.Element => {
  const [imgError, setImgError] = useState(false);
  const showPoster = movie.Poster && movie.Poster !== 'N/A' && !imgError;

  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      data-testid={MOVIE_CARD_TEST_IDS.card}
      className="block overflow-hidden rounded-(--radius) border border-(--border) bg-(--surface) transition-all duration-150 hover:-translate-y-[3px] hover:border-(--accent) hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    >
      {showPoster ? (
        <Image
          data-testid={MOVIE_CARD_TEST_IDS.poster}
          src={movie.Poster}
          alt={movie.Title}
          width={160}
          height={240}
          className="block aspect-[2/3] w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          data-testid={MOVIE_CARD_TEST_IDS.posterPlaceholder}
          className="flex aspect-[2/3] w-full items-center justify-center bg-(--border) text-2xl text-(--text-muted)"
        >
          🎬
        </div>
      )}
      <div className="p-3">
        <p
          data-testid={MOVIE_CARD_TEST_IDS.title}
          className="overflow-hidden text-[0.85rem] leading-snug font-semibold text-ellipsis whitespace-nowrap"
        >
          {movie.Title}
        </p>
        <p
          data-testid={MOVIE_CARD_TEST_IDS.year}
          className="mt-0.5 text-[0.78rem] text-(--text-muted)"
        >
          {movie.Year}
        </p>
      </div>
    </Link>
  );
};
