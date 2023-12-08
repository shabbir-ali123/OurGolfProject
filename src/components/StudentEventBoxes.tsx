// EventBoxes.tsx
import React from "react";

const EventBoxes: React.FC = () => {
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mx-auto my-4 gap-1 md:gap-2 lg:gap-2 z-[9999]">
      
        <div className=" cursor-pointer text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-1 md:px-2 lg:px-0 hover:animate-bounce">
          <h3 className="text-black font-semibold font-sans text-lg m-0 ">
            14
          </h3>
          <h4 className="text-center font-sans text-xs font-semibold m-0">
          Completed 
          </h4>
          <h4 className="text-center font-sans text-xs font-semibold m-0">Lesson</h4>
        </div>
        <div className="cursor-pointer text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-2 hover:animate-bounce">
          <h3 className="text-black font-semibold font-sans text-lg m-0 ">
            3
          </h3>
          <h4 className="text-center font-sans text-xs font-semibold my-0 ">
          Upcoming
          </h4>
          <h4 className="text-center font-sans text-xs font-semibold my-0">Lesson</h4>
        </div>
        <div className="cursor-pointer text-center  border-solid  border-2 border-[#51ff85] rounded-md py-1 px-2 hover:animate-bounce">
          <h3 className="text-black font-semibold font-sans text-lg my-0 ">
            1
          </h3>
          <h4 className="text-center font-sans text-xs font-semibold my-0">
          Pending
          </h4>
          <h4 className="text-center font-sans text-xs font-semibold my-0">Lesson</h4>
        </div>
      </div>
  
  );
};

export default EventBoxes;