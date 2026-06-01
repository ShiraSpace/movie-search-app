'use client';

import Image from 'next/image';
import { JSX, useState } from 'react';
import { MOVIE_POSTER_TEST_IDS } from './constants';

interface MoviePosterProps {
  src: string;
  title: string;
}

export const MoviePoster = ({ src, title }: MoviePosterProps): JSX.Element => {
  const [imgError, setImgError] = useState(false);
  const showPoster = src && src !== 'N/A' && !imgError;

  if (showPoster) {
    return (
      <Image
        data-testid={MOVIE_POSTER_TEST_IDS.image}
        src={src}
        alt={title}
        width={260}
        height={390}
        className="w-full rounded-(--radius) border border-(--border) shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      data-testid={MOVIE_POSTER_TEST_IDS.placeholder}
      className="flex aspect-[2/3] w-full items-center justify-center rounded-(--radius) border border-(--border) bg-(--border) text-5xl text-(--text-muted)"
    >
      🎬
    </div>
  );
};
