// TeacherProfile.tsx
import React, { useState } from "react";
import TeacherTabs from "../components/TeacherTabs";
import EventBoxes from "../components/EventBoxes";
import TeacherCalendar from "../components/TeacherCalender";
import FavTeachers from "../components/FavTeacher";
// import TeacherList from './TeacherList';
import TeacherConDetail from '../components/TeacherConDetail';
import TeacherActivities from "../components/TeacherActivities";
type Status = "teacher" | "student";
const TeacherProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"teacher" | "student">(
    "student"
  );

  return (
    <div>
<div className="grid grid-cols-12 gap-4">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-3 p-4  h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-full mt-10 mx-10  ">
        <TeacherTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={true}
          discription=""
          profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="John Miler"
        />
        <EventBoxes />
        <TeacherCalendar />
        <FavTeachers />
      </div>

      {/* Middle Column */}
      <div className="col-span-12 lg:col-span-5 py-4 px-12 box-border ">
        <p className=" text-[21.59px] leading-[25.76px] tracking-wide font-bold">
          Find Your Teacher
        </p>
        <div className="flex bg-white justify-between items-center ">
          <div className="relative w-[254.64px]">
            <input
              placeholder="Search"
              className="px-2 w-full rounded-md bg-white py-1.5  box-border text-sm text-gray-300"
            />
            <img
              className="absolute w-4 h-4  top-3 right-2"
              alt=""
              src="/img/search.svg"
            />
          </div>
          <div className="flex items-center">
            <p className="text-xs font-bold">Filter By:</p>

            <div className="flex items-center justify-center gap-x-2">
              <button className="flex justify-center w-[64.34px] p-2 ml-2  rounded-md font-normal text-xs bg-[#A8FFC2] text-xs text-black shadow-sm">
                Rating
              </button>
              <button className="flex justify-center w-[64.34px] p-2  rounded-md font-normal text-xs bg-[#D9D9D966] text-xs text-black shadow-sm">
                Location
              </button>
              <button className="flex justify-center w-[70.34px] p-2 mr-1 rounded-md font-normal text-xs bg-[#D9D9D966] text-xs text-black shadow-sm">
                Availability
              </button>
            </div>
          </div>
        </div>

       
      </div>
       {/* Right Column */}
       <div className="col-span-12 lg:col-span-4 p-4  bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-full mt-10 mx-10">
          <TeacherTabs
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
            showTabs={false}
            discription='" ning processes to achieve superior results "
          '
            profilePic="/img/profile1.png"
            name="Cinderella"
          />
          <TeacherConDetail  />
        </div>

        
    </div>
   
    </div>
    
  );
};

export default TeacherProfile;
