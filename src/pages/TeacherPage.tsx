// TeacherProfile.tsx
import React, { useState } from 'react';
import TeacherTabs from '../components/TeacherTabs';
// import EventBoxes from './EventBoxes';
// import CalendarSection from './CalendarSection';
// import FavoriteTeachers from './FavoriteTeachers';
// import TeacherList from './TeacherList';
// import TeacherDetails from './TeacherDetails';

const TeacherProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'teacher' | 'student'>('teacher');

  return (
    <div className="flex">
      {/* Left Column */}
      <div className="w-1/4 p-4 bg-black">
        Teacher page
        <TeacherTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
        {/* <EventBoxes />
        <CalendarSection />
        <FavoriteTeachers /> */}
      </div>

      {/* Middle Column */}
      <div className="w-1/2 p-4 bg-red-500">
        hello
        {/* Teacher Images */}
        {/* Assuming you have a component for displaying a list of teachers */}
        {/* <TeacherList /> */}

        {/* Search and Filters */}
        {/* Assuming you have a component for search and filters */}
        {/* <SearchAndFilters /> */}
      </div>

      {/* Right Column */}
      <div className="w-1/4 p-4 bg-blue-50">
        Teaxher
        {/* Teacher Details */}
        {/* <TeacherDetails /> */}
      </div>
    </div>
  );
};

export default TeacherProfile;
