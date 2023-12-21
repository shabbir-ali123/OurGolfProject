import React, { useState, ChangeEvent } from "react";

interface ScoringTypeProps {
  onChange: (
    scoringType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
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
    driverContest: string;
    nearPinContest: string;
  };
  [Tab.Double]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: string;
    nearPinContest: string;
  };
  [Tab.Triple]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: string;
    nearPinContest: string;
  };
}

const ScoringCategory: React.FC<ScoringTypeProps> = ({
  onChange,
  onInputChange,
  selectedHoles,
}) => {
  const [selectedScoringType, setSelectedScoringType] = useState<Tab>(
    Tab.Single
  );
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Single);
  const [formData, setFormData] = useState<FormData>({
    [Tab.Single]: {
      field1: true,
      field2: false,
      selectedHoles: [],
      driverContest: "",
      nearPinContest: "",
    },
    [Tab.Double]: {
      field1: false,
      field2: false,
      selectedHoles: [],
      driverContest: "",
      nearPinContest: "",
    },
    [Tab.Triple]: {
      field1: true,
      field2: false,
      selectedHoles: [],
      driverContest: "",
      nearPinContest: "",
    },
  });
  React.useEffect(() => {
    // Set the initial scoringType to "Peria"
    handleTabClick(Tab.Single);
  }, []);
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedScoringType(tab);

    // Update checkbox state directly
    const updatedEvent = {
      target: {
        checked: true,
        name: tab,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleScoringTypeChange(updatedEvent);
  };

  const handleScoringTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (!event || !event.target) {
    return;
  }

  const isChecked = event.target.checked;
  const scoringType = event.target.name as Tab;

  if (isChecked) {
    setSelectedScoringType(scoringType);
  } else {
    setSelectedScoringType(Tab.Single);
  }

  // Handle changes for driverContest and nearPinContest separately
  if (event.target.name === "driverContest" || event.target.name === "nearPinContest") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [scoringType]: {
        ...prevFormData[scoringType],
        [event.target.name]: event.target.value,
      },
    }));
  } else {
    // For other inputs, update the formData accordingly
    setFormData((prevFormData) => ({
      ...prevFormData,
      [scoringType]: {
        ...prevFormData[scoringType],
        [event.target.name]: event.target.checked,
      },
    }));
  }

  // Invoke the parent onChange with scoringType and event
  onChange(scoringType, event);
};
const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (!event.target) {
    return;
  }

  const isChecked = event.target.checked;
  const scoringType = event.target.name as Tab;

  setSelectedScoringType(isChecked ? scoringType : Tab.Single);

  setFormData((prevFormData) => ({
    ...prevFormData,
    [scoringType]: {
      ...prevFormData[scoringType],
      [event.target.name]: isChecked,
    },
  }));

  onChange(scoringType, event);
};

const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (!event.target) {
    return;
  }

  const scoringType = selectedScoringType;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [scoringType]: {
      ...prevFormData[scoringType],
      [event.target.name]: event.target.value,
    },
  }));

  onChange(scoringType, event);
};
  return (
    <div className="lg:max-w-6xl mx-auto px-2 py-10">
      <h2 className="text-[#0f1e56] text-4xl">Scoring Category</h2>
      <div className="px-6 py-6 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <h4>
          01 <span className="ml-4">Scoring type</span>
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
              className={
                activeTab === Tab.Single
                  ? "active-tab bg-[#51ff85] rounded-md cursor-pointer animate-bounce py-2 px-4"
                  : "bg-transparent py-2 px-4 cursor-pointer"
              }
            >
              Peria
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
              className={
                activeTab === Tab.Double
                  ? "active-tab bg-[#51ff85] rounded-md animate-bounce cursor-pointer py-2 px-4"
                  : "bg-transparent py-2 px-4 cursor-pointer"
              }
            >
              Double Peria
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
              className={
                activeTab === Tab.Triple
                  ? "active-tab bg-[#51ff85] rounded-md animate-bounce cursor-pointer py-2 px-4"
                  : "bg-transparent py-2 px-4 cursor-pointer"
              }
            >
              Triple Peria
            </button>
          </div>
        </div>

        {/* Render your form based on the activeTab */}
        {selectedScoringType === Tab.Single && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 lg:col-span-12 py-2  md:col-span-5   md:mr-0 md:mb-3">
              <h4>Please select 9 holes</h4>
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={selectedHoles.includes(String(index + 1))}
                      onChange={(e) => onChange("holes", e)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={`checkbox${index + 1}`}>
                      Hole{" "}
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

        {selectedScoringType === Tab.Double && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 lg:col-span-12 py-2  md:col-span-5   md:mr-0 md:mb-3">
              <h4>Please select 12 holes</h4>
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={selectedHoles.includes(String(index + 1))}
                      onChange={(e) => onChange("holes", e)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={`checkbox${index + 1}`}>
                      Hole{" "}
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
        {selectedScoringType === Tab.Triple && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 lg:col-span-12 py-2  md:col-span-5   md:mr-0 md:mb-3">
              <h4>Please select 6 holes</h4>
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {Array.from({ length: 18 }, (_, index) => (
                  <div className="flex items-center" key={index + 1}>
                    <input
                      type="checkbox"
                      checked={selectedHoles.includes(String(index + 1))}
                      onChange={(e) => onChange("holes", e)}
                      id={String(index + 1)}
                      className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                    />
                    <label htmlFor={`checkbox${index + 1}`}>
                      Hole{" "}
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
        <div className="flex items-center  col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            02
            <span className="ml-4">Driver contest</span>
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
          <p className="text-[#ff0000] ml-3">Please select whole number</p>
        </div>
        <div className="flex items-center space-x-4 col-span-12 lg:col-span-2 py-2 md:col-span-2 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            03 <span className="ml-4">Near pin contest </span>
          </label>
          <input
            className="text-center appearance-none block w-[50px] bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="nearPinContest"
            type="number"
            name="nearPinContest"
            placeholder="7"
            min="0"
            
            onChange={onInputChange}
          />
          <p className="text-[#ff0000]">Please select whole number</p>
        </div>
      </div>
    </div>
  );
};

export default ScoringCategory;
