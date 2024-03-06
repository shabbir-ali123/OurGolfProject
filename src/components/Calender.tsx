import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { fetchEvents } from "../utils/fetchEvents";
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";

interface CalendarProps {
  setEvents: any;
}

const Calendar: React.FC<CalendarProps> = ({ setEvents }) => {
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
  const {handleStartDate, handleEndDate} = eventContextStore();

  useEffect(() => {
    handleStartDate(startDate);
    handleEndDate(endDate);
  }, [startDate, endDate]);
  
  console.log(startDate , "actual")
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    // If you need to clear events when dates are cleared, uncomment the next line
    // setEvents([]);
  };
  return (
    <div className="flex items-center gap-2 mb-4 xl:m-0">
      <div className="flex items-center ">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          placeholderText={t('START_DATE')}
          className="py-3.5 rounded-md border border-solid-green-500"
        />
      </div>
      <div className="flex items-center">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        </svg>
      </div>
      <div className="flex items-center ">
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          placeholderText={t('END_DATE')}
          className="py-3.5  rounded-md border border-solid-green-500"
        />
      </div>
      <div className="flex items-center ">
                <button className="bg-[#17b3a6] cursor-pointer text-white font-bold py-4 px-4 rounded" onClick={clearDates}>Clear</button>
              </div>
    </div>
  );
};

export default Calendar;
