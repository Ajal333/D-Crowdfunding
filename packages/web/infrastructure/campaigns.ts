import web3 from "./web3";
import type { AbiItem } from "web3-utils";
import Campaigns from "@public/ABI/Campaigns.json";

const instance = new web3.eth.Contract(
  Campaigns.abi as AbiItem[],
  Campaigns.networks[44787].address
);

export default instance;
