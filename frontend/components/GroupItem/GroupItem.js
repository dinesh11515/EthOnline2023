import Image from "next/image";
import React, { useState } from "react";
import { useContext } from "react";
import { StateContext } from "@/store/StateContext";
import { ERC20_ABI, SERVER_URL } from "@/constants";
import {
  confirmTransaction,
  deploySafe,
  getPendingTransactions,
  sendTransaction,
} from "@/safe";

import { useEffect } from "react";
import { ethers } from "ethers";

const GroupItem = ({ group, price }) => {
  const [status, setStatus] = useState("Join");
  const ctx = useContext(StateContext);

  const depositFundsOrBuy = async () => {
    if (group.safe_address) {
      const signer = await ctx.rpc.getSinger();
      const contract = new ethers.Contract(
        "0x328507DC29C95c170B56a1b3A758eB7a9E73455c",
        ERC20_ABI,
        signer
      );

      const balance = await contract.balanceOf(group.safe_address);

      console.log("balance is", balance);

      if (balance > price) {
        setStatus("Buy");
        return;
      }

      setStatus("Deposit");
    } else if (group.holder_addresses?.length >= group.threshold) {
      setStatus("Deploy");
    }
  };

  useEffect(() => {
    depositFundsOrBuy();
  }, []);

  const joinGroupHandler = async () => {
    if (status === "Deploy") {
      const { newSafeAddress } = await deploySafe(
        group.holder_addresses,
        process.env.NEXT_PUBLIC_PRIVATE_KEY,
        process.env.NEXT_PUBLIC_ALCHEMY_KEY
      );

      const data = await fetch(`${SERVER_URL}/safe-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: group._id,
          safe_address: newSafeAddress,
        }),
      });

      const response = await data.json();

      console.log("respons is", response);

      return;
    } else if (status === "Join") {
      const address = await ctx.rpc.getAccounts();
      const data = await fetch(`${SERVER_URL}/new-holder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: group._id,
          holder_address: address,
        }),
      });

      const response = await data.json();
      console.log("response is", response);
    } else if (status === "Deposit") {
      const contract = new ethers.Contract(
        "0x328507DC29C95c170B56a1b3A758eB7a9E73455c",
        ERC20_ABI,
        signer
      );

      const tx = await contract.transfer(
        group.safe_address,
        price / group.threshold
      );

      await tx.wait();
    } else if (status === "Buy") {
      const signer = await ctx.rpc.getSinger();
      const pendingTransaction = await getPendingTransactions(
        group.safe_address
      );

      if (pendingTransaction) {
        await confirmTransaction(group.safe_address, signer);
      } else {
        await sendTransaction(group.safe_address, signer);
      }
    }
  };

  return (
    <div className="flex justify-between items-center px-3 py-4 rounded-xl bg-blue-50 mb-2">
      <div className="flex items-center gap-4">
        <Image
          src="/assets/nft1.svg"
          height={50}
          width={50}
          className="rounded-md"
        />
        <div className="text-gray-700 ">
          <p className="font-semibold mb-1">{group.group_name}</p>
          <p className="text-sm text-gray-500">
            {group.holder_addresses?.length}/{group.threshold}
          </p>
        </div>
      </div>
      <button
        className="bg-blue-400 rounded-md px-7 py-2 text-white cursor-none"
        onClick={joinGroupHandler}
      >
        {group.holder_addresses?.length >= group.threshold
          ? group.safe_address
            ? "Deposit"
            : "Buy"
          : "Join"}
      </button>
    </div>
  );
};

export default GroupItem;
