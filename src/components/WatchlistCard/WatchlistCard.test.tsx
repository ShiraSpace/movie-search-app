import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WatchlistCard } from './WatchlistCard';
import { WATCHLIST_CARD_TEST_IDS } from './constants';

const ITEM = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Poster: 'N/A',
};

describe('WatchlistCard', () => {
  const onRemove = jest.fn();

  beforeEach(() => {
    render(<WatchlistCard item={ITEM} onRemove={onRemove} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the movie title', () => {
    expect(screen.getByTestId(WATCHLIST_CARD_TEST_IDS.title)).toHaveTextContent(
      'Inception'
    );
  });

  it('renders the movie year', () => {
    expect(screen.getByTestId(WATCHLIST_CARD_TEST_IDS.year)).toHaveTextContent(
      '2010'
    );
  });

  it('shows placeholder when poster is N/A', () => {
    expect(
      screen.getByTestId(WATCHLIST_CARD_TEST_IDS.posterPlaceholder)
    ).toBeInTheDocument();
  });

  it('calls onRemove with imdbID when remove button is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByTestId(WATCHLIST_CARD_TEST_IDS.removeButton));
    expect(onRemove).toHaveBeenCalledWith('tt1375666');
  });
});
