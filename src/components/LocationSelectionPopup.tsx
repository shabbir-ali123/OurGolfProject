import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { locations } from "../constants/locations";
import { API_ENDPOINTS } from "../appConfig";

interface LocationSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (locations: string | string[]) => void;
}

const LocationSelectionPopup: React.FC<LocationSelectionPopupProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

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
      } catch (error) {
        toast.error("No Location Found");
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    console.log("Selected Cities:", selectedCities);
  }, [selectedCities]);
  
  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const handleCityClick = (city: string) => {
    setSelectedCities(prevCities => {
      if (prevCities.includes(city)) {
        return prevCities.filter(c => c !== city);
      } else {
        return [...prevCities, city];
      }
    });

    onLocationSelect(selectedCities);
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="w-full max-w-md p-2 mx-auto text-white bg-slate-500">
        {locations.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => handleClick(index)}
              className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-blue-500 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
            >
              {item.province}
              <span>{activeIndex === index ? '-' : '+'}</span>
            </button>
            <div className={`${index === activeIndex ? 'block' : 'hidden'} overflow-hidden text-gray-500`}>
              {item.sub_cities.map((city, subIndex) => (
                <button
                  key={subIndex}
                  onClick={() => handleCityClick(city)}
                  className={`px-4 py-2 m-1 bg-white text-black border ${selectedCities.includes(city) ? 'bg-black text-black' : 'border-gray-200'} rounded shadow-sm hover:bg-gray-50`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSelectionPopup;
