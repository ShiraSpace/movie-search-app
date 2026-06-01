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
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('shows add button when not in watchlist', () => {
    render(<WatchlistButton movie={MOVIE} initialInWatchlist={false} />);
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton)
    ).toHaveTextContent(WATCHLIST_BUTTON_LABELS.add);
  });

  it('shows remove button when already in watchlist', () => {
    render(<WatchlistButton movie={MOVIE} initialInWatchlist={true} />);
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    ).toHaveTextContent(WATCHLIST_BUTTON_LABELS.remove);
  });

  it('switches to remove button after adding', async () => {
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} initialInWatchlist={false} />);
    await user.click(screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton));
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    ).toBeInTheDocument();
  });

  it('switches to add button after removing', async () => {
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} initialInWatchlist={true} />);
    await user.click(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    );
    expect(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton)
    ).toBeInTheDocument();
  });

  it('calls POST /api/watchlist when adding', async () => {
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} initialInWatchlist={false} />);
    await user.click(screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.addButton));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/watchlist',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('calls DELETE /api/watchlist/:id when removing', async () => {
    const user = userEvent.setup();
    render(<WatchlistButton movie={MOVIE} initialInWatchlist={true} />);
    await user.click(
      screen.getByTestId(WATCHLIST_BUTTON_TEST_IDS.removeButton)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/watchlist/tt1375666',
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
