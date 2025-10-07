import React from 'react'
import { getWatchlistByUserId } from '@/lib/actions/watchlist.actions'

const WatchlistPage = async () => {
  const watchlist = await getWatchlistByUserId()

  return (
    <div>WatchlistPage</div>
  )
}

export default WatchlistPage