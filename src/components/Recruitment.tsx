import React, { useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecruitmentTabs from "../components/RecruitmentTabs";
const Recruitment: React.FC = () => {
 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div
      className="lg:max-w-6xl mx-auto px-2 py-8 "
    
    >
      <h2 className="text-[#0f1e56] text-4xl">Recruitment Details</h2>
      <div className=" bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <form className="grid grid-cols-9 mx-auto lg:gap-x-16  px-4 py-8  ">
          <div className="flex items-center gap-2 col-span-5 lg:col-span-6 py-1  md:col-span-5   md:mr-0 md:mb-3 ">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-event-name"
            >
              Number of Players
            </label>
            <input
              className="text-center appearance-none block w-[50px] bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-Event-Name"
              type="number"
              placeholder="5"
            />
          </div>
          <div className=" flex gap-2 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-short-video"
            >
              Include you in the numbers of players
            </label>
            <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center space-x-4 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              htmlFor="date"
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Start Date and Time
            </label>
            <input
              type="date"
              id="date"
              className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
            />

            <input
              type="time"
              id="time"
              placeholder="Select Time:"
              className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              htmlFor="date"
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              End Date and Time
            </label>
            <input
              type="date"
              id="date"
              className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
            />

            <input
              type="time"
              id="time"
              placeholder="Select Time:"
              className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4 col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
            <label
              htmlFor="date"
              className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Application Deadline
            </label>
            <input
              type="date"
              id="date"
              placeholder="Enter Date"
              className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
            />

            <input
              type="time"
              id="time"
              placeholder="Enter Time"
              className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4 col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
            <RecruitmentTabs />
          </div>
          <div className="flex items-center space-x-4 col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
            <label
              htmlFor="date"
              className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Team Size
            </label>
            <input
              className="text-center appearance-none block w-[80px] bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-Event-Name"
              type="number"
              placeholder="15"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recruitment;
