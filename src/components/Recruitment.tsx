import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";

export type Tab = "individual" | "team";

interface RecuitmentsProps {
  onChange: (formData: Record<string, any>, eventType: Tab) => void;
}

const Recuitments: React.FC<RecuitmentsProps> = ({ onChange }) => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("individual");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const prevFormData = useRef<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Set the default tab to "individual" when the component mounts
    handleTabClick("individual");
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount
  useEffect(() => {
    prevFormData.current = formData;
  }, [formData]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);

    // Pass the updated tab information through the onChange prop
    onChange(formData, tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const currentDate = new Date().toISOString().split("T")[0];
    // Determine the input type
    const isCheckbox = type === "checkbox";
  
    // Convert the value to a number if it's not a checkbox
    const numericValue = isCheckbox ? checked : parseInt(value, 10);
  
    // List of fields that should remain as strings
    const stringFields = [
      "eventStartDate",
      "eventStartTime",
      "eventEndDate",
      "eventEndTime",
      "eventDeadlineDate",
      "eventDeadlineTime",
    ];
    if (name === "eventStartDate") {
      // Validate that the Start Date is equal to or greater than the current date
      const isValidStartDate = value >= currentDate;
      if (!isValidStartDate) {
        setError("Start Date should be equal to or greater than the current date.");
        return;
      }
    }

    if (name === "eventEndDate") {
      // Validate that the End Date is not less than the Start Date
      const startDate = formData["eventStartDate"];
      const isValidEndDate = startDate && value >= startDate;
      if (!isValidEndDate) {
        setError("End Date should be equal to or greater than the Start Date.");
        return;
      }
    }
    setError(null);

    // Handle time format with AM/PM
    if (name === "eventStartTime" || name === "eventEndTime" || name === "eventDeadlineTime") {
      const [hours, minutes] = value.split(":");
      const twelveHourFormat = parseInt(hours, 10) > 12 ? parseInt(hours, 10) - 12 : parseInt(hours, 10);
      const ampm = parseInt(hours, 10) >= 12 ? "PM" : "AM";
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: `${twelveHourFormat}:${minutes} ${ampm}`,
      }));
    } else {
      // Update formData using the previous state
      setFormData((prevData) => ({
        ...prevData,
        [name]: stringFields.includes(name) ? value : numericValue,
      }));
    }
  
    if (formData[name] !== prevFormData.current[name]) {
      onChange(formData, activeTab);
    }
  };
  
  return (
    <div className="py-8 mx-auto lg:max-w-6xl  ">
      
      <div className="bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50  p-4 mt-4">
      <h2 className="text-white text-4xl">{t('RECRUITMENT_DETAILS')}</h2>
        <div className="flex items-center col-span-5 gap-2 py-1 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3 ">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-white captilize"
            htmlFor="grid-event-name"
          >
            {t('NO_OF_PLAYERS')}
          </label>
          <input
            className=" appearance-none block w-[50px] bg-gray-200 text-[#51ff85] border border-[#51ff85] bg-transparent rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-Event-Name"
            type="number"
            name="capacity"
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex col-span-12 gap-2 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-white captilize"
            htmlFor="grid-short-video"
          >
            {t('INCLUDE_PLAYER')}
          </label>
          <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
            <input
              type="checkbox"
              className="sr-only peer"
              name="selfIncluded"
              onChange={handleInputChange}
            />
            <div className="w-11 h-5 border border-solid border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

        </div>
        {error && <p className="text-[red]">{error}</p>}
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-white captilize"
          >
            {t('START_TIME')}
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
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-white captilize"
          >
            {t('END_TIME')}
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
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-white capitalize"
          >
            {t('APPLICATION_DEADLINE')}
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
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <div className="">
            <div className="">
              <h2 className="text-white">{t('MATCH_TYPE')}</h2>
              <div className="flex gap-2 mx-4">
                <button
                  className={`${
                    activeTab === "individual"
                      ? "bg-blue-500 text-white cursor-pointer animate-bounce border-none"
                      : "text-white border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 hover:scale-105 transform transition duration-300 ease-in-out"
                  } px-4 py-2 border rounded-full`}
                  type="button"
                  onClick={() => handleTabClick("individual")}
                >
                  {t('INDIVIDUAL')}
                </button>

                <button
                  className={`${
                    activeTab === "team"
                      ? "bg-blue-500 text-white cursor-pointer animate-bounce"
                      : "text-white border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 over:scale-105 transform transition duration-300 ease-in-out"
                  } px-4 py-2   rounded-full`}
                  type="button"
                  onClick={() => handleTabClick("team")}
                >
                  {t('TEAM')}
                </button>
              </div>
              {activeTab === "individual" && <div></div>}

              {activeTab === "team" && (
                <div>
                  <div className="col-span-8 py-2 mt-4 ml-4 lg:col-span-7 md:col-span-5 md:mr-0 md:mb-0 ">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-white captilize"
                      htmlFor="grid-event-name"
                    >
                      {t('TEAM_SIZE')}
                    </label>
                    <input
                      className="appearance-none block w-[80px] bg-gray-200 text-white border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-2 px-2 mb-0 leading-tight focus:outline-none focus:bg-white"
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
