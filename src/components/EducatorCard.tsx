import React, { useEffect, useState } from "react";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
// import TeacherCalender from "../components/TeacherCalender";
import TeacherListSlots from "./TeacherListSlots";
import { Link, useNavigate } from "react-router-dom";
import { teacherContext } from "../contexts/teachersContext";
import { TeacherCalender } from "./TeacherCalender";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
export const EducatorCard = ({
  firstName,
  lastName,
  imgUrl,
  location,
  rating,
  aboutMyself,
  schedules,
  hourlyRate,
  teacherId,
}: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [shiftsData, setShiftsData] = useState([]);
  const [tap, setTaped] = useState<boolean>(false);
  const [bookingsData, setBookingsData] = useState<any>();

  const tId = localStorage.getItem("teacher_id");
  const handleMatchedShift = (matchedShifts: any) => {
    setShiftsData(matchedShifts);
  };
  const handleMatchedShifts = (matchedShifts: any) => {
    if (!tap) {
      const s = schedules.flatMap(({ shifts }: any) => shifts);
      matchedShifts = s.slice(0, 5);
    }
    setShiftsData(matchedShifts);
  };
  const handleOnClicked = (click: boolean) => {
    setTaped(click);
  };

  useEffect(() => {
    handleMatchedShift;
  }, [tap]);

  const handleSelectedShifts = (shift: any) => {
    if (bookingsData == shift) {
      // If the clicked shift is already selected, deselect it
      setBookingsData(null);
    } else {
      // Otherwise, select the clicked shift
      setBookingsData(shift);
    }
  };

  console.log(bookingsData, "bd");

  const handleBookAppointment = () => {
    if (bookingsData) {
      bookAppointment(
        bookingsData.scheduleId,
        bookingsData.day,
        bookingsData.startTime,
        bookingsData.endTime,
        bookingsData.isBooked
      );
    } else {
      toast.error("Please select a schedule");
    }
  };

  const bookAppointment = async (
    scheduleId: any,
    day: any,
    startTime: any,
    endTime: any,
    isBooked: boolean
  ) => {
    try {
      const token = localStorage.getItem("token");
      const id = Number(localStorage.getItem("id"));
      const response = await axios.post(
        API_ENDPOINTS.BOOKAPPOINTMENT,
        {
          scheduleId,
          day,
          startTime,
          endTime,
          isBooked: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: id,
          },
        }
      );
      toast.success("Appointment booked successfully");
    } catch (error) {
      toast.error("Error booking appointment");
    }
  };

  return (
    <div className="bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] p-6 my-4">
      <div className="grid grid-cols-1 xl:grid-cols-9 gap-4">
        <div className="lg:col-span-6">
          <div
            className="flex flex-col lg:flex-row"
            onClick={(e) =>
              {
                e.preventDefault();
                navigate(`/teacher-details/${teacherId}`)
              } 
            }
          >
            <div className="text-center ">
              <img
                src={imgUrl}
                width="100px"
                height="100px"
                className="rounded-full"
                alt=""
              />
              <h4>
                ¥ {hourlyRate} {t("Per/Hr")}{" "}
              </h4>
            </div>
            <div className="mt-4 md:mt-0 md:mx-4 flex-1">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <h3>
                  {firstName} {lastName}
                </h3>
                <div className="grid grid-cols-2 xl:flex items-center gap-4 mt-2 md:mt-0 z-[]">
                  {tId != teacherId && (
                    <div onClick={(e) =>{
                      // debugger
                      e.preventDefault();
                      //  navigate(`/message-page`);
                       document.location.href = '/message-page';
                    } }>
                    <button className="bg-transparent w-full xl:w-auto border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded"
                    
                    >
                      {t("CHAT")}
                    </button>
                    </div>
                  )}
                  <Link to={"/teacher-details/" + teacherId}>
                    <button className="w-full xl:w-auto bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded">
                      {t("VIEW_DETAILS")}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-10 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <MapPinIcon
                    className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="m-0 my-1 p-0">{t("LOCATION")}</h4>
                    <p className="m-0 p-0">{location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon
                    className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="m-0 my-1 p-0"> {t("RATING")} </h4>
                    <p className="m-0 p-0">
                      {rating
                        ? t("RATING_WITH_COUNT", {
                            count: rating,
                            numRatings: 130,
                          })
                        : t("NO_RATINGS_YET")}
                    </p>
                  </div>
                </div>
              </div>
              <p className="leading-6 text-[#5b5b5b] mt-4">{aboutMyself}</p>
            </div>
          </div>
          {tId != teacherId && (
            <div className="mt-4 ">
              <div className="grid grid-cols-2 lg:grid-cols-8 sm:grid-cols-3 gap-4">
                {shiftsData.map((shift: any, index: any) => (
                  <button
                    key={index}
                    className={`text-[12px] w-full xl:w-auto text-center px-1 py-4 rounded-lg shadow-sm ${
                      bookingsData === shift && "!bg-black"
                    } ${
                      !shift.isBooked
                        ? "bg-teal-400 text-white"
                        : "bg-gray-100 text-gray-600 "
                    } `}
                    onClick={() => handleSelectedShifts(shift)}
                  >
                    {shift.startTime} - {shift.endTime}
                  </button>
                ))}
                <div className="w-full xl:w-[200px] ">
                  <button
                    className="w-full py-4 xl:w-full text-sm bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2  rounded"
                    onClick={handleBookAppointment}
                  >
                    {t("BOOK_APPOINTMENT")}ss
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-3">
          <TeacherCalender
            startEndDates={schedules}
            shifts={schedules?.shifts}
            onMatchedShifts={handleMatchedShifts}
            onClicked={handleOnClicked}
          />
        </div>
      </div>
    </div>
  );
};
