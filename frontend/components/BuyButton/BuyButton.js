import React, { useState } from "react";
import BuyModal from "../Modals/BuyModal";

const BuyButton = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-4 bg-[#24282B] text-white py-6  rounded-xl">
      <p className=" font-thin px-6 text-gray-300 border-b border-gray-500 pb-2">
        Sale ends 23 November 2023
      </p>
      <div className="mt-3 px-6">
        <p className="text-sm mb-1">Current Price</p>
        <p className="text-3xl font-semibold">
          {props.price + " "}
          <span className="text-sm font-normal text-gray-300">$192,343,12</span>
        </p>

        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-blue-500 font-semibold text-xl py-4 w-full mt-4 rounded-xl cursor-none"
        >
          Buy Now
        </button>
      </div>

      {showModal ? (
        <BuyModal
          onClose={() => {
            setShowModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default BuyButton;
