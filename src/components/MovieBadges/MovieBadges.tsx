import { JSX } from 'react';
import { MOVIE_BADGES_TEST_IDS } from './constants';

interface MovieBadgesProps {
  year: string;
  rated: string;
  runtime: string;
  imdbRating: string;
  genre: string;
}

export const MovieBadges = ({
  year,
  rated,
  runtime,
  imdbRating,
  genre,
}: MovieBadgesProps): JSX.Element => {
  const genres = genre && genre !== 'N/A' ? genre.split(', ') : [];

  return (
    <div className="flex flex-wrap gap-2">
      <span
        data-testid={MOVIE_BADGES_TEST_IDS.year}
        className="rounded-full bg-(--border) px-2.5 py-0.5 text-[0.78rem] font-medium text-(--text-muted)"
      >
        {year}
      </span>
      {rated && rated !== 'N/A' && (
        <span
          data-testid={MOVIE_BADGES_TEST_IDS.rated}
          className="rounded-full bg-(--border) px-2.5 py-0.5 text-[0.78rem] font-medium text-(--text-muted)"
        >
          {rated}
        </span>
      )}
      {runtime && runtime !== 'N/A' && (
        <span
          data-testid={MOVIE_BADGES_TEST_IDS.runtime}
          className="rounded-full bg-(--border) px-2.5 py-0.5 text-[0.78rem] font-medium text-(--text-muted)"
        >
          {runtime}
        </span>
      )}
      {imdbRating && imdbRating !== 'N/A' && (
        <span
          data-testid={MOVIE_BADGES_TEST_IDS.rating}
          className="rounded-full bg-(--accent-dim) px-2.5 py-0.5 text-[0.78rem] font-medium text-(--accent)"
        >
          ★ {imdbRating}
        </span>
      )}
      {genres.map((g) => (
        <span
          key={g}
          data-testid={MOVIE_BADGES_TEST_IDS.genre}
          className="rounded-full bg-(--border) px-2.5 py-0.5 text-[0.78rem] font-medium text-(--text-muted)"
        >
          {g}
        </span>
      ))}
    </div>
  );
};
