import React from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

interface ActivtiesBoxProps {
  activity?: any;
}

const ActivtiesBox: React.FC<ActivtiesBoxProps> = ({ activity }) => {
  const router = useNavigate();
  let bgClr;
  let borderClr;
  
  if (activity.status == "PENDING") {
    bgClr = "#F2FAFF";
    borderClr = "#00A4FE";
  }
  else if (activity.status == "CANCELLED") {
    bgClr = "#FFE6E6";
    borderClr = "#00A4FE";
  }

  return (
    <div className={ ` px-2 bg-${bgClr} border border-${borderClr} shadow-lg rounded-lg border-solid mt-3`} style={{backgroundColor: bgClr , border:borderClr}} onClick={() => router(activity?.bookedShifts ? '/appointments' : '/notification-page')}>
      <div className="flex items-center">
        <img
          src={activity.schedule?.Teacher?.teacher?.imageUrl || activity?.bookedShifts?.imageUrl}
          alt="Profile"
          className="h-10 w-10 rounded-full mr-4"
        />
        <div className='flex'>
          <p className="text-gray-600 font-product-sans font-normal text-xl">Your Appointment with {activity.schedule?.Teacher?.firstName || activity?.bookedShifts?.nickName} is {activity.status}</p>
          <p className='bg-[#03bb3a] p-2 rounded text-white ml-2'>{activity?.bookedShifts ? 'Teacher' : 'Student'}</p>
        </div>
      </div>
    </div>  
  );
};

export default ActivtiesBox;
