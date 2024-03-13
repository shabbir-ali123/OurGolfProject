import React, { useState } from 'react';
import RatingFilter from './RatingFilter';
import LocationFilter from './LocationFilter';
import AvailabilityFilter from './AvailabilityFilter';
import TeacherSkills from './TeacherSkills';
import { useTranslation } from "react-i18next";
const AllTeacherFilters: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(rating);
    console.log(`Selected Rating: ${rating}`);
  };

  const handleAvailabilityChange = (availability: 'available' | 'not-available') => {
    console.log(`Selected Availability: ${availability}`);
    // Add filtering logic here
  };
  const handleSkillChange = (selectedSkills: string[]) => {
    console.log('Selected Skills: ', selectedSkills);
    // Add your filtering logic here based on selected skills
  };
  return (
    <div className="text-center p-4  bg-white shadow-lg">
      <h2 className='text-start'>{t("FILTER_BY")}</h2>
      <div>
        <RatingFilter onRatingChange={handleRatingChange} />
        <LocationFilter />
        <AvailabilityFilter onFilterChange={handleAvailabilityChange} />
        <TeacherSkills onSkillChange={handleSkillChange}/>
      </div>
    </div>
  );
};

export default AllTeacherFilters;
