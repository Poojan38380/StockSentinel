"use client"

import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import {Button} from "@/components/ui/button";
import {Loader2, TrendingUp} from "lucide-react";
import Link from "next/link";
import {searchStocks} from "@/lib/actions/finnhub.actions";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import StarButton from "../Watchlist/StarButton";

export default function SearchCommand({ renderAs = 'button', label = 'Add stock', initialStocks }: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);
  const [watchlistSymbols, setWatchlistSymbols] = useState<Set<string>>(new Set());
  const [loadingStocks, setLoadingStocks] = useState<Set<string>>(new Set());

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Load user's watchlist symbols on mount
  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const res = await fetch('/api/watchlist', { method: 'GET' });
        if (!res.ok) return;
        const data = (await res.json()) as { ok?: boolean; symbols?: string[] };
        const set = new Set((data.symbols || []).map((s) => (s || '').toUpperCase()));
        setWatchlistSymbols(set);
        // Ensure currently displayed stocks reflect latest watchlist
        setStocks((prev) =>
          (prev || []).map((s) => ({ ...s, isInWatchlist: set.has((s.symbol || '').toUpperCase()) }))
        );
      } catch {
        // ignore
      }
    };
    loadWatchlist();
  }, [])

  const handleSearch = async () => {
    if(!isSearchMode) return setStocks(initialStocks);

    setLoading(true)
    try {
        const results = await searchStocks(searchTerm.trim());
        // Apply watchlist status based on loaded symbols
        setStocks(results.map((s) => ({
          ...s,
          isInWatchlist: watchlistSymbols.has((s.symbol || '').toUpperCase()),
        })));
    } catch {
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  }

  const handleWatchlistChange = async (symbol: string, isAdded: boolean) => {
    // Add to loading set
    setLoadingStocks(prev => new Set(prev).add(symbol));

    try {
      const endpoint = "/api/watchlist";
      const response = await fetch(endpoint, {
        method: isAdded ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, company: symbol }),
      });

      if (!response.ok) {
        throw new Error("Failed to update watchlist");
      }

      // Update the stocks state
      setStocks(prevStocks => 
        prevStocks.map(stock => 
          stock.symbol === symbol 
            ? { ...stock, isInWatchlist: isAdded }
            : stock
        )
      );

      // Update local watchlist symbols set
      setWatchlistSymbols((prev) => {
        const next = new Set(prev);
        const up = (symbol || '').toUpperCase();
        if (isAdded) next.add(up); else next.delete(up);
        return next;
      });

      toast.success(isAdded ? `Added ${symbol} to watchlist` : `Removed ${symbol} from watchlist`);
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error("Failed to update watchlist");
    } finally {
      // Remove from loading set
      setLoadingStocks(prev => {
        const newSet = new Set(prev);
        newSet.delete(symbol);
        return newSet;
      });
    }
  }

  return (
    <>
      {renderAs === 'text' ? (
          <span onClick={() => setOpen(true)} className="search-text">
            {label}
          </span>
      ): (
          <Button onClick={() => setOpen(true)} className="search-btn">
            {label}
          </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog">
        <div className="search-field">
          <CommandInput value={searchTerm} onValueChange={setSearchTerm} placeholder="Search stocks..." className="search-input" />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
              <CommandEmpty className="search-list-empty">Loading stocks...</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
              <div className="search-list-indicator">
                {isSearchMode ? 'No results found' : 'No stocks available'}
              </div>
            ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
                {` `}({displayStocks?.length || 0})
              </div>
              {displayStocks?.map((stock) => (
                  <li key={stock.symbol} className="search-item flex items-center justify-between border-b border-gray-600 last:border-b-0 ">
                    <Link
                        href={`/stocks/${stock.symbol}`}
                        onClick={handleSelectStock}
                        className="search-item-link "
                    >
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <div  className="flex-1">
                        <div className="search-item-name">
                          {stock.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stock.symbol} | {stock.exchange } | {stock.type}
                        </div>
                      </div>
                    </Link>
                    <StarButton symbol={stock.symbol} isInWatchlist={stock.isInWatchlist} loadingStocks={loadingStocks} handleWatchlistChange={handleWatchlistChange} />
                  </li>
              ))}
            </ul>
          )
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}