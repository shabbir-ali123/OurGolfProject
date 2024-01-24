import Select from "react-select";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

interface LocationSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (locations: string[]) => void;
}

const LocationSelectionPopup: React.FC<LocationSelectionPopupProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const [dropdownSelections, setDropdownSelections] = useState<string[][]>([]);
  const [selectedLocations, setSelectedLocations] = useState<any>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.GETEVENTPLACES, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setSelectedLocations(response.data.events);
        setDropdownSelections(Array(10).fill([])); // Initialize dropdown selections
      } catch (error: any) {
        toast.error(`No Location Found`);
      }
    };

    fetchLocations();
  }, []);

  const handleSelectChange = (selectedOptions: any, index: number) => {
    const updatedSelections = dropdownSelections.map((selection, idx) =>
      idx === index
        ? selectedOptions.map((option: any) => option.value)
        : selection
    );
    setDropdownSelections(updatedSelections);
    const currentSelections = updatedSelections.flat();
    console.log("Current Selected Locations:", currentSelections);
  };

  const getCombinedSelections = () => {
    return dropdownSelections.flat();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
          className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <h4 className="ml-4">What are you looking for?</h4>
          <div className="fixed top-0 right-0 flex justify-end p-4">
            <span
              onClick={onClose}
              className="border-solid border-[2px] border-[#52FF86] rounded-full px-2 p-2 flex justify-center items-center"
            >
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </span>
          </div>

          <div className="px-4 pt-5 pb-4 bg-white dark:bg-gray-800 sm:p-6 sm:pb-4">
            {dropdownSelections.map((_, index) => (
              <div key={index} className="mb-4">
                <Select
                  isMulti
                  options={selectedLocations?.map((city: any) => ({
                    value: city.place,
                    label: city.place,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    handleSelectChange(selectedOptions, index)
                  }
                />
              </div>
            ))}
          </div>

          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                const combinedSelections = getCombinedSelections();
                onLocationSelect(combinedSelections);
                onClose();
              }}
              className="inline-flex justify-center w-full px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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
