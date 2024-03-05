import React from 'react';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import TeacherCalender from "../components/TeacherCalender";
import TeacherListSlots from './TeacherListSlots';

export default function EducatorCard() {
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
        <>
            <div className='bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] p-6 my-4'>
                <div className='grid grid-cols-1 xl:grid-cols-8 gap-4'>
                    <div className="md:col-span-6">
                        <div className="flex flex-col lg:flex-row">
                            <div className="text-center ">
                                <img src="/img/user-06.png" width="100px" height="100px" alt="" />
                                <h4>$20/Hr</h4>
                            </div>
                            <div className='mt-4 md:mt-0 md:mx-4 flex-1'>
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                                    <h3>Tinki Roy</h3>
                                    <div className="flex gap-4 mt-2 md:mt-0">
                                        <button className="bg-[#61cbc2] hover:bg-[#61cbc2] text-white font-bold py-2 px-4 rounded">Book An Appointment</button>
                                        <button className="bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded">Chat</button>
                                        <button className="bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded">View Details</button>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-10 mt-4 md:mt-0">
                                    <div className='flex items-center gap-2'>
                                        <MapPinIcon
                                            className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <h4 className='m-0 my-1 p-0'>Location</h4>
                                            <p className='m-0 p-0'>Gilgit Pakistan</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <StarIcon
                                            className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <h4 className='m-0 my-1 p-0'>Rating</h4>
                                            <p className='m-0 p-0'>4.5 (130 ratings)</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='leading-6 text-[#5b5b5b] mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At soluta ipsum tempore error corporis totam fuga ex, ad labore maxime. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, laudantium? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut reiciendis eos quo. Debitis, nesciunt quam? Suscipit sunt nulla ullam sint incidunt qui odio magni dolore iste dolores. Nemo ducimus dolore sint. Ab exercitationem, quas tempora necessitatibus illo velit accusantium. Possimus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <TeacherCalender />
                    </div>
                </div>
                <TeacherListSlots slots={slotsData} />
            </div>
        </>
    );
}
