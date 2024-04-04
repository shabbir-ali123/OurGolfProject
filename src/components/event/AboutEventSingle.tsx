import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../../contexts/eventContext";

export const AboutEvent  = ({totalJoinedMembers}:any) => {
    const { t } = useTranslation();
    const { singleEvent} = singleEventContextStore();
return    <div className="mr-4  lg:mr-0 lg:w-full flex flex-col justify-center py-4 px-10 mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
<div className="flex items-center gap-10">
  <div className="relative w-[90.5px] h-[147.5px]">
    <img
      className="absolute top-[60px] left-[0px] w-[90.5px] h-[87.5px]"
      alt=""
      src="/img/ellipse-2303.svg"
    />
    <img
      className="absolute top-[0px] left-[22.5px] w-[58px] h-[108px] object-cover"
      alt=""
      src="/img/rectangle-1249@2x.png"
    />
  </div>
  <h2 className="tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-xl  xl:text-21xl"> {t('ABOUT_EVENT')}</h2>
  <h2 className=" text-lightseagreen-200 text-21xl">{singleEvent?.eventName}</h2>
</div>

<div className="grid grid-cols-1 gap-0 py-4 ">
  <div className=" items-center gap-10  ">
    <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('DATE')}</div>
    <p className="py-0 text-lg capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">{t('EVENT_DATE')}:</span> {singleEvent?.eventStartDate} {t('START_FROM')} {singleEvent?.eventStartTime} {t('TO')} {singleEvent?.
      eventEndTime
    }</p>
    <p className="py-0 text-lg capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">{t('APPLICATION_DEADLINE')} :</span> {singleEvent?.eventEndDate}</p>
  </div>
  <div className=" items-center gap-10  ">
    <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('EVENT_LOCATION')}</div>
    <p className="py-0 text-lg font-bold capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px]">{t('LOCATION')} :</span> {singleEvent?.place}</p>
    <div className="flex items-center gap-10  ">

      <p className="py-0 text-lg capitalize rounded-sm text-lightseagreen-200 "><span className="text-gray-500 basis-[200px] font-bold">{t('EVENT_ADDRESS')} :</span>{singleEvent?.address}</p>
    </div>
    <div className=" col-span-12 mx-4 sm:mx-16 md:col-span-8 lg:col-span-8 ">
      <iframe
        className="col-span-4 sm:col-span-4 rounded-2xl"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8181116.269949623!2d130.64039243803072!3d36.56179855912495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2s!4v1700468556527!5m2!1sen!2s"
        width="100%"
        height="350px"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>


    </div>
  </div>
  <div className=" items-center gap-10  ">
    <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('EVENT_DETAILS')}</div>
    <p className="py-0 text-lg font-medium capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">{t('ABOUT_EVENT')} :</span> {singleEvent?.eventDetails}</p>
    <div className="flex items-center gap-10  ">

      <p className="py-0 text-lg capitalize rounded-sm text-lightseagreen-200 "><span className="text-gray-500 basis-[200px] font-bold">{t('EVENT_TYPE')}  :</span> {singleEvent?.
        eventType}</p>
    </div>

  </div>



  <div className="flex items-center gap-10  ">

    <p className="py-0 text-lg capitalize rounded-sm text-lightseagreen-200 "><span className="text-gray-500 basis-[200px] font-bold">{t('JOINED_MEMBER')} :</span> {totalJoinedMembers}</p>
  </div>
</div>

<div className=" items-center gap-10  ">
  <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('PRICE')}</div>
  <p className="py-0 text-lg font-bold capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">{t('PARTICIPATION_FEE')} :</span>{singleEvent?.participationFee}</p>
</div>
<div className=" items-center gap-10  ">
  <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('CANCELLATION_FEE')}</div>
  <p className="py-0 text-lg font-bold capitalize text-lightseagreen-200">10 days before: 0% <br />5 days before: 30% <br />
  1 day before: 10%</p>
</div>
</div>
}