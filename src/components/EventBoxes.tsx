// EventBoxes.tsx
import React from "react";

const EventBoxes: React.FC = () => {
  return (
    <div className="">
      <div className="grid grid-flow-col auto-rows-max mx-auto gap-2 my-4 ">
      
        <div className=" text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-2">
          <h3 className="text-black font-semibold font-sans text-lg m-0 ">
            14
          </h3>
          <h4 className="text-center font-sans text-xs font-semibold m-0">
          Completed 
          </h4>
          <h4 className="text-center font-sans text-xs font-semibold m-0">Lesson</h4>
        </div>
        <div className=" text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-2">
          <h3 className="text-black font-semibold font-sans text-lg m-0 ">
            3
          </h3>
          <h4 className="text-center font-sans text-xs font-semibold my-0">
          Upcoming
          </h4>
          <h4 className="text-center font-sans text-xs font-semibold my-0">Lesson</h4>
        </div>
        <div className=" text-center  border-solid  border-2 border-[#51ff85] rounded-md py-1 px-2">
          <h3 className="text-black font-semibold font-sans text-lg my-0 ">
            1
          </h3>
          <h4 className="text-center font-sans text-xs font-semibold my-0">
          Pending
          </h4>
          <h4 className="text-center font-sans text-xs font-semibold my-0">Lesson</h4>
        </div>
      </div>
    </div>
  );
};

export default EventBoxes;
