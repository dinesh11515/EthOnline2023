import CardComponent from '@/components/Home/NFTContainer/ContainerComp';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Goo = dynamic(() => import('@/components/Goo/Goo'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional loading component
});

const data = [
  {
    id: '1',
    nftName: 'The Close',
    imgUrl: '/assets/nft9.gif',
  },
  {
    id: '2',
    nftName: 'The Blue',
    imgUrl: '/assets/nft5.jpeg',
  },
  {
    id: '3',
    nftName: 'Orange Club',
    imgUrl: '/assets/nft3.jpeg',
  },
  {
    id: '4',
    nftName: 'Sucide Squal',
    imgUrl: '/assets/nft2.svg',
  },
  {
    id: '5',
    nftName: 'Halo 5',
    imgUrl: '/assets/nft4.gif',
  },
  {
    id: '6',
    nftName: 'Kirmada',
    imgUrl: '/assets/nft1.svg',
  },
];

const Home = () => {
  return (
    <div className='w-screen h-full flex px-10  font-Roboto index'>
      <div className='flex-[0.5] h-[80vh] sticky top-10'>
        <div className='py-10 flex flex-col justify-between h-full'>
          <div className='flex items-center justify-center'>
            <Image
              src='/assets/logo.png'
              height={100}
              width={100}
            />
            <p className='text-7xl -ml-2 font-semibold text-center text-gray-800'>
              3Jocks.
            </p>
          </div>

          <div className='flex items-start justify-center mt-4 gap-4'>
            <div className='w-[30px] h-[4px] bg-black mt-2'></div>
            <div className='text-gray-500 font-Poppins font-medium text-sm'>
              <p>No enough funds?</p>
              <p>Buy NFT collectively!</p>
              <p>Easy & hassle free.</p>
            </div>
          </div>

          <Goo />
        </div>

        <p className='text-center font-Poppins text-gray-500 text-sm font-medium'>
          @2023 3Jocks. All rights reserved.
        </p>
      </div>
      <div className='flex-[0.5] border-x-2 border-gray-200'>
        {data.map((nft) => (
          <CardComponent
            key={nft.id}
            imgUrl={nft.imgUrl}
            name={nft.nftName}
            tokenId={nft.id}
            reverse={nft.id % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
