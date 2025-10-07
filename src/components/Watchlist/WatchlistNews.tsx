"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatTimeAgo } from "@/lib/utils"

type WatchlistNewsProps = {
    symbols: string[]
    maxNews?: number
}

type NewsArticle = {
    id: number
    headline: string
    source: string
    url: string
    datetime: number
    related: string
}

const WatchlistNews = ({ symbols, maxNews = 8 }: WatchlistNewsProps) => {
    const [news, setNews] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            if (!symbols || symbols.length === 0) {
                setLoading(false)
                return
            }

            try {
                // Fetch news from the server
                const response = await fetch('/api/watchlist/news', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ symbols, maxNews }),
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch news')
                }

                const data = await response.json()
                setNews(data.news || [])
            } catch (error) {
                console.error('Error fetching watchlist news:', error)
                setNews([])
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [symbols, maxNews])

    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4 animate-pulse"
                    >
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (!news || news.length === 0) {
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-400">No news available for your watchlist stocks.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.slice(0, maxNews).map((article) => (
                <div
                    key={article.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            {/* Stock Symbol Badge */}
                            {article.related && (
                                <span className="inline-block px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded mb-2">
                                    {article.related}
                                </span>
                            )}

                            {/* Headline */}
                            <h4 className="text-gray-100 font-medium text-sm leading-snug mb-2 line-clamp-2">
                                {article.headline}
                            </h4>

                            {/* Metadata */}
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="font-medium">{article.source}</span>
                                <span>•</span>
                                <span>{formatTimeAgo(article.datetime)}</span>
                            </div>
                        </div>

                        {/* Read More Link */}
                        <Link
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 text-blue-500 hover:text-blue-400 text-xs font-medium whitespace-nowrap transition-colors"
                        >
                            Read more →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WatchlistNews

