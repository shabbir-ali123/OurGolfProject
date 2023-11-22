// TeacherProfile.tsx
import React, { useState } from 'react';
import TeacherTabs from '../components/TeacherTabs';
import TeacherList from '../components/TeacherList';
// import EventBoxes from './EventBoxes';
// import CalendarSection from './CalendarSection';
// import FavoriteTeachers from './FavoriteTeachers';

import EventBoxes from '../components/EventBoxes';
import TeacherCalendar from '../components/TeacherCalender';
import FavTeachers from '../components/FavTeacher';
// import TeacherList from './TeacherList';
// import TeacherDetails from './TeacherDetails';
type Status = 'teacher' | 'student';
const TeacherProfile: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<Status>('teacher');

    const center: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto 0',
    };

    return (
        <div className='grid grid-cols-12 gap-4'>
            {/* Left Column */}
            <div className='col-span-12 lg:col-span-3 p-4  h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-full mt-10 mx-10  '>
                <TeacherTabs
                    selectedTab={selectedTab}
                    onSelectTab={setSelectedTab}
                    showTabs={true}
                    discription=''
                    profilePic='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    name='John Miler'
                />
                <EventBoxes />
                <TeacherCalendar />
                <FavTeachers />
            </div>

            {/* Middle Column */}
            {/* Middle Column */}
            {/* <div className='w-1/2 py-4 px-4 box-border'>
   
   </div> */}
            <div className='col-span-12 lg:col-span-6 p-4'>
                {/* Teacher Images */}
                {/* Assuming you have a component for displaying a list of teachers */}
                {/* <TeacherList /> */}
                {/* Search and Filters */}
                {/* Assuming you have a component for search and filters */}
                {/* <SearchAndFilters /> */}
                <p className=' text-[21.59px] leading-[25.76px] tracking-wide font-bold'>
                    Find Your Educator
                </p>
                <div className='flex bg-white justify-between items-center'>
                    <div className='relative min-w-[204.64px] h-[24.08px] '>
                        <input
                            placeholder='search'
                            className='px-2 w-full h-full rounded-md py-1.5  box-border text-sm text-gray-300 border-[0.42px] border-[#CDCDCD]'
                        />
                        <img
                            className='absolute w-2 h-2 top-0 right-0 bottom-0 mx-2 my-auto'
                            alt=''
                            src='/img/search.svg'
                        />
                    </div>
                    <div className='flex items-center'>
                        <p className='text-[12px] font-bold'>Filter By:</p>

                        <div className='flex items-center justify-center gap-x-2'>
                            <button className='flex justify-center w-[64.34px] p-2 ml-2 rounded-md font-normal text-xs bg-[#A8FFC2] text-xs text-black shadow-sm'>
                                Rating
                            </button>
                            <button className='flex justify-center w-[64.34px] p-2 rounded-md font-normal text-xs bg-[#D9D9D966] text-xs text-black shadow-sm'>
                                Location
                            </button>
                            <button className='flex justify-center w-[70.34px] p-2 mr-1 rounded-md font-normal text-xs bg-[#D9D9D966] text-xs text-black shadow-sm'>
                                Availability
                            </button>
                        </div>
                    </div>
                </div>

                {/* Teacher Images */}
                {/* Assuming you have a component for displaying a list of teachers */}
                {/* <TeacherList /> */}
                {[1, 2, 3, 4].map((data, index) => (
                    <TeacherList key={index} />
                ))}

                {/* Search and Filters */}
                {/* Assuming you have a component for search and filters */}
                {/* <SearchAndFilters /> */}
            </div>

            {/* Right Column */}
            <div className='col-span-12 lg:col-span-3 p-4 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-full mt-10 mx-10'>
                <TeacherTabs
                    selectedTab={selectedTab}
                    onSelectTab={setSelectedTab}
                    showTabs={false}
                    discription='" ning processes to achieve superior results. "
          '
                    profilePic='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    name='Cinderella'
                />
                {/* <TeacherDetails /> */}
            </div>
        </div>
    );
};

export default TeacherProfile;
