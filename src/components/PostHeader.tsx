import React from 'react';
import { postContext } from '../contexts/postsContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FilterCategory {}

const PostHeader: React.FC<FilterCategory> = () => {
  const { handleCategory } = postContext();

  return (
    <div className="grid grid-cols-1 mx-10 md:mx-0  md:grid-cols-12 gap-10 items-center justify-between ">

      <div className="relative mt-2 rounded-md shadow-sm mx- md:col-span-10">
        <input
          type="text"
          name="account-number"
          id="account-number"
          className="w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
        />
        <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      <div className="relative flex items-center md:col-span-2">
        <button className="font-semibold bg-transparent text-md">Filter</button>
        <select
          className="block appearance-none w-full bg-white border-solid border-[#51ff85] hover:border-gray-500 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => handleCategory(e.target.value)}
        >
          <option>Public</option>
          <option>Private</option>
        </select>
      </div>
    </div>
  );
};

export default PostHeader;
