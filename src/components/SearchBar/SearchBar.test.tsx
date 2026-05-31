import { render, screen, fireEvent } from '@testing-library/react';
import { SEARCH_BAR_CONTENT, SEARCH_BAR_TEST_IDS } from './constants';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const onSearch = jest.fn();

  beforeEach(() => {
    onSearch.mockClear();
    render(<SearchBar onSearch={onSearch} />);
  });

  it('renders the input and search button', () => {
    expect(screen.getByTestId(SEARCH_BAR_TEST_IDS.input)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_BAR_TEST_IDS.button)).toHaveTextContent(
      SEARCH_BAR_CONTENT.buttonLabel
    );
  });

  it('calls onSearch with the trimmed query on submit', () => {
    fireEvent.change(screen.getByTestId(SEARCH_BAR_TEST_IDS.input), {
      target: { value: '  batman  ' },
    });
    fireEvent.submit(screen.getByTestId(SEARCH_BAR_TEST_IDS.form));
    expect(onSearch).toHaveBeenCalledWith('batman');
  });

  it('shows the placeholder text', () => {
    expect(screen.getByTestId(SEARCH_BAR_TEST_IDS.input)).toHaveAttribute(
      'placeholder',
      SEARCH_BAR_CONTENT.placeholder
    );
  });
});
