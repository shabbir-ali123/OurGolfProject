import React from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

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
    <div className={ ` px-2 bg-${bgClr} border border-${borderClr} shadow-lg rounded-lg border-solid mt-3`} style={{backgroundColor: bgClr , border:borderClr}} >
      <div className="grid grid-cols-12 items-center">
      
        <div className='flex justify-start items-center col-span-8'>
        <img
          src={activity.schedule?.Teacher?.teacher?.imageUrl || activity?.bookedShifts?.imageUrl}
          alt="Profile"
          className="h-10 w-10 rounded-full mr-4"
        />
          <p className="text-gray-600 font-product-sans font-normal text-xl">Your Appointment with {activity.schedule?.Teacher?.firstName || activity?.bookedShifts?.nickName} is {activity.status}</p>
          
          
          
        </div>
        <div className='flex justify-end col-span-4'>
          <p className='bg-[#03bb3a] p-2 rounded text-white ml-2 cursor-pointer' onClick={() => router(activity?.bookedShifts ? '/appointments' : '/notification-page')}>{activity?.bookedShifts ? 'Teacher' : 'See Details'}</p>
          <Link to="/message-page" className=''>
          <p className='bg-[#3b82f6] p-2 rounded text-white ml-2'>Chat</p>
          </Link>
          </div>
      </div>
    </div>  
  );
};

export default ActivtiesBox;
