import web3 from "./web3";
import type { AbiItem } from "web3-utils";
import Organisations from "@public/ABI/Organisations.json";

const instance = new web3.eth.Contract(
  Organisations.abi as AbiItem[],
  Organisations.networks[80001].address
);

export default instance;
