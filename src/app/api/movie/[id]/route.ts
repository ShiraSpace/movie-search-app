import { getMovieById } from '@/lib/movie-detail';

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  const { id } = await params;
  try {
    const movie = await getMovieById(id);
    if (!movie) {
      return Response.json({ error: 'Movie not found' }, { status: 404 });
    }
    return Response.json(movie);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch movie';
    return Response.json({ error: message }, { status: 500 });
  }
};
