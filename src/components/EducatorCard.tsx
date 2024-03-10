import React, { useEffect, useState } from "react";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
// import TeacherCalender from "../components/TeacherCalender";
import TeacherListSlots from "./TeacherListSlots";
import { Link } from "react-router-dom";
import { teacherContext } from "../contexts/teachersContext";
import { TeacherCalender } from "./TeacherCalender";

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
  const { shift } = teacherContext();
  const [shiftsData, setShiftsData] = useState([]);
  const [tap, setTaped] = useState<boolean>(false);

  const handleMatchedShift = (matchedShifts: any) => {
    // Update the state or perform any other action with the matchedShifts data
    setShiftsData(matchedShifts);
  };
  const handleMatchedShifts = (matchedShifts: any) => {
    if (!tap) {
      matchedShifts = schedules.flatMap(({ shifts }: any) => shifts);
    }
    setShiftsData(matchedShifts);
  };
  const handleOnClicked = (click: boolean) => {
    setTaped(click);
  };

  useEffect(() => {
    handleMatchedShift;
  }, [tap]);
  console.log(shiftsData, "");
  console.log(shift, "shifts");
  return (
    <div className="bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] p-6 my-4">
      <div className="grid grid-cols-1 xl:grid-cols-8 gap-4">
        <div className="md:col-span-6">
          <div className="flex flex-col lg:flex-row">
            <div className="text-center ">
              <img
                src={imgUrl}
                width="100px"
                height="100px"
                className="rounded-full"
                alt=""
              />
              <h4>¥ {hourlyRate} Per/Hr </h4>
            </div>
            <div className="mt-4 md:mt-0 md:mx-4 flex-1">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <h3>
                  {firstName} {lastName}
                </h3>
                <div className="flex gap-4 mt-2 md:mt-0">
                  <button className="bg-[#61cbc2] hover:bg-[#61cbc2] text-white font-bold py-2 px-4 rounded">
                    Book An Appointment
                  </button>
                  <button className="bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded">
                    Chat
                  </button>
                  <Link to={"/teacher-details/" + teacherId}>
                    <button className="bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded">
                      View Details
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
                    <h4 className="m-0 my-1 p-0">Location</h4>
                    <p className="m-0 p-0">{location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon
                    className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="m-0 my-1 p-0">Rating</h4>
                    <p className="m-0 p-0">
                      {rating ? `${rating} (130 ratings)` : "No ratings yet"}
                    </p>
                  </div>
                </div>
              </div>
              <p className="leading-6 text-[#5b5b5b] mt-4">{aboutMyself}</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <TeacherCalender
            startEndDates={schedules}
            shifts={schedules?.shifts}
            onMatchedShifts={handleMatchedShifts}
            onClicked={handleOnClicked}
          />
        </div>
      </div>

      {/* <div className="mt-4">
            <div className="grid  lg:grid-cols-8  sm:grid-cols-3 gap-4">
              {schedules?.map((slot: any, index: any) => {
                return (
                  <>
                    {slot?.shifts.map((shift: any, index: any) => {
                      return (
                        <button
                          key={index}
                          className={`text-[12px] text-center px-1 py-4 rounded-lg shadow-sm   ${
                            !shift.isBooked
                              ? "bg-teal-400 text-white"
                              : "bg-gray-100 text-gray-600 "
                          }`}
                        >
                          {shift.startTime} - {shift.endTime}
                        </button>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div> */}
      <div className="mt-4">
        <div className="grid lg:grid-cols-8 sm:grid-cols-3 gap-4">
          {shiftsData.map((shift: any, index: any) => (
            <button
              key={index}
              className={`text-[12px] text-center px-1 py-4 rounded-lg shadow-sm ${
                !shift.isBooked
                  ? "bg-teal-400 text-white"
                  : "bg-gray-100 text-gray-600 "
              }`}
            >
              {shift.startTime} - {shift.endTime}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
