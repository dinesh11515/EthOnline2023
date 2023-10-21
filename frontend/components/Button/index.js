"use client";

import EthereumRpc from "@/constants/ethersRPC";
import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";

import { useEffect } from "react";

// BG8P7ILQX2ffNtVWYjLaH4es1WAd3hCdQuYAPhrEoaZ5FpJrXIYiTXqHUlpM9ToGTg2iKUQH7sGL-LOHSf2IM18

const HomeButton = () => {
  const web3auth = new Web3Auth({
    clientId:
      "BIZm1vc6ByCE3uK4BKlhr0elselEFtvVgEQMcLUEomMz1UndstZFByiSGIfiT1rRTd2DqU3pR62l8VHHKc4B-g8", // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x13881",
      rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
      displayName: "Polygon Mumbai Testnet",
      blockExplorer: "https://mumbai.polygonscan.com/",
      ticker: "MATIC",
      tickerName: "Matic",
    },
  });
  console.log(web3auth);
  useEffect(() => {
    (async () => {
      await web3auth.initModal();
      console.log(web3auth);
    })();
  }, []);

  const connectHandler = async () => {
    console.log("connectHandler");
    const provider = await web3auth.connect();

    console.log(provider);

    const rpc = new EthereumRpc(provider);

    console.log("rpc", await rpc.getAccounts());
  };

  const getInfoHandler = async () => {
    const info = await web3auth.getUserInfo();
    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://eth.llamarpc.com"
    // );
    console.log(process.env.NEXT_PUBLIC_ALCHEMY_KEY);
    const rpc = new EthereumRpc(process.env.NEXT_PUBLIC_ALCHEMY_KEY);

    console.log(await rpc.getAccounts());
  };

  return (
    <div>
      <button onClick={connectHandler}>Connect</button>
      <button onClick={getInfoHandler}>getInfo</button>
    </div>
  );
};

export default HomeButton;
