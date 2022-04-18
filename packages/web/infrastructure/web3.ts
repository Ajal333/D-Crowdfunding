import type { MetaMaskInpageProviderOptions } from "@metamask/providers/dist/MetaMaskInpageProvider";
import { currency } from "common/constants";
import Web3 from "web3";

let web3: undefined | Web3;

declare global {
  interface Window {
    web3: Web3;
    ethereum: MetaMaskInpageProviderOptions;
  }
}

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and meta mask is installed
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server *OR* meta mask is not running
  // creating our own provider
  const provider = new Web3.providers.HttpProvider(
    currency === "CELO"
      ? "https://alfajores-forno.celo-testnet.org"
      : "https://matic-mumbai.chainstacklabs.com/"
  );

  web3 = new Web3(provider);
}

export default web3;
