import { render, screen } from '@testing-library/react';
import { SEARCH_RESULTS_CONTENT, SEARCH_RESULTS_TEST_IDS } from './constants';
import { SearchResults } from './SearchResults';

const MOCK_RESULTS = [
  { imdbID: 'tt0372784', Title: 'Batman Begins', Year: '2005', Poster: 'N/A' },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Poster: 'N/A',
  },
];

describe('SearchResults', () => {
  it('shows the loading skeleton while loading', () => {
    render(
      <SearchResults
        loading={true}
        error={null}
        searched={false}
        results={[]}
      />
    );
    expect(
      screen.getByTestId(SEARCH_RESULTS_TEST_IDS.skeleton)
    ).toBeInTheDocument();
  });

  it('shows the error message when error is set', () => {
    render(
      <SearchResults
        loading={false}
        error="Something went wrong."
        searched={true}
        results={[]}
      />
    );
    expect(screen.getByTestId(SEARCH_RESULTS_TEST_IDS.error)).toHaveTextContent(
      'Something went wrong.'
    );
  });

  it('shows the empty state when searched with no results', () => {
    render(
      <SearchResults
        loading={false}
        error={null}
        searched={true}
        results={[]}
      />
    );
    const empty = screen.getByTestId(SEARCH_RESULTS_TEST_IDS.emptyState);
    expect(empty).toHaveTextContent(SEARCH_RESULTS_CONTENT.emptyTitle);
  });

  it('renders the results grid with a count label', () => {
    render(
      <SearchResults
        loading={false}
        error={null}
        searched={true}
        results={MOCK_RESULTS}
      />
    );
    expect(
      screen.getByTestId(SEARCH_RESULTS_TEST_IDS.grid)
    ).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_RESULTS_TEST_IDS.label)).toHaveTextContent(
      '2 results found'
    );
  });

  it('renders nothing before the first search', () => {
    const { container } = render(
      <SearchResults
        loading={false}
        error={null}
        searched={false}
        results={[]}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
