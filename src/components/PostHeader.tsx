import React, { useState } from 'react';
import { postContext } from '../contexts/PostsContext';
interface FilterCategory {
}

const PostHeader: React.FC<FilterCategory> = () => {
  const {handleCategory} = postContext();

  return (
    <div className="flex items-center justify-end ">
      
      <div className=''>
        <div className="relative flex items-center ">
          <button className="font-semibold bg-transparent text-md">Filter</button>
          <select className="block appearance-none w-full bg-white border-solid border-[#51ff85] hover:border-gray-500 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"  onChange={(e) => handleCategory(e.target.value)}>
            <option>Public</option>
            <option>Private</option>
            
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
