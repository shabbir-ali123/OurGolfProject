import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ScoringTypeProps {
  onChange: (scoringType: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedHoles: string[];
}

enum Tab {
  Normal = "normal",
  Single = "single",
  Double = "double",
  Triple = "triple",
}

interface FormData {
  [Tab.Normal]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: number;
    nearPinContest: number;
  };
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
    [Tab.Normal]: {
      field1: true,
      field2: false,
      selectedHoles: Array.from({ length: 9 }, (_, i) => String(i + 1)),
      driverContest: 0,
      nearPinContest: 0,
    },
    [Tab.Single]: {
      field1: true,
      field2: false,
      selectedHoles: Array.from({ length: 9 }, (_, i) => String(i + 1)),
      driverContest: 0,
      nearPinContest: 0,
    },
    [Tab.Double]: {
      field1: false,
      field2: false,
      selectedHoles: Array.from({ length: 12 }, (_, i) => String(i + 1)),
      driverContest: 0,
      nearPinContest: 0,
    },
    [Tab.Triple]: {
      field1: true,
      field2: false,
      selectedHoles: Array.from({ length: 6 }, (_, i) => String(i + 1)),
      driverContest: 0,
      nearPinContest: 0,
    },
  });

  useEffect(() => {
    handleTabClick(Tab.Normal);
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
      setSelectedScoringType(Tab.Normal);
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
    localStorage.setItem('score', selectedScoringType);
    localStorage.setItem('selected', JSON.stringify(formData[selectedScoringType].selectedHoles))
  }, [selectedScoringType, formData]);

  return (
    <div className="px-2 py-10 mx-auto lg:max-w-7xl">
      <div className="p-4 mt-4  rounded-md "
       style={{
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
      >
        <h2 className="text-4xl text-[#626262]">{t('SCORING_CATEGORY')}</h2>
        <h4 className="text-[#626262]">
          01 <span className="ml-4 text-[#626262]">{t('SCORING_TYPE')}</span>
        </h4>
        <div className="flex gap-10">
        <div>
            <input
              className="rounded-full"
              type="checkbox"
              checked={selectedScoringType === Tab.Normal}
              name={Tab.Normal}
              onChange={handleScoringTypeChange}
            />
            <button
              onClick={() => handleTabClick(Tab.Normal)}
              type="button"
              className={
                activeTab === Tab.Normal
                  ? "active-tab bg-[#51ff85] rounded-md cursor-pointer animate-bounce py-2 px-4"
                  : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
              }
            >
              {t('NORMAL')}
            </button>
          </div>
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
                  : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
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
                  : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
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
                  : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
              }
            >
              {t('TRIPLE_PERIA')}
            </button>
          </div>
        </div>
        {selectedScoringType === Tab.Normal && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
              <h4 className="text-[#626262]">Please select 9 holes</h4>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={
                        index < 9 || selectedHoles.includes(String(index + 1))
                      }
                      onChange={(e) => handleHoleSelection(e, index)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={String(index + 1)} className="text-[#626262]">
                      {t('HOLE')}
                      <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-[#626262]">
                        {index + 1}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedScoringType === Tab.Single && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
              <h4 className="text-[#626262]">Please select 9 holes</h4>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={
                        index < 9 || selectedHoles.includes(String(index + 1))
                      }
                      onChange={(e) => handleHoleSelection(e, index)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={String(index + 1)} className="text-[#626262]">
                      {t('HOLE')}
                      <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-[#626262]">
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
              <h4 className="text-[#626262]">Please select 12 holes</h4>
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
                      onChange={(e) => handleHoleSelection(e, index)}
                      id={"double" + String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={`double${index + 1}`} className="text-[#626262]">
                      {t('HOLE')}
                      <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-[#626262]">
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
          <div className="grid grid-cols-9 mx-auto text-[#626262] lg:gap-x-16 ">
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
                      onChange={(e) => handleHoleSelection(e, index)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={`triple${index + 1}`}>
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
        <p className="text-[#626262]">Optional</p>
        <div className="flex items-center col-span-12 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="driverContest"
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] capitalize"
          >
            02
            <span className="ml-4">{t('DRIVER_CONTEST')}</span>
          </label>
          <input
            className="text-center appearance-none block w-[50px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 ml-[36px] leading-tight focus:outline-none"
            id="driverContest"
            type="number"
            name="driverContest"
            placeholder=""
            min="0"
            onChange={onInputChange}
          />

        </div>
        <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-2 md:col-span-2 md:mr-0 md:mb-3">
          <label
            htmlFor="nearPinContest"
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] capitalize"
          >
            03 <span className="ml-4">{t('PIN_CONTEST')}</span>
          </label>
          <input
            className="text-center appearance-none block w-[50px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 ml-[36px] leading-tight focus:outline-none "
            id="nearPinContest"
            type="number"
            name="nearPinContest"
            placeholder=""
            min="0"
            onChange={onInputChange}
          />

        </div>
      </div>
    </div>
  );

};

export default ScoringCategory;
