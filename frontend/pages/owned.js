import NFTCard from '@/components/NFTCard/NFTCard';

const DEMO_NFTS = [
  {
    id: 7,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft2.svg',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
  {
    id: 8,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft9.gif',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
];

const OwnedNfts = () => {
  return (
    <div className='pt-4'>
      <div className='pl-28 pr-10 py-10 font-Poppins'>
        <p className='text-3xl font-semibold'>Owned NFTs</p>
        <p className='font-Poppins text-gray-500 '>
          All the NFTs you own are listed here
        </p>

        <div className='flex gap-8 flex-wrap mt-6'>
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
