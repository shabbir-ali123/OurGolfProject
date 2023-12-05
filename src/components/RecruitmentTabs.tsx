import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>("individual");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
        <p className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-6">Match Type</p>
      <div className="flex items-center gap-2">
        <div
          onClick={() => handleTabClick("individual")}
          className={`cursor-pointer  rounded-full px-3 py-2 flex justify-center items-center ${
            activeTab === "individual"
              ? "text-white bg-[#0038FF] hover:bg-blue-800 focus:outline-none focus:ring-4   font-medium rounded-full text-sm px-5 py-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : "bg-transparent border-solid border-2 border-[#0038FF] text-[#0038FF] "
          }`}
        >
          Individual
        </div>
        <button
          onClick={() => handleTabClick("team")}
          type="button"
          className={`cursor-pointer bg-blue-500 rounded-full px-8 py-2 ${
            activeTab === "team"
              ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none   font-medium rounded-full text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : "bg-transparent border-solid border-2 border-[#0038FF] text-[#0038FF]"
          }`}
        >
          Team
        </button>
      </div>
    </div>
  );
};

export default Tabs;
