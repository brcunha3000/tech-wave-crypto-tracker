import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  getSpecificCoin,
  getHistoricFromSpecificCoin,
} from "../../services/api-calls";

import { Line } from "react-chartjs-2";

import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";

import "./CoinPage.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Coin {
  name: string;
  symbol: string;
  market_cap_rank: number;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
  };
  links: { homepage: string[] };
}

type Historic = [number, number][];

export const CoinPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [coin, setCoin] = useState<Coin | null>(null); 
  const [historic, setHistoric] = useState<Historic>([]);
  const [days, setDays] = useState(1);

  const fetchHistoricData = async () => {
    const coinData = await getSpecificCoin(id);
    setCoin(coinData);

    const historicData = await getHistoricFromSpecificCoin(id, days);
    setHistoric(historicData.prices);
  };

  // when "days" change it will fetch the data
  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const dataChartOptions = [
    { label: "1 Day", value: 1 },
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "365 Days", value: 365 },
  ];

  return (
    <div>
      {coin ? (
        <div className="coin-container">
          <div className="coin-detailed-information-container">
            <div>
              <h1>
                {coin.name} ({coin.symbol.toUpperCase()})
              </h1>
            </div>
            <div className="coin-detailed-information-container__image">
              <img src={coin.image.large} width={200} alt={coin.id} />
            </div>
            <div>
              <p>Rank: #{coin.market_cap_rank}</p>
              <hr></hr>
              <p>Market Price: ${coin.market_data.current_price.usd}</p>
              <hr></hr>
              <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
              <hr></hr>
              <p>Official link</p>
              <a
                className="link-override"
                href={coin.links.homepage[0]}
                target="_blank"
              >
                <LanguageIcon /> Website
              </a>
            </div>
          </div>
          <div className="coin-chart-container">
            <div className="coin-chart-container__graph">
              <Line
                data={{
                  labels: historic.map((coin) => {
                    let date = new Date(coin[0]);
                    let hours = date.getHours().toString().padStart(2, "0");
                    let minutes = date.getMinutes().toString().padStart(2, "0");
                    let time = `${hours}:${minutes}`;

                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historic.map((coin) => coin[1]),
                      label: `Price variation - past ${days} day(s)`,
                      borderColor: "#66fcf1",
                    },
                  ],
                }}
              />
            </div>
            <div className="coin-chart-container__buttons">
              {dataChartOptions.map((option) => (
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid #66fcf1",
                    background: "#1f2833",
                    color: "#C5C6C7",
                    "&:hover": {
                      border: "1px solid #45a29e",
                    },
                  }}
                  key={option.value}
                  onClick={() => setDays(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
