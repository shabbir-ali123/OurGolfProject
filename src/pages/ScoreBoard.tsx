import { FunctionComponent } from "react";
import ChampionShipName from "../components/ChampionShipName";
import Slider from "../components/Slider";
import LeaderBoardSection from "../components/LeaderBoardSection";
import LeaderBoardScoringTab from "../components/LeaderBoardScoringTable";
import IndiviualPlayerScore from "../components/LeaderBoardPlayerScore";
import TeamPerformance from "../components/TeamPerformance";
import ScoringTable from "../components/ScoringTable";
import { useTranslation } from "react-i18next";

const ScoreBoard: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <div className="font-poppins">
      <div className="flex flex-col mx-[50px]">
        <ChampionShipName />
        <Slider />
        <div className="mt-[400px]">
          <LeaderBoardSection />
        </div>
        <IndiviualPlayerScore />
        <TeamPerformance title={t("DRIVE_CONTEXT")} />
        <TeamPerformance title={t("NEAR_CONTEXT")} />
        <div className="mt-20 mx-[60px]">
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
        </div>
      </div>

      {/* <LeaderBoardScoringTab /> */}
    </div>
  );
};

export default ScoreBoard;
