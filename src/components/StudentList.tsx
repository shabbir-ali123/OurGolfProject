import React from 'react';
import StudentListButton from './StudentListButton';
import { faMapMarkerAlt,faPhoneAlt,faEnvelope,faWifi, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StudentList: React.FC = () => {
    const buttons = [
        {
            color: 'bg-[#0038FF]',
            title: 'Accept',
            icon: '/img/appointment.svg',
          
        },
        {
            color: 'bg-[#FF0000]',
            title: 'Like',
            icon: '/img/like.svg',
        },
        {
            color: 'bg-[#D3FFE1]',
            title: '11:45 AM - 12:30 AM',
            icon: '',
            textColor:"#FF0000"
        },
    ];
    return (
        <>
            <div className='mt-6'>
                <div className='flex justify-between items-center shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-4 relative   '>
                    <div>
                    <div className='flex items-center'>
                        <img
                            className='h-[55.25px] w-[55.25px] rounded-full border-solid border-4 border-[#51ff85]'
                            src='/img/student.png'
                            alt=''
                        />
                        <div className='ml-3'>
                            <p className='text-xs font-bold tracking-wide text-[#52FF86]  m-0'>
                                Vivek Kumar
                            </p>
                            <p className='text-[9.13px] font-normal text-[#838383] m-0'>
                                Bogotá,Colombia
                            </p>
                        </div>
                    </div>
                    <div className='mt-4 p-2 ml-3'>
                        <ul className='list-none m-0 p-0'>
                            <li className='flex items-center mb-2'>
                                <img
                                    className='w-[22.39px] h-[12.45px]'
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
                    
                   
                    <div className='grid gap-2'>
                        {buttons.map((btn, index) => (
                            <StudentListButton
                                key={index}
                                color={btn.color}
                                title={btn.title}
                                icon={btn.icon}
                                onClick={() => {}}
                                textColor={btn.textColor}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default StudentList;
