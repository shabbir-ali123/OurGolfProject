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
    <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
      <DatePicker
        selected={startDate}
        onChange={setStartDate}
        placeholderText={t('START_DATE')}
        className=" py-2.5 text-center rounded-md border border-solid border-green-500"
      />
      <DatePicker
        selected={endDate}
        onChange={setEndDate}
        placeholderText={t('END_DATE')}
        className=" py-2.5 text-center rounded-md border border-solid border-green-500"
      />
      <button
        className="bg-[#17b3a6] text-white font-bold py-3 w-full xl:w-[100px] rounded"
        onClick={clearDates}
      >
        {t("CLEAR")}
      </button>
    </div>
  );
};


export default Calendar;
