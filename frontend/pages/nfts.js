import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import NFTCard from "@/components/NFTCard/NFTCard";

const DEMO_NFTS = [
  {
    id: 1,
    address: "0x4059b219e66676C1c71cdF58aE0EA5d505268a5c",
    image: "/assets/threejocks.jpeg",
    price: "0.01",
    dollarPrice: "16.3",
    name: "3Jokers",
  },
];

const Nfts = () => {
  return (
    <div className="pt-4">
      <div className="pl-28 pr-10 py-10 font-Poppins">
        <p className="text-3xl font-semibold">Exclusive NFTs</p>
        <p className="font-Poppins text-gray-500 ">
          Enjoy the latest NFTs from ApeCoin
        </p>

        <div className="flex gap-8 flex-wrap mt-6">
          {DEMO_NFTS.map((nft) => (
            <NFTCard
              key={nft.id}
              imgUrl={nft.image}
              address={nft.address}
              name={nft.name}
              price={nft.price}
              dollarPrice={nft.dollarPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nfts;
