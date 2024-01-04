import React, { useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import InputWithIcon from "../components/InputWithIcon";
import TeacherAvail from "../components/TeacherAvail"
import {
  EnvelopeOpenIcon,
  ShareIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileAvatar from "../components/ProfileAvatar";
const teacherAvailability = [
  {
    week: "1st week of September 2020",
    days: [
      {
        day: "Wednesday",
        date: "2020-09-02",
        timeSlots: [
          { start: "9:00", end: "10:00" },
          { start: "10:00", end: "11:00" },
          { start: "11:00", end: "12:00" },
        ],
      },
      {
        day: "Thursday",
        date: "2020-09-03",
        timeSlots: [
          { start: "9:00", end: "10:00" },
          { start: "11:00", end: "12:00" },
        ],
      },
      // ... more days
    ],
  },
  // ... more weeks
];
const EditTeacher: React.FC = () => {
  return (
    <div>
         <ProfileAvatar
            pname=""
            icon={<ShareIcon />}
            label="First Name"
            placeholder="Enter first name"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
   
    <section className="h-screen text-center max-w-6xl mx-auto ">
        
      <div className="py-16">
        <form className="grid grid-cols-2 text-start gap-4">
      
          <InputWithIcon
            pname=""
            icon={<UserIcon />}
            label="First Name"
            placeholder="Enter first name"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname=""
            icon={<UserIcon />}
            label="Last Name"
            placeholder="Enter last name"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname=""
            icon={<EnvelopeOpenIcon />}
            label="Email"
            placeholder="Enter Email"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname=""
            icon={<PhoneIcon />}
            label="Mobile"
            placeholder="Enter Mobile"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname=""
            icon={<MapPinIcon />}
            label="Location"
            placeholder="Location"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
        </form>
      </div>
      <div>
      <TeacherAvail />
    </div>
    </section>
    
    </div>
  );
};
export default EditTeacher;
