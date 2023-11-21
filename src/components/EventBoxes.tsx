// EventBoxes.tsx
import React from "react";

const EventBoxes: React.FC = () => {
  return (
    <div className="">
      <div className="grid grid-flow-col auto-rows-max mx-auto gap-6 my-4 ">
      
        <div className=" text-center  border-solid border-2 border-[#51ff85] rounded-md py-4">
          <h3 className="text-black font-bold font-sans text-lg m-0 ">
            14
          </h3>
          <h4 className="text-center font-sans text-xs font-bold m-0">
          Completed 
          </h4>
          <h4 className="text-center font-sans text-xs font-bold m-0">Lesson</h4>
        </div>
        <div className=" text-center  border-solid border-2 border-[#51ff85] rounded-md py-4">
          <h3 className="text-black font-bold font-sans text-lg m-0 ">
            14
          </h3>
          <h4 className="text-center font-sans text-xs font-bold my-0">
          Upcoming
          </h4>
          <h4 className="text-center font-sans text-xs font-bold my-0">Lesson</h4>
        </div>
        <div className=" text-center  border-solid border-2 border-[#51ff85] rounded-md py-4">
          <h3 className="text-black font-bold font-sans text-lg my-0 ">
            14
          </h3>
          <h4 className="text-center font-sans text-xs font-bold my-0">
          Pending for
          </h4>
          <h4 className="text-center font-sans text-xs font-bold my-0">Lesson</h4>
        </div>
      </div>
    </div>
  );
};

export default EventBoxes;
