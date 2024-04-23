import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useWatchlist } from "../../utils/CoinsContext";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./CoinsTable.css";

const CoinsTable: React.FC = () => {
  const { coins, fetchCoins, toggleWatchlist, watchlist, loading } = useWatchlist();
  const [searchCoin, setSearchCoin] = useState<string>("");

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchCoin.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchCoin.toLowerCase()) ||
      coin.id.toLowerCase().includes(searchCoin.toLowerCase())
  );

  // fetching all coins info automatically [1min]
  useEffect(() => {
    fetchCoins();
    const intervalId = setInterval(fetchCoins, 60000);
    return () => clearInterval(intervalId);
  }, []);

    // table columns
  const columns: GridColDef[] = [
    {
      field: "watchlist",
      headerName: "Watchlist",
      width: 70,
      renderCell: (params) => {
        const isWatchlisted = watchlist.includes(params.row.id as string);
        return (
          <span onClick={() => toggleWatchlist(params.row.id as string)}>
            {isWatchlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
        );
      },
    },
    { field: "market_cap_rank", headerName: "Rank", width: 80 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => (
        <Link to={`/coins/${params.row.id}`} className="link-override">
          {params.row.name} ({(params.row.symbol as string).toUpperCase()})
        </Link>
      ),
    },
    {
      field: "current_price",
      headerName: "Price",
      width: 250,
      renderCell: (params) =>
        `$${params.row.current_price}`,
    },
    {
      field: "price_change_percentage_24h",
      headerName: "24H % Change",
      width: 120,
      renderCell: (params) => {
        const value = params.row.price_change_percentage_24h as number | null;
        return (
          <span className={value && value > 0 ? "green" : "red"}>
            {value ? `${value.toFixed(2)}%` : "N/A"}
          </span>
        );
      },
    },
    {
      field: "market_cap",
      headerName: "Market Cap",
      width: 150,
      renderCell: (params) =>
        (params.row.market_cap as number).toLocaleString(),
    },
  ];

  // table rows
  const rows = filteredCoins.map((coin) => ({
    id: coin.id,
    market_cap_rank: coin.market_cap_rank,
    name: coin.name,
    symbol: coin.symbol,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    market_cap: coin.market_cap,
  }));

  return (
    <div>
      {loading && (
        <div>
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className="search-bar">
        <form>
          <label>
            <SearchIcon />
            <input
              name="searchCoin"
              type="text"
              onChange={(e) => setSearchCoin(e.target.value)}
              value={searchCoin}
              placeholder="Search for a specific coin"
            />
          </label>
        </form>
      </div>

      <div
        style={{
          height: "80vh",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={false}
          disableRowSelectionOnClick
          pagination
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "transparent",
            },
          }}
        />
      </div>
      <br />
    </div>
  );
};

export default CoinsTable;
