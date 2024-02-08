import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface JapanCities {
  [key: string]: string[];
}

const japanCities: JapanCities = {
  "Kanto": ["Tokyo", "Kanagawa", "Saitama", "Chiba", "Gunma", "Ibaraki", "Tochigi", "Yamanashi"],
  "Kinki": ["Osaka", "Kyoto", "Nara", "Shiga", "Wakayama"],
  "Hokkaido": ["Hokkaido"],
  "Tohoku": ["Tohoku"],
  "Koushinetsu and Hokuriku": ["Koushinetsu and Hokuriku"],
  "Tokai": ["Tokai"],
  "Shikoku": ["Shikoku"],
  "Chubu": ["Chubu"],
  "Kyushu": ["Kyushu"],
  "Okinawa": ["Okinawa"]
};

interface LocationSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (locations: string[]) => void;
  selectedCitiesData?: any
}

const LocationSelectionPopup: React.FC<LocationSelectionPopupProps> = ({ isOpen, onClose, onLocationSelect, selectedCitiesData }) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);
  
  const toggleProvince = (province: string): void => {
    setExpandedProvince(expandedProvince === province ? null : province);
  };

  const handleCitySelection = (city: string): void => {
    setSelectedCities(prevSelectedCities => {
      if (prevSelectedCities.includes(city)) {
        return prevSelectedCities.filter(c => c !== city);
      } else {
        return [...prevSelectedCities, city];
      }
    });
  };

  const isCitySelected = (city: string): boolean => {
    return selectedCities.includes(city);
  };

  const submitSelection = (): void => {
    onLocationSelect(selectedCities);
    onClose();
  };
  selectedCitiesData(selectedCities);
  return (
    <div className={`fixed inset-0 z-50 h-[100vh] ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true">
          <div className="fixed top-0 right-0 flex justify-end p-4">
            <span onClick={onClose} className="border-solid border-[2px] border-[#52FF86] rounded-full px-2 p-2 flex justify-center items-center">
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </span>
          </div>

          <div className=" mt-10 pb-4 sm:p-6 sm:pb-4">
            {Object.entries(japanCities).map(([province, cities]) => (
              <div key={province} onClick={() => toggleProvince(province)} className='border-2 border-solid my-4  peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-4 rounded-[4px] border-[#cdcdcd] focus:border-[#cdcdcd]'>
                <button className='bg-transparent' >{province}</button>
                {expandedProvince === province && (
                  <div className="flex flex-wrap">
                    {cities.map((city) => (
                      <button key={city}
                        onClick={() => handleCitySelection(city)}
                        className={`m-1 px-2 py-1 rounded ${isCitySelected(city) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={submitSelection} className="inline-flex justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionPopup;
