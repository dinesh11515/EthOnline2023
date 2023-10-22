'use client';

import EthereumRpc from '@/constants/ethersRPC';
import { Web3Auth } from '@web3auth/modal';
import { useContext } from 'react';
import { StateContext } from '@/store/StateContext';

import { useEffect, useState } from 'react';
// BG8P7ILQX2ffNtVWYjLaH4es1WAd3hCdQuYAPhrEoaZ5FpJrXIYiTXqHUlpM9ToGTg2iKUQH7sGL-LOHSf2IM18

const HomeButton = () => {
  const ctx = useContext(StateContext);
  const [connected, setConnected] = useState(false);

  let web3auth;
  useEffect(() => {
    (async () => {
      web3auth = new Web3Auth({
        clientId:
          'BG8P7ILQX2ffNtVWYjLaH4es1WAd3hCdQuYAPhrEoaZ5FpJrXIYiTXqHUlpM9ToGTg2iKUQH7sGL-LOHSf2IM18', // Get your Client ID from the Web3Auth Dashboard
        web3AuthNetwork: 'sapphire_mainnet', // Web3Auth Network
        chainConfig: {
          chainNamespace: 'eip155',
          chainId: '0x5',
          rpcTarget: 'https://rpc.ankr.com/eth_goerli',
          displayName: 'Goerli Testnet',
          blockExplorer: 'https://goerli.etherscan.io',
          ticker: 'ETH',
          tickerName: 'Ethereum',
        },
      });
      await web3auth.initModal();
      console.log(web3auth);
    })();
  }, []);

  const connectHandler = async () => {
    const provider = await web3auth.connect();

    setConnected(true);

    const rpcInfo = new EthereumRpc(provider);

    ctx.setRpc(rpcInfo);
  };

  return (
    <div className='flex gap-4 font-Poppins'>
      <button
        className='bg-gray-500 rounded-md px-10 py-2 text-white font-semibold hover:bg-blue-500'
        onClick={connectHandler}>
        {connected ? 'Connected' : 'Login'}
      </button>
    </div>
  );
};

export default HomeButton;
