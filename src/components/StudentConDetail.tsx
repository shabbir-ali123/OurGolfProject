import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt,faPhoneAlt,faEnvelope,faWifi } from "@fortawesome/free-solid-svg-icons";
import DropDown from "./DropDown"
import AvailabilityTabs from "./AvailavilityTabs";
export const TeacherConDetail = () => {
    const handleSelectTime = (selectedTime: string) => {
        console.log("Selected Time:", selectedTime);
        // Add your logic here to handle the selected time
      };
  return (
    <div className="box">
      <div className="grid my-6">
        <div className="flex items-center gap-2 ">
            <div className="">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] text-[#51ff85]" />
            </div>
        <h3 className="text-black font-bold text-xs font-sans">Location</h3>
        
        </div>
        <div className="div">
        <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">Bogotá, Colombia(South America),</p>
        </div>
        
      </div>
     
      <div className="grid my-6">
        <div className="flex items-center gap-2">
            <div className="">
            <FontAwesomeIcon icon={faPhoneAlt} className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] text-[#51ff85]" />
            </div>
        <h3 className="text-black font-bold text-xs font-sans">Mobile No</h3>
        
        </div>
        <div className="div">
        <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">85985-95415</p>
        </div>
        
      </div>
      <div className="grid my-6">
        <div className="flex items-center gap-2">
            <div className="">
            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] text-[#51ff85]" />
            </div>
        <h3 className="text-black font-bold text-xs font-sans">Email</h3>
        
        </div>
        <div className="div">
        <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">iamwithyou@gmail.com</p>
        </div>
        
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="">
            <FontAwesomeIcon icon={faWifi} className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] text-[#51ff85]" />
            </div>
        <h3 className="text-black font-bold text-xs font-sans">Availability</h3>
        
        </div>
        <div className="div">
        <DropDown/>
        </div>
        
      </div>
      <AvailabilityTabs onSelectTime={handleSelectTime}/>
    </div>
  );
};
export default TeacherConDetail ;