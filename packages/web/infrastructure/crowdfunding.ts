import CrowdFunding from "@public/ABI/CrowdFunding.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  CrowdFunding.abi,
  CrowdFunding.networks[44787].address
);

export default instance;
