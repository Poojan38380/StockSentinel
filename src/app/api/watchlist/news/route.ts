import { NextRequest, NextResponse } from 'next/server';
import { getNews } from '@/lib/actions/finnhub.actions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbols, maxNews = 8 } = body;

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json(
        { error: 'Symbols array is required' },
        { status: 400 }
      );
    }

    // Fetch news for the provided symbols
    const news = await getNews(symbols);

    // Limit to maxNews articles
    const limitedNews = news.slice(0, maxNews);

    return NextResponse.json({ news: limitedNews });
  } catch (error) {
    console.error('Error in watchlist news API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

