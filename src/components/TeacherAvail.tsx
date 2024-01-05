import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarSlider from "./CalendarSlider"; // Import the CalendarSlider component

const hoursOfDay: string[] = Array.from({ length: 24 }, (_, i) => {
  const startHour = i.toString().padStart(2, "0");
  const endHour = ((i + 1) % 24).toString().padStart(2, "0");

  return `${startHour}:00 to ${endHour}:00`;
});

const findHourIndex = (time: string): number => {
  return hoursOfDay.findIndex((hour) => hour.startsWith(time));
};

const initialActiveStates = Array.from({ length: hoursOfDay.length }, () =>
  Array(7).fill(false)
);

const Calendar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Date | null>(null);
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStates, setActiveStates] = useState<boolean[][]>(initialActiveStates);

  const [buttonActiveStates, setButtonActiveStates] = useState<boolean[]>(
    Array.from({ length: hoursOfDay.length }, () => false)
  );

  useEffect(() => {
    // Scroll to the 8:00 time slot on initial render
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && selectedWeekStart) {
      const hourIndex = findHourIndex("08:00"); // Adjust the time as needed
      const hourElement = scrollContainer.querySelector(
        `.time-slot:nth-child(${hourIndex + 1})`
      ) as HTMLElement;
      if (hourElement) {
        scrollContainer.scrollTop = hourElement.offsetTop;
      }
    }
  }, [selectedWeekStart]);

  const getDayName = (date: Date | null): string => {
    if (date) {
      return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    }
    return "";
  };

  const toggleAvailability = (
    day: string,
    time: string,
    dayIndex: number
  ): void => {
    const hourIndex = findHourIndex(time);

    setActiveStates((prev) => {
      const newActiveStates = prev.map((dayStates, index) =>
        index === hourIndex
          ? dayStates.map((isActive, i) => (i === dayIndex ? !isActive : isActive))
          : [...dayStates]
      );
      return newActiveStates;
    });

    setButtonActiveStates((prev) => {
      const newButtonActiveStates = [...prev];
      newButtonActiveStates[hourIndex] = !newButtonActiveStates[hourIndex];
      return newButtonActiveStates;
    });

    const timeSlot = `${hoursOfDay[hourIndex]} on ${day} - ${
      selectedWeekStart?.toLocaleDateString() || ""
    }`;

    setSelectedTimeSlots((prev) => {
      const index = prev.indexOf(timeSlot);
      if (index !== -1) {
        return prev.filter((slot) => slot !== timeSlot);
      } else {
        return [...prev, timeSlot];
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent,) => {
    e.preventDefault();
    // handleFormSubmit();
  };

  const handleTabClick = (date: Date) => {
    setSelectedWeekStart(date);
  };

  const handleTimeSlotClick = (
    dateKey: string,
    hour: string,
    hourIndex: number
  ) => {
    toggleAvailability(dateKey, hour, hourIndex);
  };

  return (
    <div className="my-4 ">
      <h2 className="mb-4 text-xl font-semibold">Weekly Availability</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Select Week Starting Date: </label>
          <DatePicker
            selected={selectedWeekStart}
            onChange={(date) => handleTabClick(date!)}
            dateFormat="MM/dd/yyyy"
            showWeekNumbers
            startDate={selectedWeekStart}
            endDate={
              selectedWeekStart
                ? new Date(
                    selectedWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000
                  )
                : null
            }
            selectsStart
          />
        </div>

        {/* Include the CalendarSlider component */}
        <CalendarSlider />

        <div className="grid grid-cols-8 gap-4 py-2 text-center">
          <div className="col-span-1 font-bold ">Time</div>
          {selectedWeekStart &&
            Array.from({ length: 7 }, (_, i) => {
              const date = new Date(
                selectedWeekStart.getTime() + i * 24 * 60 * 60 * 1000
              );
              return (
                <div
                  key={date.toLocaleDateString()}
                  className={`col-span-1 font-bold  ${
                    date.getTime() === selectedTab?.getTime()
                      ? "selected-tab"
                      : ""
                  }`}
                  onClick={() => handleTabClick(date)}
                >
                  {getDayName(date)}
                </div>
              );
            })}
        </div>
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-8 gap-4 overflow-auto text-center"
          style={{ maxHeight: "50vh" }}
        >
          {hoursOfDay.map((hour, hourIndex) => (
            <React.Fragment key={hour}>
              <div className="col-span-1 time-slot">{hour}</div>
              {selectedWeekStart &&
                Array.from({ length: 7 }, (_, dayIndex) => {
                  const date = new Date(
                    selectedWeekStart.getTime() + dayIndex * 24 * 60 * 60 * 1000
                  );
                  const dateKey = date.toLocaleDateString();
                  const isActive = activeStates[hourIndex][dayIndex];

                  return (
                    <button
                      key={dateKey + hour}
                      className={`col-span-1 rounded-md py-2 time-slot ${
                        isActive ? "bg-[#B2C3FD] shadow-lg" : "bg-[#F1F1F1]"
                      }`}
                      onClick={() => handleTimeSlotClick(dateKey, hour, dayIndex)}
                    >
                      {isActive ? `${hour}` : hour}
                    </button>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
        <button
          type="submit"
          className="px-16 py-4 mt-4 text-white glow-on-hover rounded-full text-[20px]"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Calendar;
