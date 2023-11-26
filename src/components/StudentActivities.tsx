// TeacherActivities.jsx
import React from "react";
import TeacherCalSec from "./StudentCalSec";
import ActivtiesTabs from "./ActivtiesTabs"
const TeacherActivities = () => {
  return (
    <div className="grid grid-cols-12 gap-0 ">
      {/* Left Column */}
      <div className="col-span-12  lg:col-span-4 ">
        <TeacherCalSec/>
      </div>

      {/* Middle Column */}
      <div className="col-span-12 lg:col-span-8 py-4 px-12 box-border  ">
        <ActivtiesTabs/>
      </div>
    </div>
  );
};

export default TeacherActivities;
