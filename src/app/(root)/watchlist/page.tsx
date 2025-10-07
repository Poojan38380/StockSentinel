import React from 'react'
import { getWatchlistByUserId } from '@/lib/actions/watchlist.actions'
import WatchlistTable from '@/components/Watchlist/WatchlistTable'
import WatchlistNews from '@/components/Watchlist/WatchlistNews'

const WatchlistPage = async () => {
    const watchlist = await getWatchlistByUserId()
    
    // Extract symbols from watchlist
    const symbols = watchlist.map(stock => stock.symbol)

    return (
        <div className="flex min-h-screen home-wrapper">
            <section className="flex flex-col w-full gap-8 home-section">
                <div className="">
                    <h3 className="font-semibold text-2xl text-gray-100 mb-5">Watchlist</h3> 
                    <WatchlistTable initialWatchlist={watchlist} />
                </div>
                
                <div className="">
                    <h3 className="font-semibold text-2xl text-gray-100 mb-5">Latest News</h3>
                    <WatchlistNews symbols={symbols} maxNews={8} />
                </div>
            </section>

        </div>
    )
}

export default WatchlistPage