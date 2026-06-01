import { render, screen } from '@testing-library/react';
import { MovieBadges } from './MovieBadges';
import { MOVIE_BADGES_TEST_IDS } from './constants';

const DEFAULT_PROPS = {
  year: '2010',
  rated: 'PG-13',
  runtime: '148 min',
  imdbRating: '8.8',
  genre: 'Action, Adventure, Sci-Fi',
};

describe('MovieBadges', () => {
  beforeEach(() => {
    render(<MovieBadges {...DEFAULT_PROPS} />);
  });

  it('renders the year badge', () => {
    expect(screen.getByTestId(MOVIE_BADGES_TEST_IDS.year)).toHaveTextContent(
      '2010'
    );
  });

  it('renders the rated badge', () => {
    expect(screen.getByTestId(MOVIE_BADGES_TEST_IDS.rated)).toHaveTextContent(
      'PG-13'
    );
  });

  it('renders the runtime badge', () => {
    expect(screen.getByTestId(MOVIE_BADGES_TEST_IDS.runtime)).toHaveTextContent(
      '148 min'
    );
  });

  it('renders the rating badge with star', () => {
    expect(screen.getByTestId(MOVIE_BADGES_TEST_IDS.rating)).toHaveTextContent(
      '★ 8.8'
    );
  });

  it('renders individual genre badges', () => {
    const genres = screen.getAllByTestId(MOVIE_BADGES_TEST_IDS.genre);
    expect(genres).toHaveLength(3);
    expect(genres[0]).toHaveTextContent('Action');
    expect(genres[1]).toHaveTextContent('Adventure');
    expect(genres[2]).toHaveTextContent('Sci-Fi');
  });
});

describe('MovieBadges — N/A values', () => {
  it('omits rated badge when value is N/A', () => {
    render(<MovieBadges {...DEFAULT_PROPS} rated="N/A" />);
    expect(
      screen.queryByTestId(MOVIE_BADGES_TEST_IDS.rated)
    ).not.toBeInTheDocument();
  });

  it('omits rating badge when value is N/A', () => {
    render(<MovieBadges {...DEFAULT_PROPS} imdbRating="N/A" />);
    expect(
      screen.queryByTestId(MOVIE_BADGES_TEST_IDS.rating)
    ).not.toBeInTheDocument();
  });
});
