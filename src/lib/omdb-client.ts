const OMDB_BASE_URL = 'https://www.omdbapi.com';

interface OmdbSearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface OmdbSearchResponse {
  Search?: OmdbSearchItem[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export const omdbSearch = async (query: string): Promise<OmdbSearchItem[]> => {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) throw new Error('OMDB_API_KEY is not set');
  const url = `${OMDB_BASE_URL}/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`OMDB request failed: ${response.status}`);
  }
  const data: OmdbSearchResponse = await response.json();
  if (data.Response === 'False') {
    return [];
  }
  return data.Search ?? [];
};
