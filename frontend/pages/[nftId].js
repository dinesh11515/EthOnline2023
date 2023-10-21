import Image from "next/image";
import React from "react";
import { SERVER_URL } from "@/constants";

const NFT = () => {
  const createNewGroupHandler = async () => {
    const data = await fetch(`${SERVER_URL}/create-map`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //data goes here aman mfer
      }),
    });

    const response = await data.json();
  };

  return (
    <div className="flex w-full mt-10 font-Poppins">
      <div className="flex-[0.55] bg-gray-100 border-y-2 border-r-2 border-gray-300 flex items-center justify-center p-10 pl-20">
        <Image
          src="/assets/nft2.svg"
          height={650}
          width={650}
          className="rounded-xl"
        />
      </div>
      <div className="flex-[0.45] flex flex-col justify-between border-y-2 border-gray-300 py-10 px-6">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold text-[#1e1e1e]">
              Bored Ape #21212
            </p>
            <Image src="/assets/eth.png" height={35} width={35} />
          </div>

          <div className="mt-10">
            <p className="font-medium text-gray-800">Details</p>
            <p className="text-gray-500 text-sm">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </div>
        </div>

        <div className="mt-10 bg-[#24282B] text-white py-6  rounded-xl">
          <p className=" font-thin px-6 text-gray-300 border-b border-gray-500 pb-2">
            Sale ends 23 November 2023
          </p>
          <div className="mt-3 px-6">
            <p className="text-sm mb-1">Current Price</p>
            <p className="text-3xl font-semibold">
              123.45 ETH{" "}
              <span className="text-sm font-normal text-gray-300">
                $192,343,12
              </span>
            </p>

            <button
              className="bg-blue-400 font-semibold text-xl py-4 w-full mt-4 rounded-xl"
              onClick={createNewGroupHandler}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFT;
