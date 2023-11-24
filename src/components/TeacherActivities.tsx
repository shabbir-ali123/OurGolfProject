// TeacherActivities.jsx
import React from "react";
import TeacherCalSec from "../components/TeacherCalSec";
import ActivtiesTabs from "../components/ActivtiesTabs"
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
