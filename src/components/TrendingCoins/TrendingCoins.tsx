import { useEffect, useState } from "react";

import { getTrendingCoins } from "../../services/api-calls";

import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";
import "./TrendingCoins.css";

interface TrendingCoin {
  item: {
    coin_id: string;
    large: string;
    name: string;
    symbol: string;
    data: {
      price: number;
    };
  };
}

export const TrendingCoins: React.FC = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const trendingCoinsData = await getTrendingCoins();

      setTrendingCoins(trendingCoinsData.coins);
    };

    fetchTrendingCoins();
  }, []);

  const responsive = {
    0: {
      items: 2,
    },
    520: {
      items: 6,
    },
  };

  const trendingItems = trendingCoins.map((coin) => {
    return (
      <div key={coin.item.coin_id} className="carousel-element">
        <div className="carousel-element__image">
          <img src={coin.item.large} alt={coin.item.name} width={150} />
        </div>
        <div className="carousel-element__text">
          <p>
            {coin.item.name} ({coin.item.symbol})
          </p>
          <p>${coin.item.data.price.toFixed(3)}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="carousel">
      <AliceCarousel
        autoPlay
        autoPlayInterval={500}
        infinite
        animationDuration={2000}
        responsive={responsive}
        disableDotsControls
        disableButtonsControls
        items={trendingItems}
        autoPlayStrategy="none"
      />
    </div>
  );
};
