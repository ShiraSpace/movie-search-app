import { getWatchlist, addToWatchlist } from '@/lib/watchlist';
import type { WatchlistItem } from '@/lib/watchlist';

export const GET = async (): Promise<Response> => {
  try {
    const items = getWatchlist();
    return Response.json(items);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to get watchlist';
    return Response.json({ error: message }, { status: 500 });
  }
};

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = (await req.json()) as WatchlistItem;
    if (!body.imdbID || !body.Title) {
      return Response.json(
        { error: 'imdbID and Title are required' },
        { status: 400 }
      );
    }
    addToWatchlist(body);
    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to add to watchlist';
    return Response.json({ error: message }, { status: 500 });
  }
};
