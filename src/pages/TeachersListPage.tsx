import React from "react";
import AllTeacherFilters from "../components/AllTeacherFilters";
import TeacherListHeader from "../components/TeacherListHeader";
import { EducatorCard } from "../components/EducatorCard";
import { teacherContext } from "../contexts/teachersContext";

const TeachersListPage: React.FC = () => {
  const { teachers } = teacherContext();

  return (
    <div className="mx-2 xl:mx-20 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-4">
        {/* Add order-last on small screens so this comes after the main content */}
        <div className="col-span-12 xl:col-span-3 bg-gray-200 p-4 h-full order-last xl:mt-14 xl:order-first">
          <AllTeacherFilters />
        </div>
        {/* Add order-first on small screens so this comes before the filters */}
        <div className="col-span-12 xl:col-span-9 rounded py-4 xl:px-10 ">
          <TeacherListHeader />
          {teachers?.map((teacher: any, index: any) => {
            return (
              <EducatorCard
                key={index}  // Added a key for list rendering best practices
                firstName={teacher.firstName}
                lastName={teacher.lastName}
                imgUrl={teacher.imageUrl ? teacher.imageUrl : "/img/user-06.png"}
                location={teacher.location}
                rating={teacher.rating}
                aboutMyself={teacher.aboutMyself}
                schedules={teacher.schedules}
                hourlyRate={teacher.hourlyRate}
                teacherId={teacher.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeachersListPage;
