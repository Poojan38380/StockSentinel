'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function addToWatchlist(symbol: string, company: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) return { ok: false, error: 'Unauthorized' };

    const upperSymbol = (symbol || '').trim().toUpperCase();
    const cleanCompany = (company || '').trim() || upperSymbol;
    if (!upperSymbol) return { ok: false, error: 'Invalid symbol' };

    await connectToDatabase();
    try {
      await Watchlist.create({ userId, symbol: upperSymbol, company: cleanCompany });
    } catch (e: unknown) {
      // Ignore duplicate key errors due to unique index
      if (e && typeof e === 'object' && (e as { code?: number }).code === 11000) {
        return { ok: true };
      }
      throw e;
    }
    return { ok: true };
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return { ok: false, error: 'Failed to add to watchlist' };
  }
}

export async function removeFromWatchlist(symbol: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) return { ok: false, error: 'Unauthorized' };

    const upperSymbol = (symbol || '').trim().toUpperCase();
    if (!upperSymbol) return { ok: false, error: 'Invalid symbol' };

    await connectToDatabase();
    await Watchlist.deleteOne({ userId, symbol: upperSymbol });
    return { ok: true };
  } catch (err) {
    console.error('removeFromWatchlist error:', err);
    return { ok: false, error: 'Failed to remove from watchlist' };
  }
}