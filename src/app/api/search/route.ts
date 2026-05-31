import { searchMovies } from '@/lib/movie-fetcher';

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') ?? '';
  try {
    const results = await searchMovies(query);
    return Response.json(results);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Search failed';
    return Response.json({ error: message }, { status: 500 });
  }
};
