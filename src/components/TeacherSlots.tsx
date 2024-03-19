import React, { useState } from 'react';

interface TeacherSlots {
  startTime: string;
  endTime: string;
}

interface TeacherSlotsProps {
  slots: TeacherSlots[];
}

const TeacherSlotss: React.FC<TeacherSlotsProps> = ({ slots }:any) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mt-10">
      <h3 className="font-semibold mb-4 text-lg">Availability</h3>
      <div className="grid lg:grid-cols-2 sm:grid-cols-3 gap-4">
        {slots?.map((slot:any, index:any) => (
          <button
            key={index}
            className={`text-sm text-center px-1 py-4 rounded-lg shadow-sm ${
              activeIndex === index
                ? 'bg-[#17b3a6] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {slot.startTime} - {slot.endTime}
          </button>
        ))}
      </div>
      <button className="bg-[#17b3a6] text-white text-lg px-4 py-4 cursor-pointer rounded hover:bg-green-600 w-full my-6">
                        Book an Appointment
                    </button>
    </div>
  );
};

export default TeacherSlotss;
