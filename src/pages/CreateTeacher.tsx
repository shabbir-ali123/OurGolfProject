import React, { useEffect, useRef, useState } from "react";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import InputWithIcon from "../components/FormComponents";
import ProfileAvatar from "../components/ProfileAvatar";
import { ShareIcon } from "@heroicons/react/20/solid";
import CalendarSlider from "../components/CalendarSlider";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";

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

const CreateTeacher: React.FC = () => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const [formData, setFormData] = useState({
    aboutMyself: "",
    firstName: "",
    lastName: "",
    // Your Hourly Rate: "",
    phoneNumber: "",
    location: "",
    schedules: [
      {
        startDate: "",
        endDate: "",
        shifts: [
          {
            day:"", 
            startTime: "",
            endTime: ""
          }
        ]
      }
    ],
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
      const hourIndex = findHourIndex("08:00"); 
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
    const schedulesData = selectedTimeSlots.map((timeSlot) => {
      const [timeRange, , date] = timeSlot.split(' on ');
      const [startTime, endTime] = timeRange.split(' to ');
      const day = timeSlot.split('on ')[1].split(' -')[0].trim();

      return {
        startDate: selectedWeekStart?.toISOString(),
        endDate: selectedWeekStart?.toISOString(), 
        shifts: [{
          day, 
          startTime,
          endTime,
        }],
      };
    });
  
    const payload = {
      ...formData,
      schedules: schedulesData,
    };
    try {
      const response = await axios.post(API_ENDPOINTS.BECOMETEACHER, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        localStorage.setItem("teacher_id", response.data.teacher.id);
        toast.success('Teacher Created Successfully', toastProperties as ToastConfig)
      }
    } catch (error) {
      const handleError = alert((error as any)?.response?.data?.message || "Error Occurred");
      toast.error(`${handleError}`, toastProperties as ToastConfig)
    } 
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
    const dayName = dateParts.find((part) => part.type === "weekday")?.value || ""; 
    toggleAvailability(dayName, hour, hourIndex);
  
    const newShift = {
      day: 'sunday', 
      startTime: hour,
      endTime: "", 
    };
  
    const newSchedule = {
      startDate: selectedWeekStart?.toISOString() || "",
      endDate: selectedWeekStart?.toISOString() || "",
      shifts: [newShift],
    };
  
    setFormData((prevFormData) => {
      const newSchedules = [...prevFormData.schedules, newSchedule];
      return {
        ...prevFormData,
        schedules: newSchedules,
      };
    });
  };
  
  

  
  return (
    <div className="py-8">
      <ProfileAvatar
        pname=""
        icon={<ShareIcon />}
        label={t('FIRST_NAME')}
        imageUrl="https://example.com/api/profile-image/john"
        onChangeImage={(file) => {
          console.log("Selected file:", file);
        }}
        placeholder={t('FIRST_NAME')}
        colSpanSm={6}
        colSpanMd={4}
        colSpanLg={2}
      />

      <section className="h-full max-w-6xl mx-auto mt-6 text-center">
        <div className="w-full py-6 text-start">
          <label className="text-lg font-bold" htmlFor="aboutMe">
            {t('ABOUT')}
          </label>
          <textarea
            id="aboutMyself"
            name="aboutMyself"
            value={formData.aboutMyself}
            onChange={handleChange}
            rows={4}
            className="w-full border border-[#51ff85]"
            placeholder={t('BIO')}
          ></textarea>
        </div>

        <div className="py-6">
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4 text-start">
              <InputWithIcon
                pname="firstName"
                icon={<UserIcon />}
                label={t('FIRST_NAME')}
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('ENTER_FIRST_NAME')}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="lastName"
                icon={<UserIcon />}
                label={t('LAST_NAME')}
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('ENTER_LAST_NAME')}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="hourlyRate"
                icon={<EnvelopeOpenIcon />}
                label={t('Hourly')}
                onChange={handleChange}
                placeholder={t('ENTER_RATE')}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="phoneNumber"
                icon={<PhoneIcon />}
                label={t('MOBILE')}
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={t('ENTER_MOBILE')}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="location"
                icon={<MapPinIcon />}
                label={t('LOCATION')}
                value={formData.location}
                onChange={handleChange}
                placeholder={t('ENTER_LOCATION')}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
            </div>
            <div className="my-4 ">
              <CalendarSlider onWeekSelected={handleWeekSelected} />
              <div className="grid grid-cols-8 gap-4 py-2 text-center">
                <div className="col-span-1 font-bold ">{t('TIME')}</div>
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
                        {t(getDayName(date).toLocaleUpperCase())}
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
              {t('UPDATE')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateTeacher;
