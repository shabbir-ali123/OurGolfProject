import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../utils/getStartedDate";
import { API_ENDPOINTS } from "../appConfig";
import { fetchEvents } from "../utils/fetchEvents";


interface CalendarProps {
  setEvents: any;
}

const Calendar: React.FC<CalendarProps> = ({ setEvents }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    fetchEvents(date, endDate, setEvents);
    console.log(setEvents, "calender");

  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    fetchEvents(startDate, date, setEvents);
  };

  const handleResetDate = () => {
    setStartDate(null);
    setEndDate(null);
    fetchEvents(null, null, null); // Reset dates and fetch events
  };

  
  return (
    <div className="flex items-center gap-2 mb-4 xl:m-0">
      <div className="flex items-center">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          placeholderText="Start Date"
          className="py-3.5 rounded-md border-none"
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
          {/* ... SVG path ... */}
        </svg>
      </div>
      <div className="flex items-center">
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          placeholderText="End Date"
          className="py-3.5  rounded-md border-none"
        />
      </div>
    </div>
  );
};

export default Calendar;
