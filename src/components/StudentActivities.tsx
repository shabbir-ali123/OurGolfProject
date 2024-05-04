
import React, { useState } from "react";
import StudentCalSec from "./StudentCalSec";
import ActivtiesTabs from "./ActivtiesTabs"
const StudentActivities = () => {
  const [selectedDate, setSelectedDate] = useState()
  // const handleSelectedDate = (date: any) => {
  //   setSelectedDate(date)
  // }

  console.log(selectedDate, 'SD')
  return (
    <div className="grid grid-cols-12 ">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-4 mx-16 animate__animated animate__fadeInLeft">
        <StudentCalSec selectedDatee={setSelectedDate}/>
      </div> 

      {/* Middle Column */}
      <div className="col-span-12 lg:col-span-8 py-4 px-12 box-border  animate__animated animate__fadeInRight">
        <ActivtiesTabs selectedDate={selectedDate}/>
      </div>
    </div>
  );
};

export default StudentActivities;
