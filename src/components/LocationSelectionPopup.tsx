import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { XIcon, CheckIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon} from "@heroicons/react/24/outline";

interface LocationSelectionPopupProps {
  onClose: () => void;
  onSelect: (selectedLocations: string[]) => void;
}

const locationsData = [
  {
    mainCity: "City 1",
    subCities: ["SubCity 1A", "SubCity 1B", "SubCity 1C"],
  },
  {
    mainCity: "City 2",
    subCities: ["SubCity 2A", "SubCity 2B", "SubCity 2C"],
  },
  {
    mainCity: "City 3",
    subCities: ["SubCity 3A", "SubCity 3B", "SubCity 3C"],
  },
  // Add more main cities and sub-cities as needed
];

const LocationSelectionPopup: React.FC<LocationSelectionPopupProps> = ({
  onClose,
  onSelect,
}) => {
  const [selectedMainCity, setSelectedMainCity] = useState<string>("");
  const [selectedSubCities, setSelectedSubCities] = useState<string[]>([]);

  const handleMainCityChange = (mainCity: string) => {
    setSelectedMainCity(mainCity);
    setSelectedSubCities([]); // Clear sub-city selection when main city changes
  };

  const handleSubCityChange = (subCity: string) => {
    setSelectedSubCities((prevSubCities) =>
      prevSubCities.includes(subCity)
        ? prevSubCities.filter((city) => city !== subCity)
        : [...prevSubCities, subCity]
    );
  };

  const handleRemoveCity = (city: string) => {
    if (selectedMainCity === city) {
      setSelectedMainCity("");
    } else {
      setSelectedSubCities((prevSubCities) =>
        prevSubCities.filter((subCity) => subCity !== city)
      );
    }
  };

  const handleConfirm = () => {
    const selectedLocations = [...selectedSubCities, selectedMainCity];
    onSelect(selectedLocations);
    onClose();
  };

  return (
    <Transition.Root show as="div">
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-900"
                  >
                    Select Locations
                  </Dialog.Title>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-4">
      <label>What are you looking for?</label>
      <select
        value={selectedMainCity}
        onChange={(e) => handleMainCityChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm rounded-md"
      >
        <option value="Tokyo">Tokyo</option>
        {locationsData.map(({ mainCity }) => (
          <option key={mainCity} value={mainCity}>
            {mainCity}
          </option>
        ))}
      </select>

      {selectedMainCity && (
        <div className="mt-4">
          <label>Sub Cities:</label>
          {locationsData
            .find((location) => location.mainCity === selectedMainCity)
            ?.subCities.map((subCity) => (
              <div key={subCity} className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleSubCityChange(subCity)}
                  className={`${
                    selectedSubCities.includes(subCity)
                      ? "text-blue-600"
                      : "text-gray-600"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-300`}
                >
                  {selectedSubCities.includes(subCity) ? (
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <div className="h-5 w-5 border border-gray-300 rounded-md" />
                  )}
                </button>
                <span className="m-1">{subCity}</span>
                
              </div>
            ))}
        </div>
      )}
    </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
       {/* Add a section to display selected cities */}
  <div className="fixed bottom-0 right-0 p-4 bg-white border border-gray-300 rounded-tl-md">
    <p>Selected Cities:</p>
    {selectedMainCity && (
      <div className="flex items-center">
        <p>Main City: {selectedMainCity}</p>
        {/* Close (cross) button to remove mainCity */}
        <button
          type="button"
          onClick={() => handleRemoveCity(selectedMainCity)}
          className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:border-blue-300 ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    )}
    {selectedSubCities.length > 0 && (
      <div>
        <p>Sub Cities:</p>
        {selectedSubCities.map((subCity) => (
          <div key={subCity} className="flex items-center">
            <p>{subCity}</p>
            {/* Close (cross) button to remove subCity */}
            <button
              type="button"
              onClick={() => handleRemoveCity(subCity)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:border-blue-300 ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
    </Transition.Root>
  );
};

export default LocationSelectionPopup;
