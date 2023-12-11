import React, { useRef, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Tab = "Individual" | "Team";

const RecruitmentTabs = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [activeTab, setActiveTab] = useState<Tab>("Individual");

  const handleTabClick = (tab: Tab, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(tab);
    
    event.preventDefault();
    
  };

  return (
    <div className=" ">
      <div className="">
        <div className="flex gap-2">
          <button
            className={`${
              activeTab === "Individual"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce border-none"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 hover:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2 border rounded-full`}
            onClick={(event) => handleTabClick("Individual", event)}
          >
            Individual
          </button>
          <button
            className={`${
              activeTab === "Team"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 over:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2   rounded-full`}
            onClick={(event) => handleTabClick("Team", event)}
          >
            Team
          </button>
        </div>

        {activeTab === "Individual" && (
          <div>{/* Individual tab content */}</div>
        )}

        {activeTab === "Team" && (
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
              name="teamSize"
              type="number"
              placeholder="15"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentTabs;