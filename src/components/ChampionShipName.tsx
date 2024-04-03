import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../contexts/eventContext";

const ChampionShipName: FunctionComponent = () => {
  const {t, i18n} = useTranslation();
  const {singleEvent} =  singleEventContextStore();

  return (
    <div className="flex justify-center mt-5 md:mt-20 mx-5 md:mx-[130px] rounded-lg bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] p-5 md:p-[23px] text-left text-3xl text-white font-body-b2  animate__animated animate__backInLeft">
      <div className="w-full md:w-[1038px] flex flex-wrap md:flex-row items-center justify-center md:justify-center gap-4 md:gap-[20px] lg:gap-[182px]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[24px]">
          <img
            className="w-[123px] h-[123px] object-cover md:rounded-[50%]"
            alt=""
            src={singleEvent?.imageUrl[0] || "/img/BG-GOLF.jpg"}
          />
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="relative w-[115px] h-[29px]">
              <div className="absolute top-[0px] left-[0px] rounded-8xs bg-seagreen-200 w-[115px] h-[29px]" />
              <div className="absolute top-[6px] left-[9px] leading-[18px]">
                {singleEvent?.eventType || t('OFFICIAL')}
              </div>
            </div>
            <div className="relative text-2xl md:text-2xl tracking-[-0.17px] lg:text-21xl  leading-[30px] font-semibold text-black">
            {singleEvent?.eventName || t('ZOZO_CHAMPIONSHIP')}
            </div>
            <div className="flex flex-row items-center justify-start gap-2 text-base md:text-xl text-darkslategray-300">
              <img
                className="w-[22.5px] h-6"
                alt=""
                src={"/img/group-1000008655.svg"}
              />
              <div className="relative  leading-[18px]">
                {singleEvent?.createdAt}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start flex-1 gap-4 md:flex-row md:text-5xl lg:text-darkgray-400">
          <img
            className="w-[23px] h-[27.9px]"
            alt=""
            src="/img/group-1000008649.svg"
          />
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="relative text-base md:text-xl  leading-[18px]">
              {singleEvent?.place || t('HIROSHIMA_JAPAN')}
            </div>
            <div className="relative text-base md:text-xl  leading-[18px] text-lightseagreen-200">
              {t("CHAMPIONSHIP_AREA")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionShipName;
