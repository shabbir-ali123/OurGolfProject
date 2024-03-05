import React, { useState } from 'react';
import RatingFilter from './RatingFilter';
import LocationFilter from './LocationFilter';
import AvailabilityFilter from './AvailabilityFilter';
import TeacherSkills from './TeacherSkills';

const AllTeacherFilters: React.FC = () => {
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
      <h2 className='text-start'>Filter By</h2>
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
