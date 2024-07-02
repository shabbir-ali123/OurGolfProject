import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReviewsModal from '../components/comments/ReviewsModal';

interface ActivtiesBoxProps {
  activity?: any;
}

const ActivtiesBox: React.FC<ActivtiesBoxProps> = ({ activity }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useNavigate();
  let bgClr;
  let borderClr;
  let textColor;

  if (activity.status === "PENDING") {
    bgClr = "#F2FAFF";
    borderClr = "#00A4FE";
  } else if (activity.status === "CANCELLED") {
    bgClr = "#FFE6E6";
    borderClr = "#00A4FE";
  } else if (activity.status === "COMPLETED") {
    bgClr = "#0ad5c4";
    borderClr = "none";
    textColor = "white";
  } else if (activity.status === "BOOKED") {
    bgClr = "#cffffb";
    borderClr = "none";
    textColor = "#ffff";
  }

  const handleComplete = () => {
    setShowModal(true);
  };

  console.log(activity, "ma hoon");
  const tId = localStorage.getItem("teacher_id");

  return (
    <div
      className={`px-2 bg-${bgClr} border border-${borderClr} shadow-lg rounded-lg border-solid mt-3`}
      style={{ backgroundColor: bgClr, border: borderClr }}
      onClick={() => {
        activity.schedule?.Teacher?.id
          ? router("/teacher-details/" + activity.schedule?.Teacher?.id)
          : router("/appointments/");
      }}
    >
      <div className="grid grid-cols-12 items-center">
        <div className='flex justify-start items-center col-span-8'>
          <img
            src={activity.schedule?.Teacher?.teacher?.imageUrl || activity?.bookedShifts?.imageUrl}
            alt="Profile"
            className="h-10 w-10 rounded-full mr-4"
          />
          <p className="text-gray-600 font-product-sans font-normal text-xl">
            You have an {activity.status} Appointment with {activity.schedule?.Teacher?.firstName || activity?.bookedShifts?.nickName}
          </p>
        </div>
        <div className='flex justify-end col-span-4'>
          <p
            className='bg-[#03bb3a] p-2 rounded text-white ml-2 cursor-pointer'
            onClick={() => router(activity?.bookedShifts ? '/appointments' : '/notification-page')}
          >
            See Details
          </p>
          <Link to="/message-page" className=''>
            <p className='bg-[#3b82f6] p-2 rounded text-white ml-2'>Chat</p>
          </Link>
          {activity.status === "BOOKED" && (
            <p
              className='bg-[#ff9800] p-2 rounded text-white ml-2 cursor-pointer'
              onClick={handleComplete}
            >
              Complete
            </p>
          )}
        </div>
      </div>
      {/* {showModal && <ReviewsModal onClose={() => setShowModal(false)} />} */}
    </div>
  );
};

export default ActivtiesBox;
