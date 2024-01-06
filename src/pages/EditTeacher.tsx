import React, { useEffect, useRef, useState } from "react";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import InputWithIcon from "../components/InputWithIcon";
import ProfileAvatar from "../components/ProfileAvatar";
import { ShareIcon } from "@heroicons/react/20/solid";
import CalendarSlider from "../components/CalendarSlider";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

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

const EditTeacher: React.FC = () => {
  const [formData, setFormData] = useState({
    aboutMe: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [selectedTab, setSelectedTab] = useState<Date | null>(null);
  const [teachAvailData, setTeachAvailData] = useState({}); // Step 1
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStates, setActiveStates] =
    useState<boolean[][]>(initialActiveStates);

  useEffect(() => {
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

  useEffect(() => {
    const filteredActiveStates = activeStates
      .map((dayStates, hourIndex) =>
        dayStates
          .map((isActive, dayIndex) =>
            isActive ? `${hoursOfDay[hourIndex]} on Day ${dayIndex + 1}` : null
          )
          .filter(Boolean)
      )
      .filter((dayStates) => dayStates.length > 0);

    const teachAvailFormData = {
      selectedWeekStart: selectedWeekStart
        ? selectedWeekStart.toISOString()
        : null,
      selectedTimeSlots: selectedTimeSlots,
      activeStates: filteredActiveStates,
    };
    setTeachAvailData(teachAvailFormData);
  }, [activeStates, selectedWeekStart, selectedTimeSlots]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.BECOMETEACHER, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("API Response:", response.data);

      if (response.status === 201) {
        alert("Event created successfullygreen");
      } else {
        alert("Error Occurred");
        alert("Error occurred while creating the event#FF0000]");
      }
    } catch (error) {
      alert((error as any)?.response?.data?.message || "Error Occurred");
      alert("Error occurred while creating the event #FF0000]");
      console.error("Error:", error);
    } finally {
      console.log;
    }
    console.log("Form Data:", formData, teachAvailData);
  };

  const handleWeekSelected = (date: Date) => {
    setSelectedWeekStart(date);
  };

  const handleTabClick = (date: Date) => {
    setSelectedWeekStart(date);
  };

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
          ? dayStates.map((isActive, i) =>
              i === dayIndex ? !isActive : isActive
            )
          : [...dayStates]
      );
      console.log(day, time, hourIndex, "handleclick");
      return newActiveStates;
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

  const handleTimeSlotClick = (
    dateKey: string,
    hour: string,
    hourIndex: number
  ) => {
    const date = new Date(dateKey);
    const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
    const dateParts = dateFormatter.formatToParts(date);
    const dayName = dateParts.find((part) => part.type === "weekday")?.value;
    toggleAvailability(dateKey, hour, hourIndex);
  };

  return (
    <div className="py-8">
      <ProfileAvatar
        pname=""
        icon={<ShareIcon />}
        label="First Name"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter first name"
        colSpanSm={6}
        colSpanMd={4}
        colSpanLg={2}
      />

      <section className="h-full max-w-6xl mx-auto mt-6 text-center">
        <div className="w-full py-6 text-start">
          <label className="text-lg font-bold" htmlFor="aboutMe">
            About Me:
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            rows={4}
            className="w-full border border-[#51ff85]"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <div className="py-6">
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4 text-start">
              <InputWithIcon
                pname="firstName"
                icon={<UserIcon />}
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="lastName"
                icon={<UserIcon />}
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="email"
                icon={<EnvelopeOpenIcon />}
                label="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="mobile"
                icon={<PhoneIcon />}
                label="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile"
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="location"
                icon={<MapPinIcon />}
                label="Location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
            </div>
            <div className="my-4 ">
              <CalendarSlider onWeekSelected={handleWeekSelected} />
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
                          selectedWeekStart.getTime() +
                            dayIndex * 24 * 60 * 60 * 1000
                        );
                        const dateKey = date.toLocaleDateString();
                        const isActive = activeStates[hourIndex][dayIndex];

                        return (
                          <button
                            key={dateKey + hour}
                            type="button"
                            className={`col-span-1 rounded-md py-2 time-slot ${
                              isActive
                                ? "bg-[#B2C3FD] shadow-lg"
                                : "bg-[#F1F1F1]"
                            }`}
                            onClick={() =>
                              handleTimeSlotClick(dateKey, hour, dayIndex)
                            }
                          >
                            {isActive ? `${hour}` : hour}
                          </button>
                        );
                      })}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="px-16 py-4 mt-4 text-white glow-on-hover rounded-full text-[20px]"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditTeacher;
