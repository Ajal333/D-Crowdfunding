/// <reference types="next" />
/// <reference types="next/image-types/global" />

import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
  interface Window {
    web3: Web3;
    ethereum: MetaMaskInpageProvider;
  }
}
