import { render, screen } from '@testing-library/react';
import { MOVIE_CARD_TEST_IDS } from './constants';
import { MovieCard } from './MovieCard';

const MOCK_MOVIE = {
  imdbID: 'tt0372784',
  Title: 'Batman Begins',
  Year: '2005',
  Poster: 'https://poster.jpg',
};

describe('MovieCard', () => {
  beforeEach(() => {
    render(<MovieCard movie={MOCK_MOVIE} />);
  });

  it('renders the movie title and year', () => {
    expect(screen.getByTestId(MOVIE_CARD_TEST_IDS.title)).toHaveTextContent(
      'Batman Begins'
    );
    expect(screen.getByTestId(MOVIE_CARD_TEST_IDS.year)).toHaveTextContent(
      '2005'
    );
  });

  it('renders a poster image when Poster is a valid URL', () => {
    expect(screen.getByTestId(MOVIE_CARD_TEST_IDS.poster)).toBeInTheDocument();
    expect(
      screen.queryByTestId(MOVIE_CARD_TEST_IDS.posterPlaceholder)
    ).not.toBeInTheDocument();
  });

  it('links to the movie detail page', () => {
    expect(screen.getByTestId(MOVIE_CARD_TEST_IDS.card)).toHaveAttribute(
      'href',
      '/movie/tt0372784'
    );
  });
});

describe('MovieCard — no poster', () => {
  beforeEach(() => {
    render(<MovieCard movie={{ ...MOCK_MOVIE, Poster: 'N/A' }} />);
  });

  it('renders the placeholder when Poster is N/A', () => {
    expect(
      screen.getByTestId(MOVIE_CARD_TEST_IDS.posterPlaceholder)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(MOVIE_CARD_TEST_IDS.poster)
    ).not.toBeInTheDocument();
  });
});
