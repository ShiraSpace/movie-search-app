import { JSX } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { SEARCH_HERO_CONTENT, SEARCH_HERO_TEST_IDS } from './constants';

interface SearchHeroProps {
  onSearch: (query: string) => void;
}

export const SearchHero = ({ onSearch }: SearchHeroProps): JSX.Element => (
  <div
    data-testid={SEARCH_HERO_TEST_IDS.container}
    className="pt-12 pb-10 text-center"
  >
    <h1 data-testid={SEARCH_HERO_TEST_IDS.title} className="text-3xl font-bold">
      {SEARCH_HERO_CONTENT.title}
    </h1>
    <p
      data-testid={SEARCH_HERO_TEST_IDS.subtitle}
      className="mt-1.5 text-[0.95rem] text-(--text-muted)"
    >
      {SEARCH_HERO_CONTENT.subtitle}
    </p>
    <SearchBar onSearch={onSearch} />
  </div>
);
