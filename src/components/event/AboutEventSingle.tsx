import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../../contexts/eventContext";
import { useEffect, useState } from "react";

export const AboutEvent = ({ totalJoinedMembers }: any) => {
  const { t } = useTranslation();
  const { singleEvent } = singleEventContextStore();
  const [selectedDays, setSelectedDays] = useState<number>(10);
  const [cancellationFeePercentage, setCancellationFeePercentage] = useState<string>("0%");
  const [calculatedCancellationFee, setCalculatedCancellationFee] = useState<string>("¥0");
  useEffect(() => {
    let percentage = 0;
    if (selectedDays === 5) {
      percentage = 30;
    } else if (selectedDays === 1) {
      percentage = 50;
    }
    setCancellationFeePercentage(`${percentage}%`);

    // Check if singleEvent?.cancellationFee is null, NaN, or undefined; if so, default to 0
    const totalCancellationFee = Number(singleEvent?.cancellationFee);
    const validTotalCancellationFee = !totalCancellationFee || isNaN(totalCancellationFee) ? 0 : totalCancellationFee;

    const calculatedFee = (percentage / 100) * validTotalCancellationFee;
    setCalculatedCancellationFee(`¥${calculatedFee.toFixed(2)}`);
  }, [selectedDays, singleEvent?.cancellationFee]);
  const getYoutubeEmbedUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : undefined;
  };

  const embedUrl = getYoutubeEmbedUrl(singleEvent?.eventVideoUrl);
  return <div className="max-w-6xl mx-6 xl:mx-auto    mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
    <div className="xl:flex items-center gap-10 justify-center bg-[#17b3a6] rounded-t-lg py-4 px-8 xl:p-0">
    
      <h2 className="leading-[20px] xl:leading-[32px] font-semibold text-white text-xl  xl:text-[45px]"> {t('ABOUT_EVENT')}</h2>
      <h2 className=" text-white text-xl m-0 xl:text-[31px]">{singleEvent?.eventName}</h2>
    </div>

    <div className="grid grid-cols-1 gap-0 ">
      <div className="text-start items-center gap-10  bg-[#D7FBF8] py-4 px-10">
        <div className="text-black text-[24px] font-bold basis-4"> {t('DATE')}</div>
        <p className="py-2 ml-0  capitalize text-black flex items-center gap-4"><span className="text-[#17B3A6] text-[20px] font-bold ">{t('EVENT_DATE')}:</span> <span className="xl:text-[26px] text-[#000000] ">{singleEvent?.eventStartDate} {t('START_FROM')} {singleEvent?.eventStartTime} {t('TO')}   <span className="text-black">{singleEvent?.
          eventEndTime
        }  {singleEvent?.eventEndDate}</span></span> </p>
        <p className="py-2 ml-0  text-lg capitalize text-black flex items-center gap-4"><span className="text-[#17B3A6] text-[20px]  font-bold">{t('APPLICATION_DEADLINE')} :</span> <span className="xl:text-[26px] text-[#000000]">{singleEvent?.eventEndDate}</span> </p>
      </div>
      <div className=" items-center gap-10  py-4 px-10 ">
        <div className=" text-[24px] font-bold basis-4 text-black"> {t('EVENT_LOCATION')}</div>
        <p className="py-2 ml-0  text-lg  capitalize text-black flex items-center gap-4"><span className="text-[#17B3A6] text-[20px] font-bold">{t('LOCATION')} :</span> <span className="xl:text-[26px] text-black">{singleEvent?.place}</span></p>
        <div className="flex items-center gap-10  ">

          <p className="py-2 ml-0  xl:text-[26px] capitalize rounded-sm text-black flex items-center gap-4 "><span className="text-[#17B3A6] text-[20px]  font-bold">{t('EVENT_ADDRESS')} :</span >{singleEvent?.address}</p>
        </div>
       
      </div>
      <div className=" ">
          <iframe
            className="col-span-4 sm:col-span-4 "
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8181116.269949623!2d130.64039243803072!3d36.56179855912495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2s!4v1700468556527!5m2!1sen!2s"
            width="100%"
            height="350px"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>


        </div>
      <div className=" items-center gap-10  bg-[#D7FBF8] py-4 px-10">
        <div className="text-black text-[24px] font-bold basis-4 "> {t('EVENT_DETAILS')}</div>
        <p className="py-2 ml-0   capitalize text-black xl:flex items-center gap-4 xl:text-[26px]"><span className="text-[#17B3A6] text-[20px]  font-bold">{t('ABOUT_EVENT')} :</span> {singleEvent?.eventDetails}</p>
        <div className="flex items-center gap-10  ">

          <p className="py-2 ml-0  text-lg capitalize rounded-sm text-black xl:flex items-center gap-4 "><span className="text-[#17B3A6] text-[20px]  font-bold">{t('EVENT_TYPE')}  :</span> <span className="xl:text-[26px] ">{singleEvent?.
            eventType}</span> </p>
        </div>
        <div className="flex items-center gap-10 w-full overflow-x-scroll xl:overflow-x-auto ">

          <p className="py-2 ml-0  text-lg capitalize rounded-sm text-black xl:flex items-center gap-4 "><span className="text-[#17B3A6] text-[20px]  font-bold">{t('SHORT_VIDEO')}  :</span> <span className="xl:text-[26px] xl:overflow-x-outo">{singleEvent?.eventVideoUrl}</span> </p>
        </div>
        <div className="flex items-center gap-10 w-full overflow-x-hidden xl:overflow-x-auto">
            <p className="py-2 ml-0  text-lg capitalize rounded-sm text-black xl:flex items-center gap-4 w-full">
              {embedUrl ? (
                <div className="w-full max-w-full sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-3xl">
                  <iframe
                    className="w-full  h-[45vw] md:h-[30vw] lg:h-[25vw] xl:h-[450px] max-h-[450px]"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <span className="xl:text-[26px]">{singleEvent?.eventVideoUrl}</span>
              )}
            </p>
          </div>
      </div>



      {/* <div className="flex items-center gap-10  ">

        <p className="py-2 ml-0  text-lg capitalize rounded-sm text-black flex items-center gap-4"><span className="text-[#17B3A6] text-[20px]  font-bold">{t('JOINED_MEMBER')} :</span> <span className="xl:text-[26px] ">{totalJoinedMembers}</span> </p>
      </div> */}
    </div>

    <div className=" items-center gap-10   py-4 px-10 ">
      <div className="text-black text-[24px] font-bold basis-4  "> {t('PRICE')}</div>
      <p className="py-2 ml-0  text-lg  capitalize text-black flex items-center gap-4"><span className="text-[#17B3A6] text-[20px]  font-bold">{t('PARTICIPATION_FEE')} :</span><span className="xl:text-[26px] ">{singleEvent?.participationFee}</span></p>
    </div>
    <div className="items-center gap-10  bg-[#D7FBF8] py-4 px-10">
      <div className="text-black text-[24px] font-bold basis-4  ">
        {t('CANCELLATION_FEE')}
      </div>
      <div className="grid  py-2 mx-auto  my-2 py-2">
        <div className="col-span-8 text-4xl text-[#17B3A6] lg:col-span-4 md:col-span-5 md:mr-0 md:mb-0">
          <p className="flex ml-0     gap-4"><span className="text-[#17B3A6] text-[20px]  font-bold">Cancellation Fee :</span>  <span className="xl:text-[26px]  text-black comment-content">{singleEvent?.cancellationFee}</span></p>
          {/* <select
            className="block appearance-none w-full bg-gray-200 border border-[#51ff85] text-[#626262] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:botext-[#17B3A6]"
            id="daySelection"
            value={selectedDays}
            onChange={(e) => setSelectedDays(Number(e.target.value))}
          >
            <option value="10">Cancel 10 days before</option>
            <option value="5"> Cancel 5 days before</option>
            <option value="1"> Cancel 1 day before</option>
          </select> */}


        </div>
      </div>
    </div>
  </div>
}