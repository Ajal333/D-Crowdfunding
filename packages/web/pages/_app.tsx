import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import web3 from "@infrastructure/web3";
import DCrowdfundingABI from "@public/DCrowdfunding.json";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    console.log("here");
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    if (networkId === 44787) {
      const response = await web3.eth.Contract(
        DCrowdfundingABI,
        "0xd9145CCE52D386f254917e481eB44e9943F39138"
      );
      console.log("response :>> ", response);
    }
  };

  return <Component {...pageProps} />;
}

export default MyApp;
