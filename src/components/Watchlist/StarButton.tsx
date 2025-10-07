import { Loader2, Star } from 'lucide-react'
import { Button } from '../ui/button'

//used to add.remove stocks from watchlist
//also shows if the stock is in the watchlist
type StarButtonProps = {
    symbol: string
    isInWatchlist: boolean
    loadingStocks: Set<string>
    handleWatchlistChange: (symbol: string, isInWatchlist: boolean) => void
}

const StarButton = ({ symbol, isInWatchlist, loadingStocks, handleWatchlistChange }: StarButtonProps) => {
    return (
        <Button
            className="rounded-full h-8 w-8 mr-2 cursor-pointer bg-gray-700 hover:bg-gray-800"
            onClick={() => handleWatchlistChange(symbol, !isInWatchlist)}
            disabled={loadingStocks.has(symbol)}
        >
            {loadingStocks.has(symbol) ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
                <Star
                    className={`h-4 w-4 ${isInWatchlist
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-white fill-white'
                        }`}
                />
            )}
        </Button>
    )
}

export default StarButton