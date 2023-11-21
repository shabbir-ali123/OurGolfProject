import React from "react";
import {
    faCalendar,
   
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CalendarSection: React.FC = () => {
    const iconStyles: React.CSSProperties = {
        fontSize: '24px',
        color: 'black',
        
      };
  return (
    <div className="flex justify-center border-solid border-2 border-[#51ff85] rounded-md">
      <div className="flex items-center gap-6">
        <div>
        <FontAwesomeIcon icon={faCalendar} style={iconStyles} />
        </div>
        <h4 className="text-black font-sans text-xl font-bold">Check Calendar</h4>
      </div>
    </div>
  );
};

export default CalendarSection;
