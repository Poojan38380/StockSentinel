import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import {searchStocks} from "@/lib/actions/finnhub.actions";
import {getWatchlistSymbolsByUserId} from "@/lib/actions/watchlist.actions";

const Header = async ({ user }: { user: User }) => {
    const [stocks, watchlistSymbols] = await Promise.all([
        searchStocks(),
        getWatchlistSymbolsByUserId()
    ]);

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

                <UserDropdown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    )
}
export default Header