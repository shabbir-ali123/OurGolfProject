
import React, { useState } from 'react';
import StudentTabs from '../components/StudentTabs';
import TeacherList from '../components/TeacherList';
import StudentEventBoxes from '../components/StudentEventBoxes';
import StudentCalendar from '../components/StudentCalender';
import FavTeachers from '../components/FavTeacher';
import SearchAndFiltersEducator from '../components/SearchAndFilter';
import TeacherConDetail from '../components/TeacherConDetail';
import ReschedulePop from '../components/ReschedulePop';

const StudentProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'student' | 'teacher'>('student');
  const [showModal, setShowModal] = useState(false);
    const handleSelectTab = (tab: 'student' | 'teacher') => {
        setSelectedTab(tab);
      };
      const openModal = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };
      const handleSelectTime = (selectedTime: string) => {
     
        console.log(`Selected Time: ${selectedTime}`);
      };
  
      const handleBookAppointment = () => {
        // Implement your logic for booking an appointment here
        console.log('Booking appointment logic');
      };
      const handleCloseModal = () => {
        // Close the modal by updating the state
        setShowModal(false);
      };
  return (
    <div  className="grid grid-cols-11 gap-0 mx-0 md:mx-16 lg:mx-16 xl:mx-8 ">
      
      {/* Left Column */}
      <div className='col-span-12 md:col-span-12 xl:col-span-4 p-4 h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInLeft '>
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={handleSelectTab}
          showTabs={true}
          description=''
          profilePic='/img/profile1.png'
          name='John Miler'
        />
        <StudentEventBoxes />
        <StudentCalendar />
        <FavTeachers />
      </div>

      {/* Middle Column */}
      <div className='col-span-12 md:col-span-12 lg:col-span-3  xl:col-span-3 p-4 lg:overflow-y-auto scrollbar lg:max-h-screen '>
        <SearchAndFiltersEducator />
       
        {Array.from({ length: 6 }, (_, index) => (
          <TeacherList key={index} openModal={openModal} handleBookAppointment={handleBookAppointment} />
        ))}
        
        <style>{`
        
        @media screen and (min-width: 1300px) {
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
      <div className=" col-span-12 xl:col-span-4 p-4  bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInRight ">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={false}
          description='" ning processes to achieve superior results"'
          profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="Cinderella"
        />
        <TeacherConDetail />
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg animate__animated animate__fadeInLeft">
          <ReschedulePop onSelectTime={handleSelectTime} onClose={handleCloseModal} />  
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
