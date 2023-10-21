import Safe, { SafeFactory, EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

const getWallet = (providerUrl, privateKey) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const wallet = new ethers.Wallet(privateKey, provider); ///wallet should be of user who is the owner of safe

  return wallet;
};
const SafeInstance = async (providerUrl, privateKey) => {
  const wallet = getWallet(providerUrl, privateKey);
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: wallet,
  });

  const safeSdk = await SafeFactory.create({ ethAdapter });

  return safeSdk;
};

const deploySafe = async (owners, privateKey, providerUrl) => {
  const safeSdk = await SafeInstance(providerUrl, privateKey);

  const safeAccountConfig = {
    owners,
    threshold: owners.length, //threshold is number of signatures needed to execute a transaction
  };

  const safeSdkOwner1 = await safeSdk.deploySafe({
    safeAccountConfig,
    saltNonce: Math.floor(Math.random() * 10000),
    options: {
      gasLimit: 10000000,
    },
  });
  console.log("owner is", safeSdkOwner1);
  localStorage.setItem("safe", safeSdkOwner1);

  const newSafeAddress = await safeSdkOwner1.getAddress();
  console.log("newSafeAddress", newSafeAddress);

  return { safeSdkOwner1, newSafeAddress };
};

const addNewOwner = async (ownerAddress) => {
  const params = {
    ownerAddress,
    threshold: 2, //but decide later might need to change accordingly
  };
  const safeSdk = await SafeInstance();
  const safeTx = await safeSdk.createAddOwnerTx(params);
  const txResponse = await safeSdk.executeTransaction(safeTx);

  await txResponse.transactionResponse?.wait();
};

const getSafe = async () => {
  //get safe address here from unique hash from tableland
  const safeAddress = "0x124";
  const wallet = getWallet();
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: wallet,
  });
  const safeSDK = localStorage.getItem("safe");
  const safeWallet = await safeSDK.connect({ ethAdapter, safeAddress });
  return safeWallet;
};

const sendTransaction = async (destination, amount) => {
  const safeTransactionData = {
    to: destination,
    data: "0x",
    value: amount,
  };
  //checkout how to create transaction later

  //get safeSDKOwner1 from backend that you stored corresponging to the user
  // then make transaction here
  // const safeTransaction = await
};

export { deploySafe };
