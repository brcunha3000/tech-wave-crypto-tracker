import { createContext, useState, useContext, useEffect } from "react";

import { getAllCoins } from "../services/api-calls";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Coin {
  id: string;
  market_cap_rank: number;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}
interface WatchlistContextType {
  watchlist: string[];
  coins: Coin[];
  fetchCoins: () => void;
  toggleWatchlist: (coinId: string) => void;
  loading: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({
  children,
}) => {
  const [watchlist, setWatchlist] = useState<string[]>(
    JSON.parse(localStorage.getItem("watchlist") || "[]")
  );

  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const fetchCoins = async () => {
    const allCoinsData = await getAllCoins();
    setCoins(allCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // handling watchlisted coins & message when its added/removed
  const toggleWatchlist = (coinId: string) => {
    setWatchlist((prevWatchlist) => {
      const isAlreadyInWatchlist = prevWatchlist.includes(coinId);
      const newWatchlist = isAlreadyInWatchlist
        ? prevWatchlist.filter((id) => id !== coinId)
        : [...prevWatchlist, coinId];

      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));

      const newMessage = isAlreadyInWatchlist
        ? `${coinId} removed from watchlist.`
        : `${coinId} added to watchlist.`;

      setMessage(newMessage);

      return newWatchlist;
    });
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, coins, fetchCoins, toggleWatchlist, loading }}
    >
      {children}
      {message && (
        <Snackbar
          open={!!message}
          autoHideDuration={3000}
          onClose={() => setMessage("")}
        >
          <Alert onClose={() => setMessage("")} severity="success">
            {message}
          </Alert>
        </Snackbar>
      )}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
