import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import {  teacherContext, useTeacherContext } from '../contexts/teachersContext';
import RatingFilter from './filters/RatingFilter';
import LocationFilter from './filters/LocationFilter';
import AvailabilityFilter from './filters/AvailabilityFilter';
import TeacherSkills from './filters/TeacherSkills';
import NameFilter from './filters/NameFilter';
const AllTeacherFilters: React.FC = () => {
  const {handleAvailability, handleRating, handleSubjects, handleLocationSearch, handleNameSearch} = teacherContext();

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const handleRatingChange = (rating: number | null) => {
    handleRating(rating);
  };

  const handleAvailabilityChange = (availability: 'available' | 'not-available') => {
    const isAvailable = (availability === 'available' ? true : false);
    handleAvailability(isAvailable);
  };
  const handleSkillChange = (selectedSkills: string[]) => {
    handleSubjects(selectedSkills);
  };

  const handleLocationChange = (e: any) => {
    handleLocationSearch(e.target.value);
  };

  const handleNameChange = (e: any) => {
    handleNameSearch(e.target.value);
  };

  return (
    <div className="text-center p-4  bg-white shadow-lg">
      <h2 className='text-start'>{t("FILTER_BY")}</h2>
      <div>
        <RatingFilter onRatingChange={handleRatingChange} />
        <LocationFilter handleLocationChange={handleLocationChange}/>
        
        <AvailabilityFilter onFilterChange={handleAvailabilityChange} />
        <TeacherSkills onSkillChange={handleSkillChange}/>
      </div>
    </div>
  );
};

export default AllTeacherFilters;
