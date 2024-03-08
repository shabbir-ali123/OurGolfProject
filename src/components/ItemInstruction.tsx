import React from "react";
import { useTranslation } from "react-i18next";

const ItemInstruction: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="px-2 mx-auto lg:max-w-7xl ">
      <div className="rounded-md p-4 mt-4"
        style={{
          boxShadow:
            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        }}
      >
        <h2 className="text-[#626262] text-4xl px-16">
          {t('PARTICIPANTS_ITEMS')}
        </h2>
        <p className="px-16 text-[#626262]">
          {t('INSTRUCTION')}
        </p>
        <div className="gap-16 lg:flex">
          <div className="col-span-8 gap-24 py-2 mx-16 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
            <div className="flex  col-span-3 gap-2 py-4">
              <input type="checkbox" id="fullNameCheckbox" className="w-6 h-6 rounded-full border-2 border-solid border-[#17b3a6] cursor-pointer" />
              <label htmlFor="fullNameCheckbox" className="ml-2">
                <h4 className="py-1 m-0 text-[#626262]">{t('FULL_NAME')}</h4>
                <p className="m-0 text-[#626262]">{t('NAME_EXAMPLE')}</p>
              </label>
            </div>
            <div className="flex  col-span-3 gap-2">
              <input type="checkbox" id="emailCheckbox" className="w-6 h-6 rounded-full border-2 border-solid border-[#17b3a6] cursor-pointer" />
              <label htmlFor="emailCheckbox" className="ml-2">
                <h4 className="py-1 m-0 text-[#626262]">{t('EMAIL')}</h4>
                <p className="m-0 text-[#626262]">{t('EMAIL_EXAMPLE')}</p>
              </label>
            </div>
          </div>
          <div className="col-span-8 gap-24 py-2 mx-16 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
            <div className="flex  col-span-3 gap-2 py-4">
              <input type="checkbox" id="telephoneCheckbox" className="w-6 h-6 rounded-full border-2 border-solid border-[#17b3a6] cursor-pointer" />
              <label htmlFor="telephoneCheckbox" className="ml-2">
                <h4 className="py-1 m-0 text-[#626262]">{t('TELEPHONE')}</h4>
                <p className="m-0 text-[#626262]">{t('TELEPHONE_EXAMPLE')}</p>
              </label>
            </div>
            <div className="flex  col-span-3 gap-2">
              <input type="checkbox" id="handicapCheckbox"  className="w-6 h-6 rounded-full border-2 border-solid border-[#17b3a6] cursor-pointer"/>
              <label htmlFor="handicapCheckbox" className="ml-2">
                <h4 className="py-1 m-0 text-[#626262]">{t('HANDICAP_SCORE')}</h4>
                <p className="m-0 text-[#626262]">{t('HANDICAP_EXAMPLE')}</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInstruction;
