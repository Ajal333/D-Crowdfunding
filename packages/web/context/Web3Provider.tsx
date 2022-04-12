import React, { useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import web3 from "@infrastructure/web3";

export const Web3Context = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  connectWallet: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnectWallet: () => {},
  library: null,
  account: null,
});

export const Web3Provider = ({ children }) => {
  const { activate, account, library, deactivate } = useWeb3React();

  const injected = new InjectedConnector({ supportedChainIds: [80001] });

  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    try {
      await activate(injected);
      if (account || typeof window.ethereum !== "undefined") {
        if ((await web3.eth.getChainId()) !== 80001) {
          window.alert("Please change the network to Mumbai Test Network");
        }
      } else {
        window.alert(
          "Metamask wallet not detected. Please install the extension wallet"
        );
      }
      return true;
    } catch (error) {
      console.log("Error on connecting: ", error);
      return false;
    }
  };

  const disconnectWallet = async () => {
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnnect: ", error);
    }
  };

  const values = useMemo(
    () => ({
      account,
      connectWallet,
      disconnectWallet,
      library,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  );

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
};

export default function useWeb3Provider() {
  const context = React.useContext(Web3Context);
  return context;
}
