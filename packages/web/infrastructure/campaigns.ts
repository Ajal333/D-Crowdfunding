import Campaigns from "@public/ABI/Campaigns.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  Campaigns.abi,
  Campaigns.networks[44787].address
);

export default instance;
