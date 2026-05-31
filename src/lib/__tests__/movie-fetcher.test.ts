import { searchMovies } from '../movie-fetcher';

const MOCK_OMDB_RESPONSE = {
  Search: [
    {
      imdbID: 'tt0372784',
      Title: 'Batman Begins',
      Year: '2005',
      Poster: 'https://p1.jpg',
      Type: 'movie',
    },
    {
      imdbID: 'tt0468569',
      Title: 'The Dark Knight',
      Year: '2008',
      Poster: 'https://p2.jpg',
      Type: 'movie',
    },
  ],
  totalResults: '2',
  Response: 'True',
};

describe('searchMovies', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns an array of movie results from OMDB', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_OMDB_RESPONSE,
    });

    const results = await searchMovies('batman');

    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({
      imdbID: 'tt0372784',
      Title: 'Batman Begins',
      Year: '2005',
    });
  });

  it('returns empty array when OMDB finds no results', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Response: 'False', Error: 'Movie not found!' }),
    });

    const results = await searchMovies('xyzxyzxyz123');
    expect(results).toEqual([]);
  });

  it('returns empty array without calling fetch for empty query', async () => {
    const results = await searchMovies('');
    expect(global.fetch).not.toHaveBeenCalled();
    expect(results).toEqual([]);
  });
});
