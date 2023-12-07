
import React from "react";
import StudentCalSec from "./StudentCalSec";
import ActivtiesTabs from "./ActivtiesTabs"
const StudentActivities = () => {
  return (
    <div className="grid grid-cols-12 ">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-4 mx-16 animate__animated animate__fadeInLeft">
        <StudentCalSec/>
      </div>

      {/* Middle Column */}
      <div className="col-span-12 lg:col-span-8 py-4 px-12 box-border  animate__animated animate__fadeInRight">
        <ActivtiesTabs/>
      </div>
    </div>
  );
};

export default StudentActivities;
