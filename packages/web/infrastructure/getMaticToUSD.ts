import { currency } from "common/constants";
import fetch from "node-fetch";

export const getMaticPrice = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${
        currency === "CELO" ? "celo" : "matic-network"
      }`
    );
    const data = await response.json();
    const maticPrice = data[0].current_price;
    return parseFloat(parseFloat(maticPrice).toFixed(2));
  } catch (error) {
    console.log(error);
  }
};

export const getWEIPriceInUSD = (usd: number, wei: number): string => {
  return parseFloat((convertWeiToMatic(wei) * usd).toString()).toFixed(2);
};
export const getMaticPriceInUSD = (matic: number, usd: number): string => {
  return parseFloat((matic * usd).toString()).toFixed(2);
};

export const convertWeiToMatic = (wei: number): number => {
  return parseFloat(wei.toString()) / 1000000000000000000;
};
