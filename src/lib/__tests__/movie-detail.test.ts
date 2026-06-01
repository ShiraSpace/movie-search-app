import { getMovieById } from '../movie-detail';

const MOCK_OMDB_DETAIL = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Rated: 'PG-13',
  Released: '16 Jul 2010',
  Runtime: '148 min',
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'Christopher Nolan',
  Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
  Plot: 'A thief who steals corporate secrets through dream-sharing technology.',
  Poster: 'https://poster.jpg',
  imdbRating: '8.8',
  Country: 'United States, United Kingdom',
  Response: 'True',
};

describe('getMovieById', () => {
  beforeEach(() => {
    process.env.OMDB_API_KEY = 'test-key';
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns movie detail for a valid imdbID', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_OMDB_DETAIL,
    });

    const result = await getMovieById('tt1375666');

    expect(result).toMatchObject({
      imdbID: 'tt1375666',
      Title: 'Inception',
      Year: '2010',
      Rated: 'PG-13',
      Runtime: '148 min',
      Genre: 'Action, Adventure, Sci-Fi',
      Director: 'Christopher Nolan',
      imdbRating: '8.8',
    });
  });

  it('returns null when OMDB finds no movie', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Response: 'False', Error: 'Movie not found!' }),
    });

    const result = await getMovieById('tt_not_found');
    expect(result).toBeNull();
  });

  it('returns null without calling fetch for empty id', async () => {
    const result = await getMovieById('');
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
