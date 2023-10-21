require("@nomicfoundation/hardhat-toolbox");
//dotenv
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
      viaIR: true,
    },
  },

  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    mantle: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.PRIVATE_KEY],
    },
    scroll: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.PRIVATE_KEY],
    },
    moonbeam: {
      url: "https://rpc.api.moonbase.moonbeam.network	",
      accounts: [process.env.PRIVATE_KEY],
    },

    optimism: {
      url: "https://goerli.optimism.io",
      accounts: [process.env.PRIVATE_KEY],
    },

    sepolia: {
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_API_KEY,
      optimisticGoerli: process.env.OPTIMISM_API_KEY,
      bscTestnet: process.env.BSC_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      arbitrumGoerli: process.env.ARBITRUM_API_KEY,
      avalancheFujiTestnet: process.env.AVALANCHE_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      moonbaseAlpha: process.env.BASE_API_KEY,
      scroll: process.env.SCROLL_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 84531,
        urls: {
          apiURL: "https://base-goerli.publicnode.com",
          browserURL: "https://goerli.basescan.org/",
        },
      },
      {
        network: "scroll",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
};
