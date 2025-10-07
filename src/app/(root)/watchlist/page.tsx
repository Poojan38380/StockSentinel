import React from 'react'
import { getWatchlistByUserId } from '@/lib/actions/watchlist.actions'
import WatchlistTable from '@/components/Watchlist/WatchlistTable'

const WatchlistPage = async () => {
    const watchlist = await getWatchlistByUserId()

    return (
        <div className="flex min-h-screen home-wrapper">
            <section className="grid w-full gap-8 home-section">
                <div className="md:col-span-2 xl:col-span-2">
                    <WatchlistTable initialWatchlist={watchlist} />
                </div>
                
            </section>

        </div>
    )
}

export default WatchlistPage