"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import StarButton from "./StarButton"
import { toast } from "sonner"

type WatchlistTableProps = {
  initialWatchlist: StockWithData[]
}

const WatchlistTable = ({ initialWatchlist }: WatchlistTableProps) => {
  const [watchlist, setWatchlist] = useState<StockWithData[]>(initialWatchlist)
  const [loadingStocks, setLoadingStocks] = useState<Set<string>>(new Set())

  const handleWatchlistChange = async (symbol: string, isAdded: boolean) => {
    // Add to loading set
    setLoadingStocks(prev => new Set(prev).add(symbol))

    try {
      const endpoint = "/api/watchlist"
      const response = await fetch(endpoint, {
        method: isAdded ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, company: symbol }),
      })

      if (!response.ok) {
        throw new Error("Failed to update watchlist")
      }

      // If removing from watchlist, filter it out from the table
      if (!isAdded) {
        setWatchlist(prevWatchlist => 
          prevWatchlist.filter(stock => stock.symbol !== symbol)
        )
      }

      toast.success(isAdded ? `Added ${symbol} to watchlist` : `Removed ${symbol} from watchlist`)
    } catch (error) {
      console.error("Error updating watchlist:", error)
      toast.error("Failed to update watchlist")
    } finally {
      // Remove from loading set
      setLoadingStocks(prev => {
        const newSet = new Set(prev)
        newSet.delete(symbol)
        return newSet
      })
    }
  }

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Your watchlist is empty. Start adding stocks to track them here.
        </p>
      </div>
    )
  }

  return (
    <Table className="rounded-lg overflow-hidden border border-gray-400 bg-gray-800 w-full">
      <TableHeader className="bg-gray-600 font-normal">
        <TableRow>
          <TableHead className="w-[80px]">Action</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead className="">Price</TableHead>
          <TableHead className="">Change</TableHead>
          <TableHead className="">Market Cap</TableHead>
          <TableHead className="">P/E Ratio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {watchlist.map((stock) => (
          <TableRow key={stock.symbol}>
            <TableCell className="border-r">
              <StarButton
                symbol={stock.symbol}
                isInWatchlist={true}
                loadingStocks={loadingStocks}
                handleWatchlistChange={handleWatchlistChange}
              />
            </TableCell>
            <TableCell className="font-medium border-r">{stock.company}</TableCell>
            <TableCell className="border-r">{stock.symbol}</TableCell>
            <TableCell className=" font-semibold border-r">
              {stock.priceFormatted || '-'}
            </TableCell>
            <TableCell className={` font-medium border-r ${
              stock.changePercent !== undefined && stock.changePercent !== null
                ? stock.changePercent >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
                : ''
            }`}>
              {stock.changeFormatted || '-'}
            </TableCell>
            <TableCell className="border-r">
              {stock.marketCap || '-'}
            </TableCell>
            <TableCell className="">
              {stock.peRatio || '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default WatchlistTable

