import { useRef, useState } from "react";
import ScoringTable from "../components/ScoringTable";
type Tab = "bank" | "paypal";

const ScoringTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>("bank");

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-2 ">
      <div className="">
        <div className="flex justify-between gap-2 mx-8 ">
          <div className="flex gap-2">
            <button
              className={` ${
                activeTab === "bank"
                  ? "bg-purple-600 rounded-md p-4 cursor-pointer animate-bounce border-none py-4 px-20 text-white text-lg"
                  : "bg-[#EEEEEE] rounded-md p-4 cursor-pointer  border-none py-4 px-20 text-purple-600  text-lg font-bold"
              } px-4 py-2 border rounded-full`}
              onClick={() => handleTabClick("bank")}
            >
              Team View
            </button>
            <button
              className={`${
                activeTab === "paypal"
                  ? "bg-purple-600 rounded-md p-4 cursor-pointer animate-bounce border-none py-4 px-20 text-white text-lg"
                  : "bg-[#EEEEEE] rounded-md p-4 cursor-pointer  border-none py-4 px-20 text-purple-600  text-lg font-bold"
              } px-4 py-2   rounded-full`}
              onClick={() => handleTabClick("paypal")}
            >
              Individual Score
            </button>
          </div>
          <button className="bg-[#65BCFE] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex gap-2 items-center text-lg hover:animate-bounce cursor-pointer">
            <svg
              width="28"
              height="28"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 33C25.8368 33 33 25.8368 33 17C33 8.1632 25.8368 1 17 1C8.1632 1 1 8.1632 1 17C1 25.8368 8.1632 33 17 33Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24.6324 19.4C23.6132 22.6456 20.5812 25 16.9988 25C13.4172 25 10.3844 22.6456 9.36523 19.4V24.2M24.6324 9.8V14.6C23.6132 11.3544 20.5812 9 16.9988 9C13.4172 9 10.3844 11.3544 9.36523 14.6"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>Update Score</span>
          </button>
        </div>

        {activeTab === "bank" && (
          <div>
            <ScoringTable />
          </div>
        )}

        {activeTab === "paypal" && (
          <div>
            <ScoringTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoringTabs;
