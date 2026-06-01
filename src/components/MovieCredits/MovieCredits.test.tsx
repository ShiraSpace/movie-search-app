import { render, screen } from '@testing-library/react';
import { MovieCredits } from './MovieCredits';
import { MOVIE_CREDITS_TEST_IDS } from './constants';

const DEFAULT_PROPS = {
  director: 'Christopher Nolan',
  actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
  released: '16 Jul 2010',
  country: 'United States',
};

describe('MovieCredits', () => {
  beforeEach(() => {
    render(<MovieCredits {...DEFAULT_PROPS} />);
  });

  it('renders director', () => {
    expect(
      screen.getByTestId(MOVIE_CREDITS_TEST_IDS.director)
    ).toHaveTextContent('Christopher Nolan');
  });

  it('renders actors', () => {
    expect(screen.getByTestId(MOVIE_CREDITS_TEST_IDS.actors)).toHaveTextContent(
      'Leonardo DiCaprio'
    );
  });

  it('renders released date', () => {
    expect(
      screen.getByTestId(MOVIE_CREDITS_TEST_IDS.released)
    ).toHaveTextContent('16 Jul 2010');
  });

  it('renders country', () => {
    expect(
      screen.getByTestId(MOVIE_CREDITS_TEST_IDS.country)
    ).toHaveTextContent('United States');
  });
});

describe('MovieCredits — N/A values', () => {
  it('omits a row when its value is N/A', () => {
    render(<MovieCredits {...DEFAULT_PROPS} director="N/A" />);
    expect(
      screen.queryByTestId(MOVIE_CREDITS_TEST_IDS.director)
    ).not.toBeInTheDocument();
  });
});
