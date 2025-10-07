'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getStockQuote, getStockFinancials } from '@/lib/actions/finnhub.actions';

export async function getWatchlistByUserId(): Promise<StockWithData[]> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    
    if (!userId) return [];

    await connectToDatabase();
    
    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();
    
    // Fetch quote and financial data for all stocks in parallel
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        try {
          const [quote, financials] = await Promise.all([
            getStockQuote(item.symbol),
            getStockFinancials(item.symbol),
          ]);

          // Format the data
          const currentPrice = quote?.c;
          const changePercent = quote?.dp;
          const marketCap = financials?.marketCap;
          const peRatio = financials?.peRatio;

          // Format price
          const priceFormatted = currentPrice !== undefined && currentPrice !== null 
            ? `$${currentPrice.toFixed(2)}` 
            : '-';

          // Format change percent with color indicator
          const changeFormatted = changePercent !== undefined && changePercent !== null 
            ? `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%` 
            : '-';

          // Format market cap (Finnhub returns in millions, convert to B/T)
          const marketCapFormatted = marketCap !== undefined && marketCap !== null
            ? marketCap >= 1_000_000 
              ? `$${(marketCap / 1_000_000).toFixed(2)}T`
              : marketCap >= 1_000
                ? `$${(marketCap / 1_000).toFixed(2)}B`
                : `$${marketCap.toFixed(2)}M`
            : '-';

          // Format P/E ratio
          const peRatioFormatted = peRatio !== undefined && peRatio !== null 
            ? peRatio.toFixed(2) 
            : '-';

          return {
            userId: item.userId,
            symbol: item.symbol,
            company: item.company,
            addedAt: item.addedAt,
            currentPrice,
            changePercent,
            priceFormatted,
            changeFormatted,
            marketCap: marketCapFormatted,
            peRatio: peRatioFormatted,
          };
        } catch (error) {
          console.error(`Error enriching data for ${item.symbol}:`, error);
          // Return basic data if enrichment fails
          return {
            userId: item.userId,
            symbol: item.symbol,
            company: item.company,
            addedAt: item.addedAt,
          };
        }
      })
    );

    return enrichedItems;
  } catch (err) {
    console.error('getWatchlistByUserId error:', err);
    return [];
  }
}

export async function getWatchlistSymbolsByUserId(): Promise<string[]> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    
    if (!userId) return [];

    await connectToDatabase();
    
    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByUserId error:', err);
    return [];
  }
}

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