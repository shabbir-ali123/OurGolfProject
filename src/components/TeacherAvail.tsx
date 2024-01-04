import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Availability = {
  [date: string]: {
    [day: string]: boolean[];
  };
};

const hoursOfDay: string[] = Array.from({ length: 24 }, (_, i) => {
  const startHour = i.toString().padStart(2, "0");
  const endHour = ((i + 1) % 24).toString().padStart(2, "0");

  return `${startHour}:00 to ${endHour}:00`;
});

const initialAvailability: Availability = {};

const Calendar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Date | null>(null);
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null); // Declare setSelectedWeekStart here
  const [availability, setAvailability] =
    useState<Availability>(initialAvailability);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [click, setClick] = useState(false);
  const [buttonActiveStates, setButtonActiveStates] = useState<boolean[]>(
    Array.from({ length: hoursOfDay.length }, () => false)
  );

  useEffect(() => {
    // Scroll to the 8:00 time slot on initial render
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && selectedWeekStart) {
      const hourIndex = hoursOfDay.findIndex((hour) => hour.startsWith("08:"));
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

  const toggleAvailability = (day: string, hourIndex: number): void => {
    if (!selectedWeekStart) {
      return;
    }
    setAvailability((prev) => {
      const dateKey = selectedWeekStart.toLocaleDateString();
      const dateAvailability = { ...(prev[dateKey] || {}) };
      const dayAvailability = [...(dateAvailability[day] || [])];
      dayAvailability[hourIndex] = !dayAvailability[hourIndex];
      dateAvailability[day] = dayAvailability;
      prev[dateKey] = dateAvailability;
      return { ...prev };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedTimeSlots);
  };

  const handleTabClick = (date: Date) => {
    setSelectedWeekStart(date);
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-xl font-semibold mb-4">Weekly Availability</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="grid grid-cols-8 gap-4 text-center">
          <div className="col-span-1 font-bold">Time</div>
          {selectedWeekStart &&
            Array.from({ length: 7 }, (_, i) => {
              const date = new Date(
                selectedWeekStart.getTime() + i * 24 * 60 * 60 * 1000
              );
              return (
                <div
                  key={date.toLocaleDateString()}
                  className={`col-span-1 font-bold ${
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
          className="grid grid-cols-8 gap-4 text-center overflow-auto"
          style={{ maxHeight: "50vh" }}
        >
          {hoursOfDay.map((hour, hourIndex, array) => (
            <React.Fragment key={hour}>
              <div className="col-span-1 time-slot">{hour}</div>
              {selectedWeekStart &&
                Array.from({ length: 7 }, (_, i) => {
                  const date = new Date(
                    selectedWeekStart.getTime() + i * 24 * 60 * 60 * 1000
                  );
                  const dateKey = date.toLocaleDateString();

                

                  return (
                    <button
                      key={dateKey + hour}
                      className={`col-span-1 time-slot ${
                        dateKey === selectedTab?.toLocaleDateString()
                          ? "bg-green"
                          : "bg-red"
                      } ${buttonActiveStates[hourIndex] ? "bg-black" : ""}`}
                      id={hour}
                      onClick={() => toggleAvailability(dateKey, hourIndex)}
                    >
                      {buttonActiveStates[hourIndex]
                        ? `Selected: ${hour}`
                        : hour}
                    </button>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Calendar;
