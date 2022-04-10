import type { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";

declare global {
  interface Window {
    web3: Web3;
    ethereum: MetaMaskInpageProvider;
  }
}

export interface CampaignType {
  minimumContribution: number;
  numberOfRequests: number;
  targetAmount: number;
  totalDonated: number;
  deadline: string;
  organizationAddress: string;
  name: string;
  description: string;
  image: string;
  address: string;
}
