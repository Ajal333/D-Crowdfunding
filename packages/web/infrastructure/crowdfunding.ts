import CrowdFunding from "@public/ABI/CrowdFunding.json";
import { AbiItem } from "web3-utils";
import web3 from "./web3";

export default (address: string) => {
  return new web3.eth.Contract(CrowdFunding.abi as AbiItem[], address);
};
