// Availability.tsx
import React from 'react';

interface AvailabilitySlot {
  startTime: string;
  endTime: string;
}

interface AvailabilityProps {
  slots: AvailabilitySlot[];
}

const Availability: React.FC<AvailabilityProps> = ({ slots }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="font-semibold mb-4">Availability</h3>
      <div className="grid grid-cols-2 gap-4">
        {slots.map((slot, index) => (
          <div key={index} className="text-sm text-center text-gray-600 p-2 bg-gray-100 rounded">
            {slot.startTime} - {slot.endTime}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Availability;
