// UserProfile.tsx
import { HandThumbUpIcon, MapPinIcon, PhoneArrowUpRightIcon, EnvelopeIcon, StarIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface UserProfileProps {
    name: string;
    location: string;
    email: string;
    phoneNumber: string;
    rate: number;
    rating: number;
    ratingCount: number;
    about: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
    name,
    location,
    email,
    phoneNumber,
    rate,
    rating,
    ratingCount,
    about,
}) => {
    return (
        <div className="p-6  rounded  text-white ">
            <div className="flex items-center justify-around">
                <div className="flex items-start gap-10">
                    <div className='text-center'>
                        <img
                            className="w-32 h-32 rounded-full"
                            src="/img/user-06.png"
                            alt="Profile"
                        />
                        <div className="mt-4">
                            <div>
                                <button className="bg-green-500 text-[#17b3a6] px-4 py-1 rounded hover:bg-green-600">
                                    Availble
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="ml-4 grid grid-cols-2 gap-6 justify-center">
                       
                            <h2 className="text-lg font-semibold text-white">{name}</h2>
                            <h2 className="text-lg font-semibold text-white">{rate} <span className='text-sm font-normal'>Per/Hr</span></h2>
                     
                        <div className=''>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-2 items-center'>
                                    <MapPinIcon
                                        className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                                        aria-hidden="true"
                                    />
                                    <p className='m-0 font-bold'>Location</p>
                                </div>
                                <p className="text-sm text-white m-0 pl-[calc(1rem+1.2rem)]">{location}</p> 
                            </div>
                        </div>

                        <div className=''>
                            <div className='flex gap-2 items-center'>
                                <EnvelopeIcon
                                    className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                                    aria-hidden="true"
                                />
                                <p className='m-0'>Email</p>
                            </div>
                            <p className="text-sm text-white m-0 pl-[calc(1rem+1.5rem)]">{email}</p>
                        </div>
                        <div className=''>
                            <div className='flex gap-2 items-center'>
                                <PhoneArrowUpRightIcon
                                    className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                                    aria-hidden="true"
                                />
                                <p className='m-0'>Mobile N.o</p>
                            </div>
                            <p className="text-sm text-white m-0 pl-[calc(1rem+1.5rem)]">{phoneNumber}</p>
                        </div>
                        <div className=''>
                            <div className='flex gap-2 items-center'>
                                <StarIcon
                                    className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                                    aria-hidden="true"
                                />
                                <p className='m-0'>Rating</p>
                            </div>
                            <p className="text-sm text-white m-0 pl-[calc(1rem+1.5rem)]">{rating}/{ratingCount} ratings</p>
                        </div>
                    </div>

                </div>
                <div>
                    <button className="bg-green-500 text-[#17b3a6] px-4 py-2 rounded hover:bg-green-600">
                        Book an Appointment
                    </button>
                    <div className='mt-4'>
                        <button className="bg-green-500 text-[#17b3a6] px-4 py-2 rounded hover:bg-green-600 w-full">
                            Chat
                        </button>
                    </div>

                </div>
            </div>

           
        </div>
    );
};

export default UserProfile;
