import { omdbGetById, OmdbDetailData } from './omdb-client';

export type MovieDetail = OmdbDetailData;

export const getMovieById = async (id: string): Promise<MovieDetail | null> => {
  if (!id.trim()) return null;
  return omdbGetById(id);
};
