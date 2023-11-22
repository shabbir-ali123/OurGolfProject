import React from 'react';
import TeacherListButton from './TeacherListButton';

const TeacherList: React.FC = () => {
    const buttons = [
        {
            color: 'bg-[#0038FF]',
            title: 'Book an Appointment',
            icon: '/img/appointment.svg',
          
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
            <div className='mt-6'>
                <div className='shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-4 relative   '>
                    <div className='flex items-center'>
                        <img
                            className='border-4 border-black  h-[55.25px] w-[55.25px] rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
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
                            <li className='flex items-center mb-2'>
                                <img
                                    className='w-[22.39px] h-[12.45px]'
                                    src='/img/phone.png'
                                    alt=''
                                />
                                <span className='ml-6 font-normal text-[9.96px] leading-3'>
                                    85985-95415
                                </span>
                            </li>
                            <li className='flex items-center mb-2'>
                                <img
                                    className='w-[22.39px] h-[12.45px]'
                                    src='/img/email.png'
                                    alt=''
                                />
                                <span className='ml-6 font-normal text-[9.96px] leading-3'>
                                    sheetalviven@gmail.com
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className='absolute top-[-2px] right-[-2px] flex'>
                        <img className='' src='/img/teacher_rate.png' alt='' />
                        <span className='font-bold text-base tracking-wide absolute flex items-center justify-center w-full h-full'>
                            $30
                            <sub className='font-normal text-[5px] tracking-wide'>
                                Per/Hr
                            </sub>
                        </span>
                    </div>
                    <div className='absolute right-[14px] bottom-[23px] flex items-center gap-1'>
                        {buttons.map((btn, index) => (
                            <TeacherListButton
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
export default TeacherList;
