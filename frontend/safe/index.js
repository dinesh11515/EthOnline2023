import Safe, { SafeFactory, EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";

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

const SafeService = () => {
  const txServiceUrl = "https://safe-transaction-goerli.safe.global";
  const safeService = new SafeApiKit({
    txServiceUrl,
    ethAdapter: ethAdapterOwner1,
  });

  return safeService;
};

const deploySafe = async (owners, privateKey, providerUrl) => {
  console.log("called");
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

const sendTransaction = async (signer, safeAddress) => {
  const enc = ethers.utils.defaultAbiCoder();

  const data = ethers.utils.keccak256("");
  const safeTransactionData = {
    to: "0x4059b219e66676C1c71cdF58aE0EA5d505268a5c",
    data: `0xa1448194000000000000000000000000${safeAddress.slice(
      2
    )}0000000000000000000000000000000000000000000000000000000000000006`,
    value: "0.001",
  };
  //checkout how to create transaction later

  const safeSdkConfig = {
    ethers,
    signerOrProvider: signer,
  };

  //get safeSDKOwner1 from backend that you stored corresponging to the user
  // then make transaction here
  const safeSdk = await Safe.create({ safeSdkConfig, safeAddress });
  const safeTransaction = await safeSdk.createTransaction({
    safeTransactionData,
  });

  const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction);

  const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash);

  const safeService = SafeService();
  await safeService.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: await signer.getAddress(),
    senderSignature: senderSignature.data,
  });
};

export const confirmTransaction = async (safeAddress, signer) => {
  const safeService = SafeService();
  const pendingTransactions = await safeService.getPendingTransactions(
    safeAddress
  ).result;

  const transaction = pendingTransactions[0];
  const safeTxHash = transaction.safeTxHash;

  const ethAdapterOwner2 = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safeSdkOwner2 = await Safe.create({
    ethAdapter: ethAdapterOwner2,
    safeAddress,
  });

  const signature = await safeSdkOwner2.signTransactionHash(safeTxHash);
  const response = await safeService.confirmTransaction(
    safeTxHash,
    signature.data
  );
};
const getPendingTransactions = async (safeAddress) => {
  const safeService = SafeService();
  const pendingTransactions = await safeService.getPendingTransactions(
    safeAddress
  ).results;

  // Assumes that the first pending transaction is the transaction you want to confirm
  const transaction = pendingTransactions[0];

  return transaction;
};

export { deploySafe, sendTransaction, getPendingTransactions };
