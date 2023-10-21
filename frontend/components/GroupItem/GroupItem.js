import Image from 'next/image';
import React from 'react';

const GroupItem = ({ group }) => {
  return (
    <div className='flex justify-between items-center px-3 py-4 rounded-xl bg-blue-50 mb-2'>
      <div className='flex items-center gap-4'>
        <Image
          src='/assets/nft1.svg'
          height={50}
          width={50}
          className='rounded-md'
        />
        <div className='text-gray-700 '>
          <p className='font-semibold mb-1'>{group.name}</p>
          <p className='text-sm text-gray-500'>
            {group.joined}/{group.capacity}
          </p>
        </div>
      </div>
      <button className='bg-blue-400 rounded-md px-7 py-2 text-white cursor-none'>
        Join
      </button>
    </div>
  );
};

export default GroupItem;
