/*

coingecko api documentation: https://www.coingecko.com/api/documentation

get all coins: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false&locale=pt&precision=10&x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh

get a specific coin: https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh

get historic from a specific coin: https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}?x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh

get trending coins: https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh

*/

import axios from "axios";

export const getAllCoins = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false&locale=pt&precision=10&x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh"
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching all coins information ", error.message);
    throw error;
  }
};

export const getSpecificCoin = async (coinId) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${coinId} information:`, error.message);
    throw error;
  }
};

export const getHistoricFromSpecificCoin = async (coinId, days = 365) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}?x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching ${coinId} historical information:`,
      error.message
    );
    throw error;
  }
};

export const getTrendingCoins = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=	CG-iKRAN7x4VgXQ2YxRAuP2dWRh"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trending coins: ", error.message);
    throw error;
  }
};