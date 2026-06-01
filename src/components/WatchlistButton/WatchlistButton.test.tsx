import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WatchlistButton } from './WatchlistButton';
import {
  WATCHLIST_BUTTON_TEST_IDS,
  WATCHLIST_BUTTON_LABELS,
} from './constants';

const MOVIE = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Poster: 'N/A',
};

describe('WatchlistButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows add button when movie is not in watchlist', () => {
    render(<WatchlistButton movie={MOVIE} />);
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton)
    ).toHaveTextContent(WATCHLIST_BUTTON_LABELS.add);
  });

  it('shows remove button when movie is already in localStorage', () => {
    localStorage.setItem('movie-watchlist', JSON.stringify([MOVIE]));
    render(<WatchlistButton movie={MOVIE} />);
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    ).toHaveTextContent(WATCHLIST_BUTTON_LABELS.remove);
  });

  it('switches to remove button after clicking add', async () => {
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} />);
    await user.click(screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton));
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    ).toBeInTheDocument();
  });

  it('switches to add button after clicking remove', async () => {
    localStorage.setItem('movie-watchlist', JSON.stringify([MOVIE]));
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} />);
    await user.click(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    );
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton)
    ).toBeInTheDocument();
  });

  it('persists add to localStorage', async () => {
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} />);
    await user.click(screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton));
    const stored = JSON.parse(localStorage.getItem('movie-watchlist')!);
    expect(stored).toHaveLength(1);
    expect(stored[0].imdbID).toBe('tt1375666');
  });

  it('persists remove to localStorage', async () => {
    localStorage.setItem('movie-watchlist', JSON.stringify([MOVIE]));
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} />);
    await user.click(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    );
    const stored = JSON.parse(localStorage.getItem('movie-watchlist')!);
    expect(stored).toHaveLength(0);
  });
});
