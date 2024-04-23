import { useWatchlist } from "../../utils/CoinsContext";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Watchlist.css";

interface Coin {
  id: string;
  market_cap_rank: number;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export const Watchlist: React.FC = () => {
  const { watchlist, coins, toggleWatchlist } = useWatchlist();

  // Filter coins that are in the watchlist
  const watchlistCoins: Coin[] = coins.filter((coin: Coin) =>
    watchlist.includes(coin.id)
  );

  return (
    <>
      <div className="watchlist-container">
        <div className="watchlist-container__title">
          <h2>
            My watchlist
            <span style={{ color: "#66fcf1" }}>.</span>
          </h2>
        </div>
        {watchlistCoins.length === 0 ? (
          <p>No coins in your watchlist.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actual Price</th>
                <th>24H % Variation</th>
                <th>Market Cap</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {watchlistCoins.map((coin) => (
                <tr key={coin.id}>
                  <td>{coin.market_cap_rank}</td>
                  <td>
                    <Link to={`/coins/${coin.id}`} className="link-override">
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </Link>
                  </td>
                  <td>${coin.current_price}</td>
                  <td
                    className={
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                  <td>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => toggleWatchlist(coin.id)}
                      sx={{
                        border: "1px solid #66fcf1",
                        background: "#1f2833",
                        color: "#C5C6C7",
                        "&:hover": {
                          border: "1px solid #45a29e",
                        },
                      }}
                    >
                      Remove coin
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
