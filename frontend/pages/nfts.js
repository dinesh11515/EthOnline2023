import NFTCard from '@/components/NFTCard/NFTCard';
import Image from 'next/image';

const DEMO_NFTS = [
  {
    id: 1,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft4.gif',
    price: '100',
    dollarPrice: '20382',
    name: 'Bored Ape #4411',
  },
  {
    id: 2,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft3.jpeg',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
  {
    id: 2,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft4.gif',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
  {
    id: 2,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft5.jpeg',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
  {
    id: 2,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft6.jpeg',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
  {
    id: 2,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft1.svg',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
  {
    id: 2,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft2.svg',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
  {
    id: 2,
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    image: '/assets/nft3.jpeg',
    price: '100',
    dollarPrice: '20382',
    name: 'Borde Ape #121',
  },
];

const Nfts = () => {
  return (
    <div className='pl-28 pr-10 py-10 font-Poppins'>
      <p className='text-3xl font-semibold'>Exclusive NFTs</p>
      <p className='font-Poppins text-gray-500 '>
        Enjoy the latest NFTs from ApeCoin
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
  );
};

export default Nfts;
