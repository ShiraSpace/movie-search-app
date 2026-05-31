import { omdbSearch } from './omdb-client';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];
  return omdbSearch(query);
};
