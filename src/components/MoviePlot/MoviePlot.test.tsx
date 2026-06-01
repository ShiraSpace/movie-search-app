import { render, screen } from '@testing-library/react';
import { MoviePlot } from './MoviePlot';
import { MOVIE_PLOT_TEST_IDS } from './constants';

describe('MoviePlot', () => {
  it('renders the plot text', () => {
    render(<MoviePlot plot="A thief who steals corporate secrets." />);
    expect(screen.getByTestId(MOVIE_PLOT_TEST_IDS.plot)).toHaveTextContent(
      'A thief who steals corporate secrets.'
    );
  });

  it('renders nothing when plot is N/A', () => {
    render(<MoviePlot plot="N/A" />);
    expect(
      screen.queryByTestId(MOVIE_PLOT_TEST_IDS.plot)
    ).not.toBeInTheDocument();
  });

  it('renders nothing when plot is empty', () => {
    render(<MoviePlot plot="" />);
    expect(
      screen.queryByTestId(MOVIE_PLOT_TEST_IDS.plot)
    ).not.toBeInTheDocument();
  });
});
