import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import web3 from "@infrastructure/web3";
import DCrowdfundingABI from "@public/DCrowdfunding.json";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    const networkId = await web3.eth.net.getId();
    if (networkId === 44787) {
      await web3.eth.Contract(
        DCrowdfundingABI,
        "0xd9145CCE52D386f254917e481eB44e9943F39138"
      );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
