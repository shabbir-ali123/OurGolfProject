import { FunctionComponent, useEffect, useRef, useState } from "react";
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
import { singleEventContextStore } from "../contexts/eventContext";
import { ScoreSlider } from "../components/sliders/ScoreSlider";
import AllMembers from "../components/AllMembers";
import { FlexitySlider } from "../components/sliders/FlickitySlider";

import CommentModel from "../components/CommentModel";
import { AboutEvent } from "../components/event/AboutEventSingle";
import { singleTeamsContextStore } from "../contexts/teamContext";
import ScoringTabs from "../components/ScoringTabs";
import { FinalEventGallery } from "../components/FinalEventGallery";
import { FinalSlider } from "../components/sliders/FinalEventSlider";
import EventDetails from "../components/event/EventDetails";
import CeremonyModal from "../components/CeremonyModal";
import EventCeremonyDetails from "../components/EventCeremonyDetails";

const ScoreBoard: FunctionComponent = () => {
  const { t } = useTranslation();

  const { isCreated, singleEvent } = singleEventContextStore();
  const { totalJoinedMembers } = singleTeamsContextStore();
  const { score, scoreLoading } = useScoreContext();
  const positions = ["1st", "2nd", "3rd"];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const shouldShowPlayerScore = !(singleEvent?.driverContest === 0 || singleEvent?.nearPinContest === 0);
  const sortedScore = score?.sort((a: any, b: any) => b.totalScore - a.totalScore);
  const [ceremonyModel, setCeremonyModel] = useState(false)
  const topThreeScores = sortedScore?.slice(0, 3);
  const topThreeScoresWithPosition = topThreeScores?.map((score: any, index: any) => ({
    ...score,
    position: positions[index]
  }));

  console.log(topThreeScoresWithPosition, " postion");
const onClose = (value:any)=>{
  setCeremonyModel(value)
}
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <EventDetails />

        {singleEvent?.scoringType !== "Normal" && (
          <div className="grid  w-full p-0 xl: xl:w-[1200px] mx-auto mt-[200px]">
            {scoreLoading ? (
              <div className="flex justify-center items-center ">
                <div>
                  <img
                    className="w-10 h-10 animate__animated animate__bounce animate__infinite"
                    src="/img/golfball.jpg"
                    alt=""
                  />
                  <p>loading...</p>
                </div>
              </div>
            ) : (
              topThreeScores.length > 2 || screenWidth < 600 ?
                <FlexitySlider>
                  {topThreeScoresWithPosition?.map((item: any) => {
                    return <ScoreSlider item={item} />;
                  })}
                </FlexitySlider> : <div className="flex self-center w-full p-16 justify-around xl:w-[1200px] mx-auto">{topThreeScoresWithPosition?.map((item: any) => {
                  return <ScoreSlider item={item} />;
                })}
                </div>
            )}
          </div>
        )}
        <div
          className={
            singleEvent?.scoringType === "Normal"
              ? "mt-[220px]"
              : "mt-[20px] xl:w-[1200px] mx-auto "
          }
        >
          <FinalEventGallery >
            {singleEvent.imageUrl?.map((item: any) => {
              return <FinalSlider item={item} type="top" />;
            })}
            {singleEvent.imageUrl?.map((item: any) => {
              return <FinalSlider item={item} />;
            })}

          </FinalEventGallery>


        </div>
        {isCreated &&
        <div className="mr-20 flex justify-end">
          <button onClick={() => {
            onClose(true)

          }} className="cursor-pointer p-2 bg-[#17b3a6] rounded-md text-white">Add Event Details</button>
        </div>
}
        {
          ceremonyModel && <CeremonyModal onClose={onClose} eventId={singleEvent.id}/>
        }
        <EventCeremonyDetails    />
        <AllMembers />

        {(singleEvent?.scoringType !== "Regular" && singleEvent?.scoringType !== "Normal") && (
          <>
            <div className="max-w-7xl mx-auto">
              <LeaderBoardTables />

              {/* <IndiviualPlayerScore /> */}
              <ScoringTabs singleEvent={singleEvent} />
            </div>
          </>
        )}

        {singleEvent?.id && (
          <table className="lg:w-[1200px] mx-auto my-10">
            <CommentModel eventIsd={singleEvent?.id} closeModal={() => { }} />
          </table>
        )}
        <div className="w-full lg:w-[1200px] lg:mx-auto">
          <AboutEvent totalJoinedMembers={totalJoinedMembers} />
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
