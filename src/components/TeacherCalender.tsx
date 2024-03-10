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
import { teacherContext } from "../contexts/teachersContext";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(" ");
}

const isDayDisabled = (day:any, startEndDates:any) => {
  const inRange = startEndDates?.some(({ startDate, endDate }:any) =>
    isWithinInterval(day, {
      start: parseISO(startDate),
      end: parseISO(endDate),
    })
  );

  if (!inRange) return true;

  const dayOfWeek = format(day, "EEEE");

  return !startEndDates.some(({ shifts }:any) =>
    shifts.some((shift:any) => shift.day === dayOfWeek)
  );
};

export const TeacherCalender = ({ startEndDates, onMatchedShifts, onClicked }:any) => {
  const { handleShift, shift } = teacherContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [matchedShifts, setMatchedShifts] = useState([]);
  const [click, setClick] = useState<boolean>(false);


  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  useEffect(() => {
    const formattedMonth = format(selectedDate, "EEEE");
    const matchedShifts = startEndDates.flatMap(({ shifts }:any) =>
      shifts.filter((shift:any) => shift.day.toLowerCase() === formattedMonth.toLowerCase())
    );
    setMatchedShifts(matchedShifts);
  }, [selectedDate, startEndDates]);

  const handleDateClick = (date:any) => {
    if (!isDayDisabled(date, startEndDates)) {
      setSelectedDate(date);
      setClick(!click)
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  useEffect(() => {
    onClicked(click)
    onMatchedShifts(matchedShifts);
  }, [selectedDate, startEndDates]);
  return (
    <>
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
                  disabled={isDayDisabled(day, startEndDates)}
                  className={classNames(
                    "py-1.5 hover:bg-gray-100 focus:z-10",
                    isSameMonth(day, currentMonth) ? "text-gray-900" : "text-gray-300",
                    !isDayDisabled(day, startEndDates) ? "hover:bg-blue-100" : "cursor-not-allowed",
                    isSameDay(day, selectedDate) ? "bg-blue-200 text-black" : "",
                    isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? "text-red-600" : ""
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
