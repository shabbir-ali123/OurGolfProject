import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ScoringTypeProps {
  onChange: (scoringType: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedHoles: string[];
}

enum Tab {
  Single = "single",
  Double = "double",
  Triple = "triple",
}

interface FormData {
  [Tab.Single]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: number;
    nearPinContest: number;
  };
  [Tab.Double]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: number;
    nearPinContest: number;
  };
  [Tab.Triple]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: number;
    nearPinContest: number;
  };
}

const ScoringCategory: React.FC<ScoringTypeProps> = ({
  onChange,
  onInputChange,
  selectedHoles,
}) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  
  const [selectedScoringType, setSelectedScoringType] = useState<Tab>(Tab.Single);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Single);
  const [formData, setFormData] = useState<FormData>({
    [Tab.Single]: {
      field1: true,
      field2: false,
      selectedHoles: [],
      driverContest: 0, 
      nearPinContest: 0, 
    },
    [Tab.Double]: {
      field1: false,
      field2: false,
      selectedHoles: [],
      driverContest: 0, 
      nearPinContest: 0, 
    },
    [Tab.Triple]: {
      field1: true,
      field2: false,
      selectedHoles: [],
      driverContest: 0, 
      nearPinContest: 0, 
    },
  });

  useEffect(() => {
    handleTabClick(Tab.Single);
  }, []);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedScoringType(tab);
    const updatedEvent = {
      target: {
        checked: !selectedScoringType.includes(tab),
        name: tab,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleScoringTypeChange(updatedEvent);
  };

  const handleScoringTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const scoringType = event.target.name as Tab;
    if (isChecked) {
      setSelectedScoringType(scoringType);
    } else {
      setSelectedScoringType(Tab.Single);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [scoringType]: {
        ...prevFormData[scoringType],
        [event.target.name]: event.target.checked,
      },
    }));
    onChange(scoringType, event);
  };

  const handleHoleSelection = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const hole = String(index + 1);
    const updatedSelectedHoles = formData[selectedScoringType].selectedHoles.includes(hole)
      ? formData[selectedScoringType].selectedHoles.filter(h => h !== hole)
      : [...formData[selectedScoringType].selectedHoles, hole];
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [selectedScoringType]: {
        ...prevFormData[selectedScoringType],
        selectedHoles: updatedSelectedHoles,
      },
    }));
  };

  useEffect(() => {
    console.log({
      selectedScoringType: selectedScoringType,
      selectedHoles: formData[selectedScoringType].selectedHoles,
    });
  }, [selectedScoringType, formData]);

  return (
    <div className="px-2 py-10 mx-auto lg:max-w-6xl">
      
      <div className="p-4 mt-4 bg-gray-900 bg-opacity-50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm">
      <h2 className="text-4xl text-white">{t('SCORING_CATEGORY')}</h2>
        <h4 className="text-white">
          01 <span className="ml-4 text-white">{t('SCORING_TYPE')}</span>
        </h4>
        <div className="flex gap-10">
          <div>
            <input
              className="rounded-full"
              type="checkbox"
              checked={selectedScoringType === Tab.Single}
              name={Tab.Single}
              onChange={handleScoringTypeChange}
            />
            <button
              onClick={() => handleTabClick(Tab.Single)}
              type="button"
              className={
                activeTab === Tab.Single
                  ? "active-tab bg-[#51ff85] rounded-md cursor-pointer animate-bounce py-2 px-4"
                  : "bg-transparent py-2 px-4 cursor-pointer text-white"
              }
            >
              {t('PERIA')}
            </button>
          </div>
          <div>
            <input
              className="rounded-full"
              type="checkbox"
              checked={selectedScoringType === Tab.Double}
              name={Tab.Double}
              onChange={handleScoringTypeChange}
            />
            <button
              onClick={() => handleTabClick(Tab.Double)}
              type="button"
              className={
                activeTab === Tab.Double
                  ? "active-tab bg-[#51ff85] rounded-md animate-bounce cursor-pointer py-2 px-4"
                  : "bg-transparent py-2 px-4 cursor-pointer text-white"
              }
            >
              {t('DOUBLE_PERIA')}
            </button>
          </div>
          <div>
            <input
              className="rounded-full"
              type="checkbox"
              checked={selectedScoringType === Tab.Triple}
              name={Tab.Triple}
              onChange={handleScoringTypeChange}
            />
            <button
              onClick={() => handleTabClick(Tab.Triple)}
              type="button"
              className={
                activeTab === Tab.Triple
                  ? "active-tab bg-[#51ff85] rounded-md animate-bounce cursor-pointer py-2 px-4"
                  : "bg-transparent py-2 px-4 cursor-pointer text-white"
              }
            >
              {t('TRIPLE_PERIA')}
            </button>
          </div>
        </div>

        {selectedScoringType === Tab.Single && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
              <h4 className="text-white">Please select 9 holes</h4>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={
                        index < 9 || selectedHoles.includes(String(index + 1))
                      }
                      onChange={(e) => onChange("holes", e)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={String(index + 1)} className="text-white">
                    {t('HOLE')}
                      <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-white">
                        {index + 1}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedScoringType === Tab.Double && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
              <h4 className="text-white">Please select 12 holes</h4>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={
                        !(index < 12)
                          ? selectedHoles.includes(String(index + 1))
                          : true
                      }
                      onChange={(e) => onChange("holes", e)}
                      id={"double" + String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={`checkbox${index + 1}`} className="text-white">
                    {t('HOLE')}
                      <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-white">
                        {index + 1}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedScoringType === Tab.Triple && (
          <div className="grid grid-cols-9 mx-auto text-white lg:gap-x-16 ">
            <div className="col-span-12 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
              <h4>{t('SELECT_HOLE')}</h4>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={
                        !(index < 6)
                          ? selectedHoles.includes(String(index + 1))
                          : true
                      }
                      onChange={(e) => onChange("holes", e)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={`checkbox${index + 1}`}>
                    {t('HOLE')}
                      <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">
                        {index + 1}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center col-span-12 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-white capitalize"
          >
            02
            <span className="ml-4">{t('DRIVER_CONTEST')}</span>
          </label>
          <input
            className="text-center appearance-none block w-[50px] bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 ml-[36px] leading-tight focus:outline-none focus:bg-white"
            id="driverContest"
            type="number"
            name="driverContest"
            placeholder="3"
            min="0"
            onChange={onInputChange}
          />
          <p className="text-[#ff0000] ml-3">{t('NUMBER_SELECT')}</p>
        </div>
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-2 md:col-span-2 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block mb-2 text-xs font-bold tracking-wide text-white capitalize"
          >
            03 <span className="ml-4">{t('PIN_CONTEST')}</span>
          </label>
          <input
            className="text-center appearance-none block w-[50px] bg-gray-200 text-white border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="nearPinContest"
            type="number"
            name="nearPinContest"
            placeholder="7"
            min="0"
            onChange={onInputChange}
          />
          <p className="text-[#ff0000]">{t('NUMBER_SELECT')}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoringCategory;

