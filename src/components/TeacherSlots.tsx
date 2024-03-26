import React, { useState } from "react";
import AvailabilityTabs from "./AvailavilityTabs";
import DropDown from "./DropDown";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

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
  const [selectedTime, setSelectedTime] = useState<any>()

  const day: (string | undefined)[] = (schedules || []).flatMap(
    (schedule: any) => schedule?.shifts.map((es: any) => es.day)
  );

  const filteredSlots = dayFilter === 'All' ? slots : slots?.filter((slots: any) => slots.day === dayFilter);
  const uniqueDays: (string | undefined)[] = day.filter((d, index) => {
    return d === undefined || day.indexOf(d) === index;
  });

  const handleBookAppointment = () => {
    bookAppointment(selectedTime)
  }
  const bookAppointment = async (
      selectedTime: any
    ) => {
      if(selectedTime) {
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
        toast.success(
          "Appointment booked successfully"
        );
      } catch (error) {
        toast.error("Error booking appointment");
      } }
      else {
        toast.error("Please select a time slot")
      }
    };

  return (
    <div className="mt-10">
      <h3 className="font-semibold mb-4 text-lg">Availability</h3>
      <div className="div">
        <DropDown timeSlots={uniqueDays} dayFilter={setDayFilter} />
      </div>
     
      <div className="grid lg:grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredSlots?.map((slot: any, index: any) => (
          <button
            key={index}
            className={`text-sm text-center px-1 py-4 rounded-lg shadow-sm ${
              activeIndex === index
                ? "bg-[#17b3a6] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => {setActiveIndex(index), setSelectedTime(slot)}}
            disabled={slot.isBooked}
          >
            {slot.startTime} - {slot.endTime}
          </button>
        ))}
      </div>
      <button className="bg-[#17b3a6] text-white text-lg px-4 py-4 cursor-pointer rounded hover:bg-green-600 w-full my-6" onClick={handleBookAppointment}>
        Book an Appointment
      </button>
    </div>
  );
};

export default TeacherSlotss;
