import { render, screen, fireEvent } from '@testing-library/react';
import { MoviePoster } from './MoviePoster';
import { MOVIE_POSTER_TEST_IDS } from './constants';

describe('MoviePoster', () => {
  describe('with a valid poster URL', () => {
    beforeEach(() => {
      render(<MoviePoster src="https://poster.jpg" title="Inception" />);
    });

    it('renders the poster image', () => {
      expect(
        screen.getByTestId(MOVIE_POSTER_TEST_IDS.image)
      ).toBeInTheDocument();
    });

    it('shows placeholder when image fails to load', () => {
      fireEvent.error(screen.getByTestId(MOVIE_POSTER_TEST_IDS.image));
      expect(
        screen.getByTestId(MOVIE_POSTER_TEST_IDS.placeholder)
      ).toBeInTheDocument();
    });
  });

  describe('with N/A poster', () => {
    beforeEach(() => {
      render(<MoviePoster src="N/A" title="Unknown" />);
    });

    it('renders the placeholder', () => {
      expect(
        screen.getByTestId(MOVIE_POSTER_TEST_IDS.placeholder)
      ).toBeInTheDocument();
    });
  });
});
