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
import { useTeacherContext } from "../contexts/teachersContext";

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

interface UpdatePostType {
  firstName: string;
  profileImage: File[];
  portfolioVideo: File[];
  introductionVideo: File[];
}
const UpdateTeacher: React.FC = () => {
  const {teacher} = useTeacherContext();
  const { t, i18n } = useTranslation();
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoPortfolioVisible, setVideoPortfolioVisible] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<UpdatePostType>({
    profileImage: [],
    portfolioVideo: [],
    firstName: "",
 
    introductionVideo: [],
    // schedules: [
    //   {
    //     startDate: "",
    //     endDate: "",
    //     shifts: [
    //       {
    //         day: "",
    //         startTime: "",
    //         endTime: "",
    //       },
    //     ],
    //   },
    // ],
  });
  // const [nextformData, setNextFormData] = useState<UpdatePostType>({
  //   firstName: "",
  //   profileImage: [],
  //   portfolioVideo: [],
  //   introductionVideo: [],
  // });
  const [urls, setUrls] = useState<any>('');
  const [portfolioVideo, setPortfolioVideo] = useState<any>('');
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [type]: [file],
      }));
    }
    if(type === "introductionVideo" && files && files.length > 0){
      setVideoVisible(true);    
      const objectURL = URL.createObjectURL(files[0]);
      setUrls(objectURL);
    }
    if(type === "portfolioVideo" && files && files.length > 0){
      const objectURL = URL.createObjectURL(files[0]);
      setPortfolioVideo(objectURL);
      setVideoPortfolioVisible(true)
    }
    console.log(formData);
  };

  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const portfolioVideoInputRef = useRef<HTMLInputElement>(null);
  const introductionVideoInputRef = useRef<HTMLInputElement>(null);


  const [selectedTab, setSelectedTab] = useState<Date | null>(null);
  const [teachAvailData, setTeachAvailData] = useState({}); // Step 1
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStates, setActiveStates] =
    useState<boolean[][]>(initialActiveStates);

    console.log(formData)
  // useEffect(() => {
  //   setFormData((prev: any) => (
  //     {
  //      ...prev, 
  //       profileImage: teacher?.profileImage,
  //       portfolioVideo: teacher?.portfolioVideo,
  //       firstName: teacher?.firstName,
  //       introductionVideo: teacher?.introductionVideo,
        
  //     }
  //   ))
  // }, [teacher])
  useEffect(() => {
    const downloadFile = (url:any, fileName:any) => {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], fileName);
          setFormData(prevFormData => ({
            ...prevFormData,
            [fileName]: file,
            firstName: teacher?.firstName,
          }));
        })
        .catch(error => console.error('Error downloading file:', error));
    };

    if (teacher.profileImage) {
      downloadFile(teacher.profileImage, 'profileImage.jpg');
    }
    if (teacher.portfolioVideo) {
      downloadFile(teacher.portfolioVideo, 'portfolioVideo.mp4');
    }
    if (teacher.introductionVideo) {
      downloadFile(teacher.introductionVideo, 'introductionVideo.mp4');
    }
  }, [teacher]);
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

  const handleImageChanges = (event: any) => {

    setFormData((prevFormData:any) => ({
      ...prevFormData,
      profileImage: [event],
    }));
    
    console.log("File", formData);

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
        // const formDataToSend = new FormData();
        const newFormData = new FormData();
        newFormData.append("profileImage", formData.profileImage[0]);
        newFormData.append("firstName", formData.firstName);
        newFormData.append("portfolioVideo", formData.portfolioVideo[0]);
        newFormData.append("introductionVideo", formData.introductionVideo[0]);
        
        const res = await axios.put(
          API_ENDPOINTS.UPDATETEACHERPROFILE,
          newFormData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        // 
        );
        if(res.status === 200){
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

    // setFormData((prevFormData) => {
    //   const newSchedules = [...prevFormData.schedules, newSchedule];
    //   return {
    //     ...prevFormData,
    //     schedules: newSchedules,
    //   };
    // });
  };

  const videoSrc = "/video/video.mp4";
  const posterSrc = "/img/user-06.png";
  // const user = JSON.parse(localStorage.getItem('user') || "");
  // console.log(formData?.firstName)
  return (
    <div className="py-8 ml-[60px] ">
      <div className="bg-[#17b3a6] p-4 rounded">
        <div className="p-6  rounded  text-white ">
          <div className="flex items-center justify-around">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start ">
              <div className="text-center">
              {/* <input
                  id="profileImage"
                  name="profileImage"
                  ref={profileImageInputRef}
                  type="file"
                  onChange={(event) =>
                    handleImageChange(event, "profileImage")
                  }
                /> */}
                <ProfileAvatar
                  pname=""
                  icon={<ShareIcon />}
                  // imageUrl={user?.imageUrl}
                  onChangeImage={(event:any) => handleImageChanges(event)}
                  defaultImageUrl={teacher?.profileImage}
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
                  value={formData?.firstName}
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
                  // value={formData?.hourlyRate}
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
                      // value={formData.location}
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
                  // value={formData.phoneNumber}
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
            <div className="p-2 pl-5">
              <h3 className="font-semibold mb-4 text-lg text-[#565656]">
                About Me
              </h3>
              <textarea
                onChange={handleChange}
                name="aboutMyself"
                // value={formData?.aboutMyself}
                className="resize-none leading-8 text-[#565656] w-[90%] mr-4 h-[325px]"
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
        <div className="col-span-1 md:col-span-3 my-4">
          <h3 className="text-lg text- font-semibold mb-2 text-[#565656]">
            Introduction Video
          </h3>
          <div className="relative flex justify-center items-center bg-gray-200 p-4 rounded-lg shadow-md">
            {!videoVisible && (
              <>
                <div>
                {teacher?.introductionVideo ? <video src={teacher?.introductionVideo } controls></video> : ''}
              <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2]">
              
                <input
                  id="introductionVideo"
                  name="introductionVideo"
                  ref={introductionVideoInputRef}
                  type="file"
                  onChange={(event) =>
                    handleImageChange(event, "introductionVideo")
                  }
                  accept="video/*"
                />
                <label
                  htmlFor="introductionVideo"
                  className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 4v16m8-8H4"></path>
                  </svg>
                </label>
              </div>
            </div>
              </>
            )}
            {videoVisible && (
              <video
                className="rounded-lg w-full h-[260px]"
                src={urls}
                title="Introduction Video"
                controls
              ></video>
            )}
            
          </div>
          
        </div>
      </div>
      <div className="col-span-1">

      <div className="col-span-1 md:col-span-3 my-4">
          <h3 className="text-lg text- font-semibold mb-2 text-[#565656]">
            Portfolio Video
          </h3>
          {teacher?.introductionVideo ? <video src={teacher?.introductionVideo } controls></video> : ''}

          <div className="relative flex justify-center items-center bg-gray-200 p-4 rounded-lg shadow-md">
            
            {!videoPortfolioVisible && (
              <>
              
                <div>
              <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2]">
                <input
                  id="portfolioVideo"
                  name="portfolioVideo"
                  ref={portfolioVideoInputRef}
                  type="file"
                  onChange={(event) =>
                    handleImageChange(event, "portfolioVideo")
                  }
                                    accept="video/*"

                />
                <label
                  htmlFor="portfolioVideo"
                  className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 4v16m8-8H4"></path>
                  </svg>
                </label>
              </div>
            </div>
              </>
            )}
            {videoPortfolioVisible && (
              <video
                className="rounded-lg w-full h-[260px]"
                src={portfolioVideo}
                title="Introduction Video"
                controls
              ></video>
            )}
            
          </div>
          
        </div>
      </div>
      <div className="my-4 mx-10   xl:mx-0">
        <CalendarSlider onWeekSelected={handleWeekSelected} />
        <div className="grid grid-cols-8 gap-4 py-2 text-center ">
          <div className="col-span-1 font-bold ">{t("TIME")}</div>
          {selectedWeekStart &&
            Array.from({ length: 7 }, (_, i) => {
              const date = new Date(
                selectedWeekStart.getTime() + i * 24 * 60 * 60 * 1000
              );
              return (
                <div
                  key={date.toLocaleDateString()}
                  className={`col-span-1 font-bold   ${
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
                    selectedWeekStart.getTime() + dayIndex * 24 * 60 * 60 * 1000
                  );
                  const dateKey = date.toISOString().split("T");
                  const isActive = activeStates[hourIndex][dayIndex];
                  return (
                    <button
                      key={dateKey + hour}
                      type="button"
                      className={`col-span-1 rounded-md py-2 time-slot ${
                        isActive ? "bg-[#B2C3FD] shadow-lg" : "bg-[#F1F1F1]"
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
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default UpdateTeacher;
