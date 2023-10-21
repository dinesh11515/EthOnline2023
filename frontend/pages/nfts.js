import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

const DEMO_NFTS = [
  {
    id: 1,
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    image: "/image-1.avif",
    price: "100 ETH",
    name: "Bored Ape #4411",
  },
  {
    id: 2,
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    image: "/image-1.avif",
    price: "100 ETH",
    name: "Borde Ape #121",
  },
];

const Nfts = () => {
  return (
    <>
      <Navbar />
      <div className="ml-[20%] mt-[5%]">
        <div className="grid grid-cols-3">
          {DEMO_NFTS.map((nft) => {
            return (
              <div key={nft.id} className="flex gap-6">
                <div>
                  <Image
                    src={nft.image}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h1>{nft.name}</h1>
                  <h2>{nft.address}</h2>
                  <h2>{nft.price}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Nfts;
