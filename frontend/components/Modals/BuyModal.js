import React, { useState } from 'react';
import GroupItem from '../GroupItem/GroupItem';
import Backdrop from './Backdrop';
import { BsArrowLeftShort } from 'react-icons/bs';
import { SERVER_URL } from '@/constants';

const groups = [
  {
    id: '1',
    name: 'Bored Ape Yacht Club',
    joined: 4,
    capacity: 10,
  },
  {
    id: '1',
    name: 'Bored Ape Yacht Club',
    joined: 4,
    capacity: 10,
  },
  {
    id: '1',
    name: 'Bored Ape Yacht Club',
    joined: 4,
    capacity: 10,
  },
  {
    id: '1',
    name: 'Bored Ape Yacht Club',
    joined: 4,
    capacity: 10,
  },
];

const BuyModal = ({ onClose }) => {
  const [showGroups, setShowGroups] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupCapacity, setGroupCapacity] = useState(0);
  const [chain, setChain] = useState('');

  const createNewGroupHandler = async (e) => {
    try {
      e.preventDefault();
      const data = await fetch(`${SERVER_URL}/create-map`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //data goes here aman mfer
          nft_address: '0x123',
          threshold: groupCapacity,
          chain_id: chain,
          name: groupName,
          holder_address: '0x123',
        }),
      });

      const response = await data.json();
      console.log(response);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className='w-[600px] font-Poppins bg-white p-10 z-20 rounded-xl text-black flex flex-col fixed top-[8rem] left-[50%] -translate-x-[50%] '>
        {!showGroups ? (
          <>
            <button
              onClick={() => {
                setShowGroups(true);
              }}
              className='bg-blue-500 py-3 rounded-md text-white cursor-none'>
              Join Existing Group
            </button>

            <p className='text-center text-xl text-gray-400 my-2'>OR</p>

            <div>
              <p className='text-center font-semibold mb-2 '>
                Create New group
              </p>

              <form onSubmit={createNewGroupHandler}>
                <div>
                  <label className='text-sm text-gray-600 font-medium'>
                    Group Name
                  </label>

                  <input
                    onChange={(e) => {
                      setGroupName(e.target.value);
                    }}
                    value={groupName}
                    type={'text'}
                    placeholder='Bored Ape Club'
                    className='w-full bg-gray-200 py-3 px-2 mt-1 outline-none rounded-md'
                  />
                </div>

                <div className='mt-3 flex gap-10 items-center'>
                  <div>
                    <label className='text-sm text-gray-600 font-medium '>
                      Group Capacity
                    </label>

                    <input
                      onChange={(e) => {
                        setGroupCapacity(e.target.value);
                      }}
                      value={groupCapacity}
                      type={'number'}
                      placeholder='4'
                      onWheel={(e) => e.target.blur()}
                      className='w-full bg-gray-200 py-3 px-2 mt-1 outline-none rounded-md'
                    />
                  </div>

                  <div>
                    <label className='text-sm text-gray-600 font-medium '>
                      Chain
                    </label>

                    <select
                      className='w-full text-sm bg-gray-200 py-3 px-2 mt-1 outline-none rounded-md'
                      value={chain}
                      onChange={(e) => {
                        setChain(e.target.value);
                      }}>
                      <option selected>Select chain here</option>
                      <option value={137}>Polygon</option>
                      <option value={534352}>Scroll</option>
                    </select>
                  </div>
                </div>

                <button
                  type='submit'
                  className='bg-gray-600 w-full py-4 rounded-md mt-4 font-semibold text-white cursor-none'>
                  Create
                </button>
              </form>
            </div>
          </>
        ) : (
          <div>
            <p className='font-semibold flex items-center gap-3 '>
              <span
                onClick={() => {
                  setShowGroups(false);
                }}>
                <BsArrowLeftShort size={30} />
              </span>
              Existing Groups
            </p>

            <div className=' rounded-xl h-[300px] overflow-y-scroll mt-3'>
              {groups.map((group) => (
                <GroupItem
                  key={group.id}
                  group={group}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuyModal;
