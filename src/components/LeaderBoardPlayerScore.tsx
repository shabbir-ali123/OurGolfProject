import { FunctionComponent } from "react";
import IndiviualPlayerTableHeader from "./IndiviualPlayerTableHeader";
import IndiviualPlayerTableRow from "./IndiviualPlayerTableRow";
import { useTranslation } from "react-i18next";
import { useScoreContext } from "../contexts/scoreContext";
import { singleEventContextStore } from "../contexts/eventContext";

const LeaderBoardIndiviualPlayerScore: FunctionComponent = () => {
  const { t } = useTranslation();
  const { singleEvent } = singleEventContextStore();
  const { score } = useScoreContext();
  const shouldShowPlayerScore = !(singleEvent?.driverContest === 0 && singleEvent?.nearPinContest === 0);
  return (
    shouldShowPlayerScore && <div className=" my-10 mx-6 xl:mx-0 xl:my-[200px]   ">
 <div className=" hidden xl:flex gap-2 items-center ">
          <img src="/img/golfplyr.png" alt="" width="40px" />
          <b className="text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
            {t("INDIVIUAL_SCORE")}
          </b>
        </div>
      <div className={` lg:mt-20 ${singleEvent?.driverContest === 0
          ? "block"
          : singleEvent?.nearPinContest === 0
            ? "block"
            : "flex flex-col"
        }  relative gap-8 lg:flex-row `}>
        {!(singleEvent?.nearPinContest === 0) &&

          <div className="basis-1/2 ">
            <div className="flex  items-center justify-center basis-1/2 h-[80px] bg-[#0AA3BC]">
              <div className="font-medium text-white text-13xl">
                {t("DRIVE_CONTEXT")} <span className="bg-white text-black rounded-full h-4 w-4 p-2">{singleEvent?.driverContest}</span> 
              </div>
            </div>
            <IndiviualPlayerTableHeader />
            {
              score?.map((item: any) => {
                return (
                  item?.driverContest !== "" && (
                    <IndiviualPlayerTableRow item={item} type="driverContest" />
                  )

                )
              })
            }
          </div>}

        {!(singleEvent?.driverContest === 0) && <div className="basis-1/2">
          <div className=" flex items-center justify-center h-[80px] bg-[#0AA3BC]">
            <div className="font-medium text-white text-13xl">
              {t("NEAR_CONTEXT")} <span className="bg-white text-black rounded-full h-4 w-4 p-2">{singleEvent?.nearPinContest}</span> 
            </div>
          </div>
          <IndiviualPlayerTableHeader />
          {
            score?.map((item: any) => {
              return (
                item?.nearPinContest !== "" && (
                  <IndiviualPlayerTableRow item={item} />
                )

              )
            })
          }
        </div>}
        "

        <div className={`${singleEvent?.driverContest === 0
            ? "top-0 right-1"
            : singleEvent?.nearPinContest === 0
              ? "top-0 right-1"
              : "top-1/8 left-1/2"
          }   right-0 absolute  transform -translate-x-1/2 -translate-y-1/2 w-[170.7px] h-[229.6px] hidden lg:block `} >
          <img
            className="absolute top-[78.4px] left-[0px] w-[170.7px] h-[151.2px]"
            alt=""
            src="/img/ellipse-2305.svg"
          />
          <img
            className="absolute top-[0px] left-[7.7px] w-[109.5px] h-[197.5px] object-cover"
            alt=""
            src="/img/leaderboard.png"
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardIndiviualPlayerScore;
