// TeacherProfile.tsx
import React, { useState } from "react";
import TeacherTabs from "../components/StudentTabs";
import EventBoxes from "../components/StudentEventBoxes";
import TeacherCalendar from "../components/StudentCalender";
import FavTeachers from "../components/FavTeacher";
// import TeacherList from './TeacherList';
import TeacherConDetail from '../components/StudentConDetail';
import TeacherActivities from "../components/StudentActivities";

const ActivtiesPage: React.FC = () => {
 

  return (
    <div>

    <TeacherActivities/>
    </div>
    
  );
};

export default ActivtiesPage;
