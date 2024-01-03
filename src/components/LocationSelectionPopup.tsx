// LocationSelectionPopup.tsx

import Select from "react-select";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, ChangeEvent } from "react";
interface LocationSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (locations: string | string[]) => void;
}

const LocationSelectionPopup: React.FC<LocationSelectionPopupProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}: LocationSelectionPopupProps) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const citySets = [
    [
      { value: "TOK", label: "Tokyo" },
      { value: "OSA", label: "Osaka" },
      { value: "KYT", label: "Kyoto" },
      { value: "SAP", label: "Sapporo" },
    ],
    [
      { value: "NAG", label: "Nagoya" },
      { value: "YOK", label: "Yokohama" },
      { value: "OKI", label: "Okinawa" },
      { value: "FUK", label: "Fukuoka" },
    ],
    [
      { value: "KOB", label: "Kobe" },
      { value: "HIK", label: "Hiroshima" },
      { value: "KAN", label: "Kanazawa" },
      { value: "SEN", label: "Sendai" },
    ],
    [
      { value: "NAR", label: "Nara" },
      { value: "MAT", label: "Matsumoto" },
      { value: "KUM", label: "Kumamoto" },
      { value: "HAM", label: "Hamamatsu" },
    ],
    [
      { value: "ITM", label: "Itami" },
      { value: "TAK", label: "Takamatsu" },
      { value: "ATS", label: "Atsugi" },
      { value: "GIF", label: "Gifu" },
    ],
    [
      { value: "TSM", label: "Toyama" },
      { value: "YON", label: "Yonago" },
      { value: "TSU", label: "Tsukuba" },
      { value: "KAG", label: "Kagoshima" },
    ],
    [
      { value: "KCH", label: "Kochi" },
      { value: "IKI", label: "Iki" },
      { value: "MIE", label: "Mie" },
      { value: "OTA", label: "Oita" },
    ],
    [
      { value: "SHI", label: "Shizuoka" },
      { value: "IMA", label: "Imabari" },
      { value: "NUM", label: "Numazu" },
      { value: "RYU", label: "Ryugasaki" },
    ],
    [
      { value: "HAK", label: "Hakodate" },
      { value: "FJI", label: "Fujisawa" },
      { value: "KZU", label: "Kasugai" },
      { value: "USK", label: "Usuki" },
    ],
    [
      { value: "HSG", label: "Higashiosaka" },
      { value: "NAS", label: "Nishinomiya" },
      { value: "URA", label: "Urawa" },
      { value: "MOR", label: "Morioka" },
    ],
  ];

  const renderSelects = () => {
    const numSelects = 10; // Change this to the desired number of selects
    const customStyles = {
      control: (provided: any, state: any) => ({
        ...provided,
        padding: "12px", // Adjust the padding as needed
        borderRadius: "4px", // Optional: Add border-radius for a rounded appearance
        borderColor: state.isFocused ? "#52FF86" : provided.borderColor, // Optional: Change border color on focus
      }),
    };
    const handleLocationSelect = (location: string) => {
      // Check if the location is already selected
      if (!selectedLocations.includes(location)) {
        // Update the selectedLocations state with the new location
        setSelectedLocations((prevSelectedLocations) => [
          ...prevSelectedLocations,
          location,
        ]);
      }
    };
   
    return (
      <div className="max-h-72  overflow-y-auto">
        {Array.from({ length: numSelects }, (_, index) => (
          <div key={index} className="mb-4">
            <Select
              id={`countries-${index}`}
              isMulti
              options={citySets[index % citySets.length].map((city) => ({
                ...city,
                label: `${city.label} ${index + 1}`,
                value: `${city.value}-${index + 1}`,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={customStyles}
              onChange={(selectedOptions) => {
                onLocationSelect(selectedOptions.map((option) => option.value));
                setSelectedLocations((prevSelectedLocations:any) => [
                  ...prevSelectedLocations,
                  ...selectedOptions.map((option) => option.value),
                ]);
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <h4 className="ml-4">What are you looking for?</h4>
          <div className="flex justify-end p-4 fixed top-0 right-0">
            <span
              onClick={onClose}
              className="border-solid border-[2px] border-[#52FF86] rounded-full px-2 p-2 flex justify-center items-center"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {renderSelects()}
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionPopup;
