import { render, screen } from '@testing-library/react';
import { HEADER_CONTENT, HEADER_TEST_IDS } from './constants';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('renders the site title', () => {
    const title = screen.getByTestId(HEADER_TEST_IDS.title);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      `${HEADER_CONTENT.titlePrefix}${HEADER_CONTENT.titleSuffix}`
    );
  });

  it('renders the site title as a link to /', () => {
    const title = screen.getByTestId(HEADER_TEST_IDS.title);
    expect(title).toHaveAttribute('href', HEADER_CONTENT.titleHref);
  });

  it('renders the watchlist link with correct href', () => {
    const watchlistLink = screen.getByTestId(HEADER_TEST_IDS.watchlistLink);
    expect(watchlistLink).toBeInTheDocument();
    expect(watchlistLink).toHaveAttribute('href', HEADER_CONTENT.watchlistHref);
  });
});
