const OMDB_BASE_URL = 'https://www.omdbapi.com';

// Fails loudly at call time so a missing key is always visible in server logs.
const getApiKey = (): string => {
  const key = process.env.OMDB_API_KEY;
  if (!key) {
    console.error(
      '[omdb-client] OMDB_API_KEY is not set — create a local .env.dev file with the key'
    );
    throw new Error('OMDB_API_KEY is not set');
  }
  return key;
};

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

export interface OmdbDetailData {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Country: string;
}

interface OmdbDetailResponse extends OmdbDetailData {
  Response: 'True' | 'False';
  Error?: string;
}

export const omdbGetById = async (
  id: string
): Promise<OmdbDetailData | null> => {
  const apiKey = getApiKey();
  const url = `${OMDB_BASE_URL}/?apikey=${apiKey}&i=${encodeURIComponent(id)}&plot=full`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`OMDB request failed: ${response.status}`);
  }
  const data: OmdbDetailResponse = await response.json();
  if (data.Response === 'False') {
    return null;
  }
  return data;
};

export const omdbSearch = async (query: string): Promise<OmdbSearchItem[]> => {
  const apiKey = getApiKey();
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
