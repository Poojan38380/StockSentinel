import { NextResponse } from 'next/server';
import { addToWatchlist, removeFromWatchlist } from '@/lib/actions/watchlist.actions';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { symbol?: string; company?: string };
    const result = await addToWatchlist(body?.symbol || '', body?.company || '');
    const status = result.ok ? 200 : result.error === 'Unauthorized' ? 401 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json()) as { symbol?: string };
    const result = await removeFromWatchlist(body?.symbol || '');
    const status = result.ok ? 200 : result.error === 'Unauthorized' ? 401 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}


