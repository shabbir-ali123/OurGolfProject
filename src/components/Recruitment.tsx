import React, { useRef, useState, ChangeEvent, useEffect } from "react";

export type Tab = "individual" | "team";

interface RecuitmentsProps {
  onChange: (formData: Record<string, any>, eventType: Tab) => void;
}

const Recuitments: React.FC<RecuitmentsProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("individual");
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Set the default tab to "individual" when the component mounts
    handleTabClick("individual");
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);

    // Pass the updated tab information through the onChange prop
    onChange(formData, tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({value})
    // Update formData using the previous state
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Call the onChange prop with the updated data and activeTab
    onChange({ ...formData, [name]: value }, activeTab);
  };


  

  return (
    <div className="lg:max-w-6xl mx-auto px- py-8  ">
      <h2 className="text-[#0f1e56] text-4xl">Recruitment Details</h2>
      <div className=" bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl px-8 py-4 mt-4 border-solid border-2 border-[#51ff85]">
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
            name="capacity"
            min="0"
            onChange={handleInputChange}
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
            <input
              type="checkbox"
              
              className="sr-only peer"
              name="selfIncluded"
              onChange={handleInputChange}
              />
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
            name="eventStartDate"
            onChange={handleInputChange}
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventStartTime"
            onChange={handleInputChange}
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
            name="eventEndDate"
            onChange={handleInputChange}
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventEndTime"
            onChange={handleInputChange}
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
            name="eventDeadlineDate"
            onChange={handleInputChange}
            placeholder="Enter Date"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventDeadlineTime"
            onChange={handleInputChange}
            placeholder="Enter Time"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4 col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
          <div className=" ">
            <div className="">
              <h2>Match Type</h2>
              <div className="mx-4 flex gap-2">
          <button
            className={`${
              activeTab === "individual"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce border-none"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 hover:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2 border rounded-full`}
            onClick={() => handleTabClick("individual")}
          >
            individual
          </button>

          <button
            className={`${
              activeTab === "team"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 over:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2   rounded-full`}
            onClick={() => handleTabClick("team")}
          >
            team
          </button>
        </div>
        {activeTab === "individual" && (
          <div>
           
          </div>
        )}

        {activeTab === "team" && (
          <div>
          <div className="col-span-8 lg:col-span-7 py-2  md:col-span-5   md:mr-0 md:mb-0 mt-4 ml-4 ">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-event-name"
                >
                  Team Size
                </label>
                <input
                  className="appearance-none block w-[80px] bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-2 px-2 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-Event-Name"
                  type="number"
                  name="teamSize"
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};


export default Recuitments;
