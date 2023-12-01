
import React, { useState } from 'react';
import StudentTabs from '../components/StudentTabs';
import StudentList from '../components/StudentList';
import StudentEventBoxes from '../components/StudentEventBoxes';
import TeacherCalSec from "../components/TeacherCalSec";
import SearchAndFiltersStudent from '../components/SearchStudent';
import StudentConDetail from '../components/StudentConDetail';

const TeacherProfile: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'teacher' | 'student'>('teacher');
    const handleSelectTab = (tab: 'teacher' | 'student') => {
        setSelectedTab(tab);
      };
  return (
    <div className="grid grid-cols-12 gap-0 mx-0 md:mx-16 lg:mx-16 xl:mx-16">
     
      {/* Left Column */}
      <div className='col-span-12 xl:col-span-3 p-4 h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-10 mx-10'>
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={handleSelectTab}
          showTabs={true}
          description=''
          profilePic='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          name='John Miler'
        />
        <StudentEventBoxes />
        <TeacherCalSec/>
      </div>

      {/* Middle Column */}
      <div className='col-span-12 md:col-span-12 lg:col-span-6  xl:col-sapn-6 p-4 lg:overflow-y-auto scrollbar lg:max-h-screen '>
        <SearchAndFiltersStudent />
       
        {Array.from({ length: 4 }, (_, index) => (
          <StudentList key={index} />
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
      <div className="col-span-12 xl:col-span-3 p-4  bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-10 mx-10">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={false}
          description='" ning processes to achieve superior results"'
          profilePic="/img/student.png"
          name="Vivek Kumar"
        />
        <StudentConDetail />
      </div>
    </div>
  );
};

export default TeacherProfile;
