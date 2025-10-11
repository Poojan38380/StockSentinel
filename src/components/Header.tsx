import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { Button } from "@/components/ui/button";
import {searchStocks} from "@/lib/actions/finnhub.actions";
import {getWatchlistSymbolsByUserId} from "@/lib/actions/watchlist.actions";

const Header = async ({ user }: { user: User | null }) => {
    const stocks = await searchStocks();
    
    // Only fetch watchlist if user is authenticated
    let watchlistSymbols: string[] = [];
    if (user) {
        watchlistSymbols = await getWatchlistSymbolsByUserId();
    }

    // Create a Set for O(1) lookup performance
    const watchlistSet = new Set(watchlistSymbols);

    // Map stocks to include watchlist status
    const initialStocks: StockWithWatchlistStatus[] = stocks.map(stock => ({
        ...stock,
        isInWatchlist: watchlistSet.has(stock.symbol)
    }));

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Stock Sentinel logo" width={170} height={50} className="h-10 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks} />
                </nav>

                {user ? (
                    <UserDropdown user={user} initialStocks={initialStocks} />
                ) : (
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" className="text-gray-400 hover:text-yellow-500">
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                        <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900">
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}
export default Header