import Image from 'next/image';
import React from 'react';
import { Sismo } from '../verification';
import Backdrop from './Backdrop';

const SismoModal = () => {
  return (
    <>
      <Backdrop />
      <div className='w-[500px] font-Poppins bg-[#0f172b] p-10 z-20 rounded-xl text-white flex flex-col fixed left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]'>
        <p className='font-Poppins text-white mb-6 text-center font-semibold'>Connect to assure us that you're a Degen!</p>
        <Image
          className='mx-auto mb-4'
          src={'/assets/astronaut_hurray.png'}
          height={200}
          width={200}
        />
        <Sismo />
      </div>
    </>
  );
};

export default SismoModal;
