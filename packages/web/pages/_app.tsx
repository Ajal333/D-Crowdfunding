import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";

import "../styles/globals.scss";
import Web3 from "web3";
import { Web3Provider } from "context/Web3Provider";

function MyApp({ Component, pageProps }: AppProps) {
  const getLibrary = (provider) => {
    return new Web3(provider);
  };

  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3Provider>
          <Component {...pageProps} />;
        </Web3Provider>
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default MyApp;
