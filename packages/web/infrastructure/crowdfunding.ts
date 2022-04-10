import web3 from "./web3";
import CrowdFunding from "@public/ABI/CrowdFunding.json";
import type { AbiItem } from "web3-utils";

const instance = (address: string) => {
  return new web3.eth.Contract(CrowdFunding.abi as AbiItem[], address);
};

export default instance;
