import React, { useState } from "react";
import TeacherListButton from './TeacherListButton';
import { faMapMarkerAlt,faPhoneAlt,faEnvelope,faWifi, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'animate.css';
import ReschedulePop from "../components/ReschedulePop";
const TeacherList: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const handleSelectTime = (selectedTime: string) => {
     
      console.log(`Selected Time: ${selectedTime}`);
    };
    const handleBookAppointment = () => {
      setShowModal(false)
      handleSelectTime("Default Appointment Time");
      
    };
    const buttons = [
        {
            color: 'bg-[#0038FF]',
            title: 'Book an Appointment',
            icon: '/img/appointment.svg',
            onClick: () => setShowModal(true),
          
        },
        {
            color: 'bg-[#FF0000]',
            title: 'Like',
            icon: '/img/like.svg',
        },
        {
            color: 'bg-[#52FF86]',
            title: 'View Details',
            icon: '/img/details.svg',
            textColor:"#FF0000"
        },
    ];
    return (
        <>
            <div className='mt-2 cursor-pointer animate__animated animate__fadeInLeft'>
                <div className='flex justify-between items-end shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-2 relative   '>
                    <div>
                    <div className='flex items-center animate__animated animate__bounce animate__repeat-2'>
                        <img
                            className='h-[55.25px] w-[55.25px] rounded-full border-solid border-4 border-[#51ff85] '
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                        />
                        <div className='ml-3'>
                            <p className='text-xs font-bold tracking-wide text-[#52FF86]  m-0'>
                                Vivek Kumar
                            </p>
                            <p className='text-[9.13px] font-normal text-[#838383] m-0 '>
                                Bogotá,Colombia
                            </p>
                        </div>
                    </div>
                    <div className='mt-2 p-2 ml-3'>
                        <ul className='list-none m-0 p-0'>
                            <li className='flex items-center mb-2'>
                                <img
                                    className='w-[22.39px] h-[12.45px]  '
                                    src='/img/stars.png'
                                    alt=''
                                />
                                <span className='ml-6 font-normal text-[9.96px] leading-3'>
                                    4.5(1300 ratings)
                                </span>
                            </li>
                            <li className='flex items-center mb-2  '>
                            <FontAwesomeIcon icon={faPhoneAlt} className="w-4 h-4 rotate-90 " />
                                <span className='ml-6 font-normal text-[9.96px] leading-3'>
                                    85985-95415
                                </span>
                            </li>
                            <li className='flex items-center mb-2'>
                            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4  " />
                                <span className='ml-6 font-normal text-[9.96px] leading-3'>
                                    sheetalviven@gmail.com
                                </span>
                            </li>
                        </ul>
                    </div>
                    </div>
                    
                    <div className='absolute top-[-2px] right-[-2px] flex animate__animated animate__bounce'>
                        <img className='w-16' src='/img/teacher_rate.png' alt='' />
                        <span className='font-bold text-base tracking-wide absolute flex items-center justify-center w-full h-full'>
                              ¥30
                            <sub className='font-normal text-[5px] tracking-wide'>
                                Per/Hr
                            </sub>
                        </span>
                    </div>
                    <div className='gap-2'>
                        {buttons.map((btn, index) => (
                            <TeacherListButton
                                key={index}
                                color={btn.color}
                                title={btn.title}
                                icon={btn.icon}
                                onClick={btn.onClick}
                                textColor={btn.textColor}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg">
           <ReschedulePop onSelectTime={handleSelectTime} onClick={handleBookAppointment} />
          </div>
        </div>
      )}
        </>
    );
};
export default TeacherList;
