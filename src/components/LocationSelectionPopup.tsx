import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";

interface LocationSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (locations: string[]) => void;
  selectedCitiesData?: any;
  sendDataToParent?: any;
}

const LocationSelectionPopup: React.FC<LocationSelectionPopupProps> = ({ isOpen, onClose, onLocationSelect, selectedCitiesData, sendDataToParent }) => {
  const { t } = useTranslation();
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);

  useEffect(() => {
    selectedCitiesData?.(selectedCities);
    sendDataToParent?.(selectedCities);
  }, [selectedCities, selectedCitiesData, sendDataToParent]);
  
  const cityKeys = {
    "HOKKAIDO_TOHOKU": ["Hokkaido", "Aomori Prefecture", "Iwate Prefecture", "Miyagi Prefecture", "Akita", "Yamagata Prefecture", "Fukushima Prefecture"],
    "KANTO": ["Ibaraki Prefecture", "Tochigi Prefecture", "Gunma Prefecture", "Saitama", "Chiba prefecture", "Tokyo", "Kanagawa Prefecture"],
    "CHUBU": ["Niigata Prefecture", "Toyama Prefecture", "Ishikawa Prefecture", "Fukui prefecture", "Yamanashi Prefecture", "Nagano"],
    "TOKAI": ["Shizuoka Prefecture", "Aichi prefecture", "Mie Prefecture", "Gifu Prefecture"],
    "KINKI": ["Shiga Prefecture", "Kyoto", "Osaka prefecture", "Hyogo prefecture", "Nara Prefecture", "Wakayama Prefecture"],
    "SHIKOKU": ["Tottori prefecture", "Shimane Prefecture", "Okayama Prefecture", "Hiroshima", "Yamaguchi Prefecture","Tokushima", "Kagawa Prefecture", "Ehime Prefecture", "Kochi Prefecture"],
    "KYUSHU": ["Fukuoka Prefecture", "Saga Prefecture", "Nagasaki Prefecture", "Kumamoto Prefecture", "Oita Prefecture", "Miyazaki prefecture", "Kagoshima prefecture", "Okinawa Prefecture"],
  };

  const toggleProvince = (province: string): void => {
    setExpandedProvince(expandedProvince === province ? null : province);
  };

  const handleCitySelection = (cityKey: string): void => {
    setSelectedCities(prevSelectedCities => {
      if (prevSelectedCities.includes(cityKey)) {
        return prevSelectedCities.filter(c => c !== cityKey);
      } else {
        return [...prevSelectedCities, cityKey];
      }
    });
  };

  const isCitySelected = (cityKey: string): boolean => {
    return selectedCities.includes(cityKey);
  };
  
  const submitSelection = (): void => {
    const selectedCityNames = selectedCities.map(cityKey => t(cityKey));
    onLocationSelect(selectedCityNames);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 h-[100vh] ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity backdrop-blur" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 bg-opacity-30"></div>
        </div>
        <div className="w-full px-10 py-10 inline-block overflow-y-auto scrollbar h-[600px] text-left align-bottom transition-all transform bg-white bg-opacity-80 rounded-lg shadow-xl sm:my-8 sm:align-middle  sm:w-full xl:max-w-[50rem] xl:px-0 py-0" role="dialog" aria-modal="true">
          <div className="fixed top-0 right-0 flex justify-end p-4">
            <span onClick={onClose} className="border-solid border-[2px] border-[#52FF86] rounded-full px-2 p-2 flex justify-center items-center">
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </span>
          </div>
          <div className="pb-4 mt-10 sm:p-6 sm:pb-4 bg-white">
            {Object.entries(cityKeys).map(([province, cityKeyList]) => (
              <div key={province} onClick={() => toggleProvince(province)} className='border-2 border-solid my-4 peer h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-4 rounded-[4px] border-[#cdcdcd] focus:border-[#cdcdcd]'>
                <button className='bg-transparent'>{t(province)}</button>
                {expandedProvince === province && (
                  <div className="flex flex-wrap">
                    {cityKeyList.map((cityKey) => (
                      <button key={cityKey}
                        onClick={() => handleCitySelection(cityKey)}
                        className={`m-1 px-2 py-1 rounded ${isCitySelected(cityKey) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                        {t(cityKey)}
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
