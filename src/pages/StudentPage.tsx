
import React, { useState } from 'react';
import StudentTabs from '../components/StudentTabs';
import TeacherList from '../components/TeacherList';
import StudentEventBoxes from '../components/StudentEventBoxes';
import StudentCalendar from '../components/StudentCalender';
import FavTeachers from '../components/FavTeacher';
import SearchAndFiltersEducator from '../components/SearchAndFilter';
import TeacherConDetail from '../components/StudentConDetail';
import TeacherActivities from "../components/StudentActivities";

type Status = "teacher" | "student";

const StudentProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Status>('student');

  return (
    <div className="grid grid-cols-12 gap-0">
      {/* Left Column */}
      <div className='col-span-12 xl:col-span-4 p-4 h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-10 mx-10'>
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={true}
          discription=''
          profilePic='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          name='John Miler'
        />
        <StudentEventBoxes />
        <StudentCalendar />
        <FavTeachers />
      </div>

      {/* Middle Column */}
      <div className='col-span-12   lg:col-span-4 p-4 lg:overflow-y-auto scrollbar lg:max-h-screen '>
        {/* Search and Filters */}
        <SearchAndFiltersEducator />
       
        {Array.from({ length: 6 }, (_, index) => (
          <TeacherList key={index} />
        ))}
        
        <style>{`
        
        @media screen and (min-width: 768px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
           
          }
               
                .scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height:10px;
                }

                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }

                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
        
      </div>

      {/* Right Column */}
      <div className="col-span-12 xl:col-span-4 p-4  bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-10 mx-10">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={false}
          discription='" ning processes to achieve superior results"'
          profilePic="/img/profile1.png"
          name="Cinderella"
        />
        <TeacherConDetail />
      </div>
    </div>
  );
};

export default StudentProfile;
