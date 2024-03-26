import React from 'react';
import TeacherProfile from '../components/TeacherProfile';
import AboutTeacher from '../components/AboutTeacher';
import IntroVideo from '../components/TeacherIntro';
import TeacherPortfolio from '../components/TeacherPortfolio';
import TeacherSlotss from '../components/TeacherSlots';
import { useTeacherContext } from '../contexts/teachersContext';

const TeacherDetails: React.FC = () => {
    const { teacher } = useTeacherContext();

    const videoSrc = '/video/video.mp4';
    const posterSrc = '/img/user-06.png';
    
    const availableSlots = teacher?.schedules?.map((schedules: any) => schedules);
    const shifts = availableSlots?.map((item: any) => item.shifts)
    const slots = shifts?.flatMap((item: any) => item)
    
    return (
        <div className="mx-20 md:mx-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="col-span-1 md:col-span-4 ">
                  
                    <TeacherSlotss slots={slots} schedules={availableSlots} />
                </div>
                <div className="col-span-4 md:col-span-8">
                    <div className='bg-[#17b3a6] p-4 rounded'>
                        <TeacherProfile {...teacher} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
                        <div className='col-span-1 md:col-span-5'>
                            <AboutTeacher />
                        </div>
                        <div className='col-span-1 md:col-span-3 my-4'>
                            <h3 className="text-lg text- font-semibold mb-2 text-[#565656]">Introduction Video</h3>
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
