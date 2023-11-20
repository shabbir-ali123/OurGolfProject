import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <div className="flex flex-wrap  items-center gap-2 mb-4 xl:m-0 ">
      <div className="flex items-center">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          placeholderText="Start Date"
          className="py-3.5 rounded-md border-none"
        />
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
