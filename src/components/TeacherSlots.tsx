import React, { useEffect, useState } from "react";
import AvailabilityTabs from "./AvailavilityTabs";
import DropDown from "./DropDown";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { TeacherCalender } from "./TeacherCalender";
interface TeacherSlots {
  startTime: string;
  endTime: string;
}

interface TeacherSlotsProps {
  slots: TeacherSlots[];
  schedules?: any;
}

const TeacherSlotss: React.FC<TeacherSlotsProps> = ({
  slots,
  schedules,
}: any) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dayFilter, setDayFilter] = useState<any>("All");
  const [selectedTime, setSelectedTime] = useState<any>();
  const [tap, setTaped] = useState<boolean>(false);
  const [shiftsData, setShiftsData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(20);

  const handleShowMore = () => {
    setVisibleItems(prevCount => prevCount + 20);
  };
  const { t, i18n } = useTranslation();
  const day: (string | undefined)[] = (schedules || []).flatMap(
    (schedule: any) => schedule?.shifts.map((es: any) => es.day)
  );

  const filteredSlots =
    dayFilter === "All"
      ? slots
      : slots?.filter((slots: any) => slots.day === dayFilter);
  const uniqueDays: (string | undefined)[] = day.filter((d, index) => {
    return d === undefined || day.indexOf(d) === index;
  });

  const handleBookAppointment = () => {
    bookAppointment(selectedTime);
  };
  const bookAppointment = async (selectedTime: any) => {
    if (selectedTime) {
      try {
        const token = localStorage.getItem("token");
        const id = Number(localStorage.getItem("id"));
        const response = await axios.post(
          API_ENDPOINTS.BOOKAPPOINTMENT,
          {
            scheduleId: selectedTime.scheduleId,
            day: selectedTime.day,
            startTime: selectedTime.startTime,
            endTime: selectedTime.endTime,
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
    } else {
      toast.error("Please select a time slot");
    }
  };

  const handleMatchedShift = (matchedShifts: any) => {
    setShiftsData(matchedShifts);
  };
  const handleMatchedShifts = (matchedShifts: any) => {
    if (!tap) {
      const s = schedules?.flatMap(({ shifts }: any) => shifts);
      matchedShifts = s?.slice(0, 5);
    }
    setShiftsData(matchedShifts);
  };
  const handleOnClicked = (click: boolean) => {
    setTaped(click);
  };
  useEffect(() => {
    handleMatchedShift;
  }, [tap]);
  return (
    <div className="mt-10">
      <h3 className="font-semibold mb-4 text-lg">Availability</h3>
      <div className="div">
        {/* <DropDown timeSlots={uniqueDays} dayFilter={setDayFilter} /> */}
        <TeacherCalender
          startEndDates={schedules}
          shifts={schedules?.shifts}
          onMatchedShifts={handleMatchedShifts}
          onClicked={handleOnClicked}
          dayFilter={setDayFilter}
        />
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-3 gap-4 my-4">
      {filteredSlots?.slice(0, visibleItems)?.map((slot: any, index: any) => (
        <button
          key={index}
          className={`text-sm text-center px-1 py-4 rounded-lg shadow-sm ${
            slot.isBooked ? "bg-[#DDF4F2] text-gray-600" : "bg-[#17b3a6] text-white"
          }`}
          onClick={() => setSelectedTime(slot)}
          disabled={slot.isBooked}
        >
          {slot.startTime} - {slot.endTime}
        </button>
      ))}
      
      </div>
      {filteredSlots?.length > visibleItems && (
        <div>
        <button
          className="text-sm w-full cursor-pointer text-center px-1 py-4 rounded-lg shadow-sm bg-[#17b3a6] text-white mt-2"
          onClick={handleShowMore}
        >
          Show More
        </button>
        </div>
      )}
      <button
        className="bg-[#17b3a6] text-white text-lg px-4 py-4 cursor-pointer rounded hover:bg-green-600 w-full my-6"
        onClick={handleBookAppointment}
      >
        Book an Appointment
      </button>
      <div>
        {/* <div className="flex items-center justify-end ">
          <p className="my-1">{t("APPROVAL_WAITING")}-</p>
          <div className=" h-4 w-8 md:w-10 lg:w-16 bg-[#CFEEFF]"></div>
        </div>
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("BOOKED_BY_YOU")}-</p>
          <div className="h-4 w-8 md:w-10 lg:w-16  bg-[#00A4FE]"></div>
        </div> */}
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("AVAILABLE")}-</p>
          <div className="h-4 w-8  md:w-10 lg:w-16  bg-[#DDF4F2]"></div>
        </div>
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("NOT_AVAILABLE")}-</p>
          <div className="h-4 w-8 md:w-10 lg:w-16 bg-[#E8E8E8]"></div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSlotss;
