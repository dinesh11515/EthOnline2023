"use client";

import BuyButton from "@/components/BuyButton/BuyButton";
import GroupItem from "@/components/GroupItem/GroupItem";
import { SERVER_URL } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const NFT = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [showGroups, setShowGroups] = useState(false);
  const [groups, setGroups] = useState([]);
  const router = useRouter();
  const price = 123.45;

  const { nftId } = router.query;

  const getGroupsData = async () => {
    try {
      console.log("here");
      const data = await fetch(`${SERVER_URL}/all/${nftId}`, {
        cache: "no-store",
      });

      const response = await data.json();

      setGroups(response.allMaps);
    } catch (e) {
      console.log("getGroups", e);
    }
  };

  useEffect(() => {
    getGroupsData();
  }, []);

  return (
    <div className="py-10">
      <div className="flex w-full font-Poppins">
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

            <div className="flex gap-6 mb-4 ">
              <p
                onClick={() => {
                  setShowDetails(true);
                  setShowGroups(false);
                }}
                className={`font-medium pt-10  ${
                  showDetails
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 "
                } `}
              >
                Details
              </p>
              <p
                onClick={() => {
                  console.log("clicked");
                  setShowDetails(false);
                  setShowGroups(true);
                }}
                className={`font-medium pt-10 ${
                  showGroups
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                } `}
              >
                Groups
              </p>
            </div>

            {showDetails ? (
              <p className="text-gray-500 text-sm">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            ) : null}

            {showGroups ? (
              <div className="border border-gray-300 rounded-xl h-[280px] p-4 overflow-y-scroll ">
                {groups.map((group) => (
                  <GroupItem key={group.id} group={group} price={price} />
                ))}
              </div>
            ) : null}
          </div>

          <BuyButton price={price} />
        </div>
      </div>
    </div>
  );
};

export default NFT;
