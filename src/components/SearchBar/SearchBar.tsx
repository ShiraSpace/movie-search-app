'use client';

import { JSX, useState, FormEvent } from 'react';
import { SEARCH_BAR_CONTENT, SEARCH_BAR_TEST_IDS } from './constants';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps): JSX.Element => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form
      data-testid={SEARCH_BAR_TEST_IDS.form}
      onSubmit={handleSubmit}
      className="mx-auto mt-7 flex max-w-xl gap-2.5"
    >
      <input
        data-testid={SEARCH_BAR_TEST_IDS.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={SEARCH_BAR_CONTENT.placeholder}
        className="h-11 flex-1 rounded-(--radius) border border-(--border) bg-(--surface) px-4 text-[0.95rem] text-(--text) transition-colors outline-none placeholder:text-(--text-muted) focus:border-(--accent)"
      />
      <button
        data-testid={SEARCH_BAR_TEST_IDS.button}
        type="submit"
        className="h-11 cursor-pointer rounded-(--radius) bg-(--accent) px-5 text-sm font-semibold text-[#111] transition-opacity hover:opacity-90 active:scale-[0.97]"
      >
        {SEARCH_BAR_CONTENT.buttonLabel}
      </button>
    </form>
  );
};
