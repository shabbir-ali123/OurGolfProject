// EventCard.tsx
import React from 'react';

interface EventCardProps {
    imageUrl: string;
    name: string;
    description: string;
}

const EventCard: React.FC<EventCardProps> = ({ imageUrl, name, description }) => {
    return (
        <div className="mx-6 mt-20 bg-white border-2 border-[#17B3A6] border-solid  rounded-lg shadow p-4 text-center transition duration-300
                        hover:bg-[#17B3A6] hover:text-white hover:border hover:border-white hover:border-solid ">
            <img src={imageUrl} alt={name} className="w-full xl:h-64 object-cover rounded-t-lg" />
            <h3 className="text-[22px] font-semibold mt-6 m-1 ">{name}</h3>
            <hr className='bg-[#17B3A6] hover:bg-white h-1 w-[60px]' />
            <p className="mt-1 py-4 text-[16px]">{description}</p>
        </div>
    );
};

export default EventCard;
