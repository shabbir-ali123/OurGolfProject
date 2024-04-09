import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export type Tab = "individual" | "team" | "message";
export function formatTimeCreateForm(timeString:any) {
  if (!timeString) return ''; 
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':');
  if (period === 'PM') {
      hours = parseInt(hours, 10) + 12;
  }
  hours = String(hours).padStart(2, '0');
  return `${hours}:${minutes}`;
}
interface RecuitmentsProps {
  onChange: (formData: Record<string, any>, eventType: Tab) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData?: any,
}

const Recuitments: React.FC<RecuitmentsProps> = ({ onChange,setFormData, formData }) => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const [activeTab, setActiveTab] = useState<Tab>("individual");
  // const [formData, setFormData] = useState<Record<string, any>>({});
  const prevFormData = useRef<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleTabClick("individual");
  }, []); 
  useEffect(() => {
    prevFormData.current = formData;
  }, [formData]);

  const handleTabClick = (tab: Tab, message?:any) => {
    if(tab === "team" && message){
       toast.success("Team Size Add succusffull");
    }
    setActiveTab(tab);
    onChange(formData, tab);
  };
  const [selfIncluded, setSelfIncluded] = useState(false);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const currentDate = new Date().toISOString().split("T")[0];
    const isCheckbox = type === "checkbox";
    const numericValue = isCheckbox ? checked : parseInt(value, 10);
    const stringFields = [
      "eventStartDate",
      "eventStartTime",
      "eventEndDate",
      "eventEndTime",
      "eventDeadlineDate",
      "eventDeadlineTime",
    ];
    if(name === "selfIncluded"){
      setSelfIncluded(checked);
      if(formData){
        formData.selfIncluded = selfIncluded;
      }

    }
    if (name === "eventStartDate") {
      const isValidStartDate = value >= currentDate;
      if (!isValidStartDate) {
        setError("Start Date should be equal to or greater than the current date.");
        return;
      }
    }

    if (name === "eventEndDate" && formData?.eventEndDate == "") {
      const startDate = formData["eventStartDate"];
      const isValidEndDate = startDate && value >= startDate;
      if (!isValidEndDate) {
        setError("End Date should be equal to or greater than the Start Date.");
        return;
      }
    }
    setError(null);
    if (name === "teamSize" || name === "capacity") {
      const teamSizeValue = 1;
      if (!isNaN(teamSizeValue) && typeof numericValue === 'number' && numericValue < teamSizeValue) {
        setError("Number of players cannot be less than Team Size.");
        return;
      }
    }
    
    if (name === "eventStartTime" || name === "eventEndTime" || name === "eventDeadlineTime") {

      setFormData((prevData: any) => ({
        ...prevData,
        [name]: formatTimeCreateForm(value),
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: stringFields.includes(name) ? value : numericValue,
      }));
    }

  
  };


  let isEdit = formData?.capacity >= 0 ? false : true;


  return (
    <div className="py-8 mx-auto lg:max-w-7xl ">
      <div className="p-4 mt-4 rounded-md "style={{
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}>
      <h2 className="text-4xl text-[#626262]">{t('RECRUITMENT_DETAILS')}</h2>
      {
        isEdit && 
        <div className="flex items-center col-span-5 gap-2 py-1 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3 ">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
            htmlFor="grid-event-name"
          >
            {t('NO_OF_PLAYERS')}
          </label>
          <input
            className=" appearance-none block w-[50px] bg-gray-200 text-[#51ff85] border border-[#51ff85] bg-transparent rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-Event-Name"
            type="number"
            name="capacity"
            min="1"
            max="300"
            value={formData?.capacity}
            onChange={handleInputChange}
            required
          />
        </div>
      }

        <div className="flex col-span-12 gap-2 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
            htmlFor="grid-short-video"
          >
            {t('INCLUDE_PLAYER')}
          </label>
          <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
            <input
              type="checkbox"
              className="sr-only peer"
              name="selfIncluded"
              checked={formData?.selfIncluded}
              onChange={handleInputChange}
              required
            />
            <div className="w-11 h-5 border border-solid border-[#626262] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#626262] after:border-gray-300 bg-white after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

        </div>
        {error && <p className="text-[red]">{error}</p>}
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
          >
            {t('START_TIME')}
          </label>
          
          <input
            type="date"
            id="date"
            name="eventStartDate"
            value={formData?.eventStartDate}
            onChange={handleInputChange}
            required
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventStartTime"
            onChange={handleInputChange}
            placeholder="Select Time:"
            required
            value={formData?.eventStartTime}
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
          >
            {t('END_TIME')}
          </label>
          <input
            type="date"
            id="date"
            name="eventEndDate"
            value={formData?.eventEndDate}
            onChange={handleInputChange}
            required
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventEndTime"
            onChange={handleInputChange}
            required
            placeholder="Select Time:"
            value={formData?.eventEndTime}
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] capitalize"
          >
            {t('APPLICATION_DEADLINE')}
          </label>
          <input
            type="date"
            id="date"
            name="eventDeadlineDate"
            onChange={handleInputChange}
            value={formData?.eventDeadlineDate}
            required
            placeholder="Enter Date"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventDeadlineTime"
            onChange={handleInputChange}
            value={formData?.eventDeadlineTime}
            required
            placeholder="Enter Time"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        {isEdit &&
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <div className="">
            <div className="">
              <h2 className="text-[#626262]">{t('MATCH_TYPE')}</h2>
              <div className="flex gap-2 mx-4">
                <button
                  className={`${
                    activeTab === "individual"
                      ? "bg-blue-500 text-white cursor-pointer animate-bounce border-none"
                      : "text-[#626262] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 hover:scale-105 transform transition duration-300 ease-in-out"
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
                      : "text-[#626262] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 over:scale-105 transform transition duration-300 ease-in-out"
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
                      className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
                      htmlFor="grid-event-name"
                    >
                      {t('TEAM_SIZE')}
                    </label>
                  <div className="flex gap-2">
                  <input
                      className="appearance-none block w-[80px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-2 px-2 mb-0 leading-tight focus:outline-none "
                      id="teamSize"
                      type="number"
                      name="teamSize"
                      onChange={handleInputChange}
                      min="1"
                      value={formData?.teamSize}
                    />
                      <button
                  className="text-white bg-blue-500 border-none cursor-pointer"
                  type="button"
                  onClick={() => {handleTabClick("team", "message")}}
                >
                  {t('Add')}
                </button>
                  </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
}
      </div>
    </div>
  );
};

export default Recuitments;
