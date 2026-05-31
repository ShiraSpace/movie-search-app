import { render, screen, fireEvent } from '@testing-library/react';
import { SEARCH_BAR_TEST_IDS } from '@/components/SearchBar/constants';
import { SEARCH_HERO_CONTENT, SEARCH_HERO_TEST_IDS } from './constants';
import { SearchHero } from './SearchHero';

describe('SearchHero', () => {
  const onSearch = jest.fn();

  beforeEach(() => {
    onSearch.mockClear();
    render(<SearchHero onSearch={onSearch} />);
  });

  it('renders the title and subtitle', () => {
    expect(screen.getByTestId(SEARCH_HERO_TEST_IDS.title)).toHaveTextContent(
      SEARCH_HERO_CONTENT.title
    );
    expect(screen.getByTestId(SEARCH_HERO_TEST_IDS.subtitle)).toHaveTextContent(
      SEARCH_HERO_CONTENT.subtitle
    );
  });

  it('calls onSearch when the search bar is submitted', () => {
    fireEvent.change(screen.getByTestId(SEARCH_BAR_TEST_IDS.input), {
      target: { value: 'inception' },
    });
    fireEvent.submit(screen.getByTestId(SEARCH_BAR_TEST_IDS.form));
    expect(onSearch).toHaveBeenCalledWith('inception');
  });
});
