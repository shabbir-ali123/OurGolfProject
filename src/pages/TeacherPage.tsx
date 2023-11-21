// TeacherProfile.tsx
import React, { useState } from "react";
import TeacherTabs from "../components/TeacherTabs";
import EventBoxes from "../components/EventBoxes";
import TeacherCalendar from "../components/TeacherCalender";
import FavTeachers from "../components/FavTeacher";
// import TeacherList from './TeacherList';
// import TeacherDetails from './TeacherDetails';

const TeacherProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"teacher" | "student">(
    "teacher"
  );

  return (
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
      <div className="col-span-12 lg:col-span-6 p-4 bg-red-500">
        hello
        {/* Teacher Images */}
        {/* Assuming you have a component for displaying a list of teachers */}
        {/* <TeacherList /> */}
        {/* Search and Filters */}
        {/* Assuming you have a component for search and filters */}
        {/* <SearchAndFilters /> */}
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-3 p-4 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-full mt-10 mx-10">
        <TeacherTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={false}
          discription='" ning processes to achieve superior results. "
          '
          profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="Cinderella"
        />
        {/* <TeacherDetails /> */}
      </div>
    </div>
  );
};

export default TeacherProfile;
