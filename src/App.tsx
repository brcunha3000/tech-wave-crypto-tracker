import { Homepage } from "./pages/Homepage/Homepage";
import { Watchlist } from "./pages/Watchlist/Watchlist";
import { Navbar } from "./components/Navbar/Navbar";
import { CoinPage } from "./pages/CoinPage/CoinPage";

import { Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./utils/CoinsContext";

import "./App.css";

function App() {
  return (
    <>
      <WatchlistProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </WatchlistProvider>
    </>
  );
}

export default App;
