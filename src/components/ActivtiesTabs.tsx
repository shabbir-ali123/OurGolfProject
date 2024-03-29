import { Tab } from "@headlessui/react";
import ActivtiesBox from "../components/ActivtiesBox";
import { categories } from "../constants/activities";
import { useTranslation } from "react-i18next";

export default function Activeties() {  
  const { t, i18n } = useTranslation();

  const defaultTabIndex = Object.keys(categories).indexOf('TodayActivities');
  const tabNumbers = [29, 34, 32];

  return (
    <div className="flex flex-wrap xl:flex-nowrap">
      <div className="w-full">
        <Tab.Group defaultIndex={defaultTabIndex}>
          <Tab.List className="flex items-center justify-center">
            <div className="flex gap-6 py-2 lg:flex-nowrap">
              {Object.keys(categories).map((category, index) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full rounded-md py-2 text-base font-normal leading-5 sm:font-bold md:text-lg cursor-pointer
                    ring-white ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                    ${
                      selected
                        ? `bg-gradient-to-b from-[#0AE94D] to-[#00A632] rounded-lg text-white shadow-lg h-18 w-[120px] sm:w-[170px] sm:h-16 md:h-32 md:w-[250px] xl:w-[340px] animate-bounce`
                        : `bg-[#ffff] shadow-lg border-solid border-2 border-[#51ff85] h-18 w-[100px] sm:w-[170px] sm:h-16 md:h-32 md:w-250px] xl:w-[340px]`
                    }`
                  }
                >
                  <div className="items-center justify-center text-center md:flex ">
                    <div
                      className={`bg-[#E8FFEF] rounded-full font-regular  text-[12px] w-8 h-8 flex items-center justify-center  md:text-[24px] md:font-bold md:w-16  md:h-16 text-[#52FF86] animate-bounce`}
                    >
                      {tabNumbers[index]}
                    </div>
                    <span className="ml-2">{  t(category.toLocaleUpperCase())}</span>
                  </div>
                </Tab>
              ))}
            </div>
          </Tab.List>
          <Tab.Panels>
            {Object.keys(categories).map((category) => (
              <Tab.Panel key={category}>
                <div className=" xl:h-[520px] xl:overflow-y-scroll scrollbar">
                 
                  {categories[category].map((activity, index) => (
                    <ActivtiesBox
                      key={index}
                      imageUrl={activity.imageUrl}
                      description={activity.description}
                      bgColor={activity.bgColor}
                      borderColor={activity.borderColor}
                    />

                  ))}
              <style>{`
        
        @media screen and (min-width: 1300px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
           
          }
               
                .scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height:10px;
                }

                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }

                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
