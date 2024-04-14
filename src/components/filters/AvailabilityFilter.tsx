import React, { useState } from 'react';

interface AvailabilityFilterProps {
  onFilterChange: (availability: 'available' | 'not-available') => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ onFilterChange }) => {
  const [selectedTab, setSelectedTab] = useState<'available' | 'not-available'>('available');

  const handleTabChange = (tab: 'available' | 'not-available') => {
    setSelectedTab(tab);
    onFilterChange(tab);
  };

  return (
    < >
    <div className='py-4'>
    <h3 className='text-start'>Today’s Availability</h3>
     <div className="flex border-b">
      <button
        className={`flex-1 py-2 text-center ${
          selectedTab === 'available' ? 'border-b-2 border-[#2bb9ad] font-medium text-[#2bb9ad]' : 'text-gray-500'
        }`}
        onClick={() => handleTabChange('available')}
      >
        Available
      </button>
      <button
        className={`flex-1 py-2 text-center ${
          selectedTab === 'not-available' ? 'border-b-2 border-[#2bb9ad] font-medium text-[#2bb9ad]' : 'text-gray-500'
        }`}
        onClick={() => handleTabChange('not-available')}
      >
        Not Available
      </button>
    </div>
    </div>
    
    </>
   
  );
};

export default AvailabilityFilter;
