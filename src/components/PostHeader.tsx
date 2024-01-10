import React from 'react';

const PostHeader: React.FC = () => {
  return (
    <div className="flex justify-end items-center ">
      
      <div className=''>
        <div className=" relative flex items-center">
          <button className="text-md font-semibold bg-transparent">Filter</button>
          <select className="block appearance-none w-full bg-white border-solid border-[#51ff85] hover:border-gray-500 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Party</option>
            <option>Before Match</option>
            <option>Match</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
