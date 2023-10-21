import Image from "next/image";
import React from "react";
import { useContext } from "react";
import { StateContext } from "@/store/StateContext";
import { SERVER_URL } from "@/constants";
import { deploySafe } from "@/safe";

const GroupItem = ({ group }) => {
  const ctx = useContext(StateContext);

  const joinGroupHandler = async () => {
    if (group.holder_addresses?.length == group.threshold) {
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
    }

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
        {group.holder_addresses?.length == group.threshold ? "Buy" : "Join"}
      </button>
    </div>
  );
};

export default GroupItem;
