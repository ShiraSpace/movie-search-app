import { removeFromWatchlist } from '@/lib/watchlist';

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  try {
    const { id } = await params;
    removeFromWatchlist(id);
    return Response.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to remove from watchlist';
    return Response.json({ error: message }, { status: 500 });
  }
};
