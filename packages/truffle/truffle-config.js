const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

const Kit = require("@celo/contractkit");
const kit = Kit.newKit("https://alfajores-forno.celo-testnet.org");
const getAccount = require("./getAccount").getAccount;

async function awaitWrapper() {
  let account = await getAccount();
  kit.connection.addAccount(account.privateKey);
}
awaitWrapper();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://matic-mumbai.chainstacklabs.com/"
          // "https://rpc-mumbai.maticvigil.com"
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    alfajores: {
      provider: kit.connection.web3.currentProvider,
      network_id: 44787,
      gas: 4000000,
    },
  },

  compilers: {
    solc: {
      version: "0.8.3",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
