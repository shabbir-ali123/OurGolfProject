import React, { useEffect, useRef, useState } from "react";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import InputWithIcon from "../components/FormComponents";
import ProfileAvatar from "../components/ProfileAvatar";
import { ShareIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import CalendarSlider from "../components/CalendarSlider";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserProfile from "../components/TeacherProfile";
import {
  EnvelopeIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import AboutTeacher from "../components/AboutTeacher";
import VideoPortfolio from "../components/TeacherPortfolio";

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
  const { t, i18n } = useTranslation();
  const [videoVisible, setVideoVisible] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    profileImg: [],
    aboutMyself: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
    introduction: "",
    mediaFiles: [],
    schedules: [
      {
        startDate: "",
        endDate: "",
        shifts: [
          {
            day: "",
            startTime: "",
            endTime: "",
          },
        ],
      },
    ],
  });

  console.log(formData)
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
            isActive ? `${hoursOfDay[hourIndex]} on Day ${dayIndex}` : null
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

  const handleLocationChange = (location: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: location.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files, "filessl");
    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files).slice(0, 5);
      const formData = new FormData();

      filesArray.forEach((file, index) => {
        formData.append(`mediaFile${index}`, file);
      });
      setSelectedFiles([...selectedFiles, ...filesArray]);
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        mediaFiles: [...prevFormData.mediaFiles, ...filesArray],
      }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const onfitmData = selectedTimeSlots.map((timeSlot) => {
      const [timeRange, , date] = timeSlot.split(" on ");
      const [startTime, endTime] = timeRange.split(" to ");
      const day = timeSlot.split("on ")[1].split(" -")[0].trim();

      const endDates = new Date(selectedWeekStart!);
      endDates.setDate(selectedWeekStart!.getDate() + 7); // Add 7 days to the selectedWeekStart

      const newEndDate = endDates.toISOString().split("T")[0];
      const formatedDate = new Date(selectedWeekStart!);
      formatedDate.setMinutes(
        formatedDate.getMinutes() - formatedDate.getTimezoneOffset()
      );
      const formattedDate = formatedDate.toISOString().split("T")[0];

      return {
        startDate: formattedDate,
        endDate: newEndDate,
        shifts: [
          {
            day,
            startTime,
            endTime,
          },
        ],
      };
    });

    const payload = {
      ...formData,
      schedules: onfitmData,
    };

    try {
      const response = await axios.post(API_ENDPOINTS.BECOMETEACHER, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        localStorage.setItem("teacher_id", response.data.teacher.id);
        toast.success(
          "Teacher Created Successfully",
          toastProperties as ToastConfig
        );
      }
    } catch (error) {
      toast.error("Teacher Already Created");
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
    dateKey: any,
    hour: string,
    hourIndex: number
  ) => {
    const date = new Date(dateKey);

    if (!isNaN(date.getTime())) {
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      });
      const dateParts = dateFormatter.formatToParts(date);
      const dayName =
        dateParts.find((part) => part.type === "weekday")?.value || "";
      toggleAvailability(dayName, hour, hourIndex);
    } else {
      console.error("Invalid date:", date);
      return; // Exit the function or handle it as required
    }

    const newShift = {
      day: "sunday",
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

  const videoSrc = "/video/video.mp4";
  const posterSrc = "/img/user-06.png";
  // const user = JSON.parse(localStorage.getItem('user') || "");
  return (
    <div className="py-8 ml-[60px]">
      {/* ishdcnksjndckjsndc */}

      <div className="bg-[#17b3a6] p-4 rounded">
        <div className="p-6  rounded  text-white ">
          <div className="flex items-center justify-around">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start ">
              <div className="text-center">
                <ProfileAvatar
                  pname=""
                  icon={<ShareIcon />}
                  label={t("FIRST_NAME")}
                  // imageUrl={user?.imageUrl}
                  onChangeImage={(file: any) => {
                    setFormData((prevFormData: any) => ({
                      ...prevFormData,
                      profileImg: [...prevFormData.mediaFiles, file],
                    }));
                  }}
                  placeholder={t("FIRST_NAME")}
                  colSpanSm={6}
                  colSpanMd={4}
                  colSpanLg={2}
                />
                <div className="mt-4">
                  <div>
                    <button className="bg-green-500 text-[#17b3a6] px-6 py-1 rounded hover:bg-green-600 text-sm md:text-base">
                      Availble
                    </button>
                  </div>
                </div>
              </div>

              <div className="ml-4 grid grid-cols-1 xl:grid-cols-2 gap-6 justify-center ">
                <InputWithIcon
                  pname="firstName"
                  icon={<UserIcon />}
                  label={t("FIRST_NAME")}
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t("ENTER_FIRST_NAME")}
                  colSpanSm={6}
                  colSpanMd={4}
                  colSpanLg={2}
                />
                <InputWithIcon
                  pname="hourlyRate"
                  icon={<EnvelopeOpenIcon />}
                  label={t("Hourly")}
                  onChange={handleChange}
                  placeholder={t("ENTER_RATE")}
                  colSpanSm={6}
                  colSpanMd={4}
                  colSpanLg={2}
                />

                <div className="">
                  <div className="flex flex-col gap-1">
                    <InputWithIcon
                      variant="dropdown"
                      pname="location"
                      icon={<MapPinIcon />}
                      label={t("LOCATION")}
                      value={formData.location}
                      handleLocationChange={handleLocationChange}
                      placeholder={t("ENTER_LOCATION")}
                      colSpanSm={6}
                      colSpanMd={4}
                      colSpanLg={2}
                    />
                  </div>
                </div>

                <InputWithIcon
                  pname="phoneNumber"
                  icon={<PhoneIcon />}
                  label={t("MOBILE")}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={t("ENTER_MOBILE")}
                  colSpanSm={6}
                  colSpanMd={4}
                  colSpanLg={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
        <div className="col-span-1 md:col-span-5">
          <div className="py-4  rounded  text-red ">
            <div>
              <div>
                <h3 className="font-semibold mb-4 text-lg text-[#565656]">
                  About Me
                </h3>
                <textarea
                  className="leading-8 text-[#565656] w-full mr-4 h-[325px]"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur facilis hic repudiandae possimus tenetur,
                  accusamus, eius fugit quis laboriosam alias, nemo debitis!
                  Laudantium dignissimos pariatur, eaque, expedita perferendis
                  debitis consequuntur sint, placeat doloribus voluptates optio
                  culpa! Ipsam quae aperiam natus! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ad tempore vero harum ut
                  distinctio doloremque culpa molestias illo. Omnis nihil
                  doloribus, praesentium provident sequi consectetur iusto eaque
                  dignissimos fugit qui est quo placeat natus culpa deleniti,
                  accusamus quas esse. Consequuntur? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ullam dolores magnam rem ipsam
                  blanditiis error vero corrupti ratione tenetur tempore."
                ></textarea>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 my-4">
          <h3 className="text-lg text- font-semibold mb-2 text-[#565656]">
            Introduction Video
          </h3>
          <div className="relative flex justify-center items-center bg-gray-200 p-4 rounded-lg shadow-md">
            {!videoVisible && (
              <>
                <img
                  className="rounded-lg"
                  src={posterSrc}
                  alt="Introduction"
                  onClick={() => setVideoVisible(true)}
                />
                <button
                  className="absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
                  onClick={() => setVideoVisible(true)}
                >
                  <span className="text-white text-6xl">&#9658;</span>
                </button>
              </>
            )}
            {videoVisible && (
              <iframe
                className="rounded-lg w-full h-[260px]"
                src={videoSrc}
                title="Introduction Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <VideoPortfolio />
      </div>
              <button type="submit" >NEXT</button>
    </div>
  );
};

export default CreateTeacher;
