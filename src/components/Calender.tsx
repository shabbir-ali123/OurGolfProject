import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { fetchEvents } from "../utils/fetchEvents";
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";

interface CalendarProps {
  setEvents: any;
  setFilterLocation:any;
}

const Calendar: React.FC<CalendarProps> = ({ setEvents,setFilterLocation }) => {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    // fetchEvents(date, endDate, setEvents);

  };
  
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    // fetchEvents(startDate, date, setEvents);
  };
  const {handleStartDate, handleEndDate, handleLocationFilter, handleClear, clearFilter} = eventContextStore();

  useEffect(() => {
    handleStartDate(startDate);
    handleEndDate(endDate);
  }, [startDate, endDate]);
  
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    handleClear(true);
    setFilterLocation([]);
};
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center  w-full gap-12">
      <DatePicker
        selected={startDate}
        onChange={setStartDate}
        placeholderText={t('START_DATE')}
        className=" py-4 text-center  rounded-md shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] border-none bg-[#f0f0f0]  "
      />
      <DatePicker
        selected={endDate}
        onChange={setEndDate}
        placeholderText={t('END_DATE')}
        className=" py-4 text-center  rounded-md shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] border-none bg-[#f0f0f0]  "
      />
      {/* <button
        className="bg-[#17b3a6] text-white font-bold py-[19px] w-full  rounded"
        onClick={clearDates}
      >
        {t("CLEAR")}
      </button> */}
    </div>
  );
};


export default Calendar;
function setFilterLocation(arg0: never[]) {
  throw new Error("Function not implemented.");
}

