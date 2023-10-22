import NFTCard from "@/components/NFTCard/NFTCard";

const DEMO_NFTS = [
  {
    id: 1,
    address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    image: "/nft1.jpeg",
    price: "79.99",
    dollarPrice: "130645",
    name: "Token#4827",
  },
];

const OwnedNfts = () => {
  return (
    <div className="pt-4">
      <div className="pl-28 pr-10 py-10 font-Poppins">
        <p className="text-3xl font-semibold">Owned NFTs</p>
        <p className="font-Poppins text-gray-500 ">
          All the NFTs you own are listed here
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

export default OwnedNfts;
