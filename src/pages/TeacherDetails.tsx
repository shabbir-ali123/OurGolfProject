import React from 'react';
import TeacherProfile from '../components/TeacherProfile';
import AboutTeacher from '../components/AboutTeacher';

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

    return (
        <div className="mx-20 ">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">

                    <div className="bg-gray-100 p-4 rounded">

                        <h2>Left Sidebar</h2>
                    </div>
                </div>
                <div className="col-span-8 ">
                    <div className='bg-[#17b3a6]'>
                        <TeacherProfile {...userProfileProps} />
                    </div>
                   <div className="grid grid-cols-8 ">
                    <div className='col-span-4'>
                    <AboutTeacher />
                    </div>
                   
                   <div className='col-span-4'>
                   Introduction Video
                   </div>
                   </div >

                   
                </div>

            </div>
        </div>
    );
};

export default TeacherDetails;
