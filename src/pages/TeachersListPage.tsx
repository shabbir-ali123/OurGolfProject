import React from 'react';
import AllTeacherFilters from '../components/AllTeacherFilters';
import TeacherListHeader from '../components/TeacherListHeader';
import EducatorCard from '../components/EducatorCard';
import { teacherContext } from '../contexts/teachersContext';

const TeachersListPage: React.FC = () => {
  const { teachers} = teacherContext();
  console.log(teachers, 'tecahers')
  return (
    <div className=" mx-20 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-3 bg-gray-200 p-4 h-full xl:mt-14">
          <AllTeacherFilters/>
        </div>
        <div className="col-span-12 xl:col-span-9  rounded py-4 px-10">
          
          <TeacherListHeader/>
          <EducatorCard/>
          <EducatorCard/>
          <EducatorCard/>
          <EducatorCard/>
        </div>
      </div>
    </div>
  );
};

export default TeachersListPage;
