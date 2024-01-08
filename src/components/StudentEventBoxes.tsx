// EventBoxes.tsx
import React from "react";
import { useTranslation } from "react-i18next";

const EventBoxes: React.FC = () => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mx-auto my-4 gap-1 md:gap-2 lg:gap-2 z-[9999]">
      
        <div className=" cursor-pointer text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-1 md:px-2 lg:px-0 hover:animate-bounce">
          <h3 className="m-0 font-sans text-lg font-semibold text-black ">
            14
          </h3>
          <h4 className="m-0 font-sans text-xs font-semibold text-center">
          {t('COMPLETED')} 
          </h4>
          <h4 className="m-0 font-sans text-xs font-semibold text-center">{t('LESSON')}</h4>
        </div>
        <div className="cursor-pointer text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-2 hover:animate-bounce">
          <h3 className="m-0 font-sans text-lg font-semibold text-black ">
            3
          </h3>
          <h4 className="my-0 font-sans text-xs font-semibold text-center ">
          {t('UPCOMING')} 
          </h4>
          <h4 className="my-0 font-sans text-xs font-semibold text-center">{t('LESSON')}</h4>
        </div>
        <div className="cursor-pointer text-center  border-solid  border-2 border-[#51ff85] rounded-md py-1 px-2 hover:animate-bounce">
          <h3 className="my-0 font-sans text-lg font-semibold text-black ">
            1
          </h3>
          <h4 className="my-0 font-sans text-xs font-semibold text-center">
          {t('PENDING')} 
          </h4>
          <h4 className="my-0 font-sans text-xs font-semibold text-center">{t('LESSON')}</h4>
        </div>
      </div>
  
  );
};

export default EventBoxes;
