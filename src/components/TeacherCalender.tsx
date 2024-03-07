import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export const TeacherCalender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const handleDateClick = (date: any) => {
    setSelectedDate(date);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent w-full">
      <div className="lg:grid lg:grid-cols-4 justify-center">
        <div className="lg:col-span-8 xl:col-span-9 px-4">
          <div className="flex items-center justify-between mx-2 my-2 text-gray-900">
            <div className="font-inter font-semibold text-[#009C2F]">
              {format(currentMonth, "MMMM yyyy")}
            </div>
            <div className="flex">
              <button onClick={handlePrevMonth} className="cursor-pointer">
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button onClick={handleNextMonth} className="cursor-pointer">
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
      "py-1.5 hover:bg-gray-100 focus:z-10",
      isSameMonth(day, currentMonth) ? "" : "bg-gray-50",
      isSameDay(day, selectedDate) && "bg-black text-white", // Changed text color here
      isSameDay(day, new Date()) && !isSameDay(day, selectedDate) && "text-red-600"
    )}
  >
    <time dateTime={format(day, "yyyy-MM-dd")}>
      {format(day, "d")}
    </time>
  </button>
))}

          </div>
        </div>
      </div>
    </div>
  );
}
