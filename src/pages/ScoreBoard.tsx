import { FunctionComponent, useRef, useState } from "react";
import ChampionShipName from "../components/ChampionShipName";
import Slider from "../components/Slider";
import LeaderBoardSection from "../components/LeaderBoardSection";
import IndiviualPlayerScore from "../components/LeaderBoardPlayerScore";
import TeamPerformance from "../components/TeamPerformance";
import ScoringTable from "../components/LiveScoringTable";
import { useTranslation } from "react-i18next";
import {
  ScoreContextProvider,
  useScoreContext,
} from "../contexts/scoreContext";
import LeaderBoardTables from "../components/leaderBoard/leaderBoard";
import FinalEventGallery from "../components/FinalEventGallery";
import { singleEventContextStore } from "../contexts/eventContext";
import { ScoreSlider } from "../components/sliders/ScoreSlider";
import AllMembers from "../components/AllMembers";
import Flickity from "react-flickity-component";
import { FlexitySlider } from "../components/sliders/FlickitySlider";

import CommentModel from "../components/CommentModel";
import { AboutEvent } from "../components/event/AboutEventSingle";
import { singleTeamsContextStore } from "../contexts/teamContext";
import ScoringTabs from "../components/ScoringTabs";
const ScoreBoard: FunctionComponent = () => {
  const { t } = useTranslation();

  const { singleEvent } = singleEventContextStore();
  const { totalJoinedMembers } = singleTeamsContextStore();
  const { score, scoreLoading } = useScoreContext()

  console.log(score)
  return (
    <div>
 <div className="">
        <ChampionShipName />
        {singleEvent?.scoringType !== "Normal" && (
          <div className="grid self-center w-full p-4 xl:w-[1200px] mx-auto">
            {scoreLoading ? <div className="flex justify-center items-center ">
              <div>
                <img className="w-10 h-10 animate__animated animate__bounce animate__infinite " src="/img/golfball.jpg" alt="" />
                <p>loading...</p>
              </div>

            </div> : <FlexitySlider>
              {score?.map((item: any) => {
                return <ScoreSlider item={item} />;
              })}
            </FlexitySlider>
            }
          </div>
        )}
        <div
          className={
            singleEvent?.scoringType === "Normal" ? "mt-[20px]" : "mt-[20px] xl:w-[1200px] mx-auto "
          }
        >
          <FinalEventGallery />
        </div>
        
        <AllMembers />
    
       

        {singleEvent?.scoringType !== "Normal" && (
          <>
          <div className="max-w-6xl mx-auto">
          <LeaderBoardTables />
            
          <IndiviualPlayerScore />
            <ScoringTabs/>
          </div>
            
           


          


          </>
        )}

        {singleEvent?.id && (
          <table className="lg:w-[1200px] mx-auto">
            <CommentModel eventIsd={singleEvent?.id} closeModal={() => { }} />
          </table>
        )}
        {/* <Slider/> */}
        <div className="w-full lg:w-[1200px] lg:mx-auto">
          <AboutEvent totalJoinedMembers={totalJoinedMembers} />
        </div>




        {/* <div className="mt-20 mx-[60px]">
          <div className="flex gap-4">
            <img
              className="w-[57px] h-[103px]"
              alt=""
              src="/img/rectangle-1248@2x.png"
            />
            <b className="relative left-[-24px] top-[35px] text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
              {t("SCORING_TABLE")}
            </b>
            <img
              className="w-[57px] h-[103px] object-cover"
              alt=""
              src="/img/flag.png"
            />
          </div>
          <ScoringTable />
        </div> */}
      </div>
    </div>
  );
};

export default ScoreBoard;
