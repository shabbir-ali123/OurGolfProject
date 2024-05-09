import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import i18n from "../../locale";
;

function classNames(...classes:any) {
  return classes.filter(Boolean).join(" ");
}

export const ActivitiesCalender = ({ onWeekSelected }:any) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  useEffect(() => {
    const formattedDate = selectedDate !== null && format(selectedDate, "yyyy-MM-dd");
    onWeekSelected(formattedDate)
  }, [selectedDate]);

  const handleDateClick = (date:any) => {
    console.log(date,'sdsd')
      setSelectedDate(date);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const formatDate = (date:any) => {
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
    });
    return formatter.format(date);
  };
  return (
    <>
      <div className=" w-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] py-2 ">
        <div className="lg:grid lg:grid-cols-4 justify-center">
          <div className="lg:col-span-8 xl:col-span-9 px-4">
            <div className="flex items-center justify-between mx-2 my-2 text-gray-900 ">
              <div className="font-inter font-semibold text-[#009C2F]">
                {formatDate(currentMonth)}
              </div>
              <div className="flex gap-2 py-2">
                <button onClick={handlePrevMonth} className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center" >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button onClick={handleNextMonth} className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center">
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {days.map((day) => (
                <button
                  key={day.toString()}
                  onClick={() => handleDateClick(day)}
                  className={classNames(
                    "py-1.5 bg-[#2dd4bf] text-white hover:bg-gray focus:z-10",
                    isSameMonth(day, currentMonth) ? "text-gray-900" : "text-gray-300",
                    selectedDate !== null && isSameDay(day, selectedDate) ? "bg-blue-200 text-black" : "",
                    selectedDate && !isSameDay(day, selectedDate) ? "" : "text-red-600"
                )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};
