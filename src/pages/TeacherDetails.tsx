import React from 'react';
import TeacherProfile from '../components/TeacherProfile';
import AboutTeacher from '../components/AboutTeacher';
import IntroVideo from '../components/TeacherIntro';

import TeacherCalender from '../components/TeacherCalender';
import TeacherPortfolio from '../components/TeacherPortfolio';
import TeacherSlotss from '../components/TeacherSlots';


const TeacherDetails: React.FC = () => {
    const userProfileProps = {
        name: 'Tinik Roy',
        location: 'Bogotá, Colombia (South America)',
        email: 'iamwithyou@gmail.com',
        phoneNumber: '85985-95415',
        rate: 20,
        rating: 4.5,
        ratingCount: 300,
        about: 'Dedicated engineer with a strong background in mechanical design, committed to optimizing and streamlining processes to achieve superior results.',
    };
    const videoSrc = '/video/video.mp4';
    const posterSrc = '/img/user-06.png';
    const slotsData = [
        { startTime: '12:00 PM', endTime: '12:45 PM' },
        { startTime: '11:00 AM', endTime: '11:45 AM' },
        { startTime: '11:45 AM', endTime: '12:30 AM' },
        { startTime: '05:00 PM', endTime: '05:45 PM' },
        { startTime: '12:00 PM', endTime: '12:45 PM' },
        { startTime: '11:00 AM', endTime: '11:45 AM' },
        { startTime: '11:45 AM', endTime: '12:30 AM' },
        { startTime: '05:00 PM', endTime: '05:45 PM' },
    ];
    return (
        <div className="mx-20 md:mx-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="col-span-1 md:col-span-4">
                    <div className="bg-gray-100 p-4 rounded">
                       <TeacherCalender />
                    </div>
                </div>
                <div className="col-span-4 md:col-span-8">
                    <div className='bg-[#17b3a6] p-4 rounded'>
                        <TeacherProfile {...userProfileProps} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
                        <div className='col-span-1 md:col-span-5'>
                            <AboutTeacher />
                            <TeacherSlotss slots={slotsData} />
                        </div>
                        <div className='col-span-1 md:col-span-3 my-4'>
                            <h3 className="text-lg text-white font-semibold mb-2">Introduction Video</h3>
                            <IntroVideo videoSrc={videoSrc} posterSrc={posterSrc} />
                        </div>
                    </div>
                    <div>
                        <TeacherPortfolio />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDetails;
