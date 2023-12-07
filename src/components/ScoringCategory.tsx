import React, { useState } from "react";

enum Tab {
  Single = "single",
  Double = "double",
  Triple = "triple",
}

interface FormData {
  [Tab.Single]: {
    field1: boolean;
    field2: boolean;
  };
  [Tab.Double]: {
    field1: boolean;
    field2: boolean;
  };
  [Tab.Triple]: {
    field1: boolean;
    field2: boolean;
  };
}

const ScoringCategory: React.FC = () => {
  console.log("Rendering ScoringCategory");
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Single);
  const [formData, setFormData] = useState<FormData>({
    [Tab.Single]: {
      field1: true,
      field2: false,
    },
    [Tab.Double]: {
      field1: false,
      field2: false,
    },
    [Tab.Triple]: {
      field1: true, // Set to true to make the checkbox checked by default
      field2: false,
    },
  });

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (fieldName: string, isChecked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [activeTab]: {
        ...prevData[activeTab],
        [fieldName]: isChecked,
      },
    }));
  };

  return (
    <div className="lg:max-w-6xl mx-auto px-2">
      <h2 className="text-[#0f1e56] text-4xl">
        Items to be entered by participants
      </h2>
      <div className="px-6 py-6 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <h4>Scoring type</h4>
        <div className="flex gap-10">
          <div>
            <input
            className="rounded-full "
              type="checkbox"
              checked={formData[Tab.Triple].field1}
              onChange={(e) => handleCheckboxChange("field1", e.target.checked)}
            />
            <button
              onClick={() => handleTabClick(Tab.Single)}
              className={activeTab === Tab.Single ? "active-tab bg-[#51ff85] rounded-md  cursor-pointer animate-bounce py-2 px-4" : "bg-transparent py-2 px-4 cursor-pointer"}
            >
              Peria
            </button>
          </div>
          <div>
            <input
            className="rounded-full"
              type="checkbox"
              checked={formData[Tab.Triple].field1}
              onChange={(e) => handleCheckboxChange("field2", e.target.checked)}
            />
            <button
              onClick={() => handleTabClick(Tab.Double)}
              className={activeTab === Tab.Double ? "active-tab bg-[#51ff85] rounded-md animate-bounce cursor-pointer py-2 px-4" : "bg-transparent py-2 px-4 cursor-pointer"}
            >
              Double Peria
            </button>
          </div>
          <div>
            <input
            className="rounded-full"
              type="checkbox"
              checked
              
            />
            <button
              onClick={() => handleTabClick(Tab.Triple)}
              className={activeTab === Tab.Triple ? "active-tab bg-[#51ff85] rounded-md animate-bounce cursor-pointer py-2 px-4" : "bg-transparent py-2 px-4 cursor-pointer"}
            >
              Triple Peria
            </button>
          </div>
        </div>

        {/* Render your form based on the activeTab */}
        {activeTab === Tab.Single && (
          <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 lg:col-span-12 py-2  md:col-span-5   md:mr-0 md:mb-3">
              <h4>Please select 18 holes</h4>
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[10px] border-solid border-2 border-[#51ff85] rounded-full">1</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">2</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">3</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">4</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">5</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">6</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">7</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">8</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">9</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">10</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">11</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">12</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">13</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">14</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">15</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">16</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">17</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">18</span></label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === Tab.Double && (
            <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
            <div className="col-span-12 lg:col-span-12 py-2  md:col-span-5   md:mr-0 md:mb-3">
              <h4>Please select 12 holes</h4>
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[10px] border-solid border-2 border-[#51ff85] rounded-full">1</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">2</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">3</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">4</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">5</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">6</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">7</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">8</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">9</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">10</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">11</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">12</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">13</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">14</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">15</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">16</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">17</span></label>
                </div>
                <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">18</span></label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === Tab.Triple && (
             <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
             <div className="col-span-12 lg:col-span-12 py-2  md:col-span-5   md:mr-0 md:mb-3">
               <h4>Please select 6 holes</h4>
               <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[10px] border-solid border-2 border-[#51ff85] rounded-full">1</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">2</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">3</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">4</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">5</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">6</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">7</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">8</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">9</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">10</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">11</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">12</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">13</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">14</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">15</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">16</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">17</span></label>
                 </div>
                 <div className="flex items-center">
                 <input type="checkbox" id="checkbox1" className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full " />
                 <label htmlFor="checkbox1">Hole <span className=" py-[2px] px-[6px] border-solid border-2 border-[#51ff85] rounded-full">18</span></label>
                 </div>
               </div>
             </div>
           </div>
        )}
        <div className="flex items-center  col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
            <label
              htmlFor="date"
              className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Driver contest
            </label>
            <input
              className="text-center appearance-none block w-[50px]  bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 ml-[36px] leading-tight focus:outline-none focus:bg-white"
              id="grid-Event-Name"
              type="number"
              placeholder="3"
            />
            <p className="text-[#ff0000] ml-3">Please select whole number</p>
          </div>
          <div className="flex items-center space-x-4 col-span-12 lg:col-span-2 py-2 md:col-span-2 md:mr-0 md:mb-3">
            <label
              htmlFor="date"
              className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
             Near pin contest
            </label>
            <input
              className="text-center appearance-none block w-[50px]  bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-Event-Name"
              type="number"
              placeholder="7"
            />
            <p className="text-[#ff0000]">Please select whole number</p>
          </div>
      </div>
      
    </div>
  );
};

export default ScoringCategory;
