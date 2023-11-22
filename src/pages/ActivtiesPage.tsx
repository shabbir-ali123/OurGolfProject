// TeacherProfile.tsx
import React, { useState } from "react";
import TeacherTabs from "../components/TeacherTabs";
import EventBoxes from "../components/EventBoxes";
import TeacherCalendar from "../components/TeacherCalender";
import FavTeachers from "../components/FavTeacher";
// import TeacherList from './TeacherList';
import TeacherConDetail from '../components/TeacherConDetail';
import TeacherActivities from "../components/TeacherActivities";

const ActivtiesPage: React.FC = () => {
 

  return (
    <div>

    <TeacherActivities/>
    </div>
    
  );
};

export default ActivtiesPage;
