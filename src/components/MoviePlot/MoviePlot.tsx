import { JSX } from 'react';
import { MOVIE_PLOT_TEST_IDS } from './constants';

interface MoviePlotProps {
  plot: string;
}

export const MoviePlot = ({ plot }: MoviePlotProps): JSX.Element | null => {
  if (!plot || plot === 'N/A') return null;

  return (
    <p
      data-testid={MOVIE_PLOT_TEST_IDS.plot}
      className="border-l-[3px] border-(--border) pl-4 text-[0.95rem] leading-relaxed text-(--text-muted)"
    >
      {plot}
    </p>
  );
};
