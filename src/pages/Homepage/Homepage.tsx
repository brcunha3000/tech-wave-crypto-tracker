import { TrendingCoins } from "../../components/TrendingCoins/TrendingCoins";
import CoinsTable from "../../components/CoinsTable/CoinsTable";

import { Link as ScrollLink } from "react-scroll";

import "./Homepage.css";

export const Homepage: React.FC = () => {
  return (
    <>
      <div>
        <div className="homepage-container">
          <div className="homepage-container__text">
            <h1 style={{ fontSize: "100px", color: "#66fcf1" }}>
              Tech Wave Crypto Tracker
            </h1>
            <h2 style={{ fontSize: "70px", color: "#c5c6c7" }}>
              The best free crypto tracker in the market
              <span style={{ color: "#66fcf1" }}>.</span>
            </h2>
          </div>
          <div className="homepage-container__button">
            <button className="button-homepage">
              <ScrollLink
                to="homepage-container__content"
                smooth={true}
                duration={1000}
              >
                Check it out
              </ScrollLink>
            </button>
          </div>
        </div>
        <div
          id="homepage-container__content"
          className="homepage-container__content"
          data-aos="fade-down"
        >
          <div className="homepage-container__content-text">
            <h2>
              What is trending right now
              <span style={{ color: "#66fcf1" }}>.</span>
            </h2>
          </div>
          <TrendingCoins />

          <CoinsTable />
        </div>
      </div>
    </>
  );
};
