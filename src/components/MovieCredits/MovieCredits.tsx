import { JSX } from 'react';
import { MOVIE_CREDITS_TEST_IDS } from './constants';

interface MovieCreditsProps {
  director: string;
  actors: string;
  released: string;
  country: string;
}

const CreditRow = ({
  label,
  value,
  testId,
}: {
  label: string;
  value: string;
  testId: string;
}): JSX.Element | null => {
  if (!value || value === 'N/A') return null;

  return (
    <div className="flex gap-2 text-sm" data-testid={testId}>
      <dt className="min-w-[80px] text-(--text-muted)">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
};

export const MovieCredits = ({
  director,
  actors,
  released,
  country,
}: MovieCreditsProps): JSX.Element => (
  <dl className="flex flex-col gap-2">
    <CreditRow
      label="Director"
      value={director}
      testId={MOVIE_CREDITS_TEST_IDS.director}
    />
    <CreditRow
      label="Stars"
      value={actors}
      testId={MOVIE_CREDITS_TEST_IDS.actors}
    />
    <CreditRow
      label="Released"
      value={released}
      testId={MOVIE_CREDITS_TEST_IDS.released}
    />
    <CreditRow
      label="Country"
      value={country}
      testId={MOVIE_CREDITS_TEST_IDS.country}
    />
  </dl>
);
