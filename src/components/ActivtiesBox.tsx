import React from 'react';

interface ActivtiesBoxProps {
  activity?: any;
}

const ActivtiesBox: React.FC<ActivtiesBoxProps> = ({ activity }) => {
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
    <div className={ ` px-2 bg-${bgClr} border border-${borderClr} shadow-lg rounded-lg border-solid mt-3`} style={{backgroundColor: bgClr , border:borderClr}}>
      <div className="flex items-center">
        <img
          src={activity.schedule.Teacher.profileImage}
          alt="Profile"
          className="h-10 w-10 rounded-full mr-4"
        />
        <div>
          <p className="text-gray-600 font-product-sans font-normal text-xl">Your Appointment with {activity.schedule.Teacher.firstName} is {activity.status}</p>
        </div>
      </div>
    </div>  
  );
};

export default ActivtiesBox;
