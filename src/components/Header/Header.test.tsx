import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('renders the site title', () => {
    const title = screen.getByTestId('header-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('MovieSearch');
  });

  it('renders the site title as a link to /', () => {
    const title = screen.getByTestId('header-title');
    expect(title).toHaveAttribute('href', '/');
  });

  it('renders the watchlist link with correct href', () => {
    const watchlistLink = screen.getByTestId('header-watchlist-link');
    expect(watchlistLink).toBeInTheDocument();
    expect(watchlistLink).toHaveAttribute('href', '/watchlist');
  });
});
