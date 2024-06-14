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
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import i18n from "../../locale";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const SlotsCalender = ({ startEndDates, onMatchedShifts, onClicked, dayFilter, onWeekSelected }: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [click, setClick] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  useEffect(() => {
    const formattedMonth = format(selectedDate, "EEEE");
    const matchedShifts = startEndDates?.flatMap(({ shifts }: any) =>
      shifts.filter((shift: any) => shift.day.toLowerCase() === formattedMonth.toLowerCase())
    );
    onWeekSelected(selectedDate);
  }, [selectedDate, startEndDates]);

  const handleDateClick = (date: any) => {
    setSelectedDate(date);
    setClick(true);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const formatDate = (date: any) => {
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
    });
    return formatter.format(date);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="w-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] py-8">
        <div className="lg:grid lg:grid-cols-4 justify-center">
          <div className="lg:col-span-8 xl:col-span-9 px-4">
            <div className="flex items-center justify-between mx-2 my-2 text-gray-900">
              <div className="font-inter font-semibold text-[#009C2F]">
                {formatDate(currentMonth)}
              </div>
              <div className="flex gap-2 py-2">
                <button
                  onClick={handlePrevMonth}
                  className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center"
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-2 bg-gray-200 text-center font-semibold"
                >
                  {day}
                </div>
              ))}
              {days.map((day) => (
                <button
                  key={
                    day.toString()}
                    onClick={() => handleDateClick(day)}
                    className={classNames(
                      "py-4 px-1  text-black hover:bg-gray focus:z-10 border-2 border-solid border-white",
                      isSameMonth(day, currentMonth) ? "text-gray-900" : "text-gray-300",
                      isSameDay(day, selectedDate) ? "bg-blue-800 text-white" : "",
                      isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? "text-red-600" : ""
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, " d MMM")}
                    </time>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
