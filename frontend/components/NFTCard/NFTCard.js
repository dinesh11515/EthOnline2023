import Image from 'next/image';
import React from 'react';

const NFTCard = ({ imgUrl, name, price, address, dollarPrice }) => {
  return (
    <div className=' flex flex-col font-Poppins rounded-xl w-fit overflow-hidden hover:scale-[1.01] transition-all ease-in-out shadow-xl'>
      <div className='w-[300px]  bg-[white] '>
        <Image
          alt='img'
          height={500}
          width={350}
          className='mx-auto h-[320px] object-cover min-h-[350px] '
          src={imgUrl}
        />

        <div className='p-3 '>
          <div className='flex justify-between items-center'>
            <p className=''>{name}</p>
            <Image
              src='/assets/eth.png'
              height={25}
              width={25}
            />
          </div>
          <div className='flex justify-between items-center mt-1'>
            <p className='font-semibold text-2xl'>{price} ETH</p>
            <p className='text-gray-400 text-sm'>${dollarPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
