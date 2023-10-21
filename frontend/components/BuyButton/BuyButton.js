import React from "react";

const BuyButton = () => {
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
    <div className="mt-4 bg-[#24282B] text-white py-6  rounded-xl">
      <p className=" font-thin px-6 text-gray-300 border-b border-gray-500 pb-2">
        Sale ends 23 November 2023
      </p>
      <div className="mt-3 px-6">
        <p className="text-sm mb-1">Current Price</p>
        <p className="text-3xl font-semibold">
          123.45 ETH{" "}
          <span className="text-sm font-normal text-gray-300">$192,343,12</span>
        </p>

        <button
          className="bg-blue-500 font-semibold text-xl py-4 w-full mt-4 rounded-xl cursor-none"
          onClick={createNewGroupHandler}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BuyButton;
