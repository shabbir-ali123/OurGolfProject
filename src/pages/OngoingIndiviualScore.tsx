import { FunctionComponent } from "react";
import LiveScoringHole from "../components/LiveScoringHole";
import SectionCardFormFilter from "../components/SectionCardFormFilter";
import IndividualPlayerScore from "../components/LiveIndividualPlayerScore";
import FriendSection from "../components/SingleTeamName";
import { Link } from "react-router-dom";
import ChampionShipName from "../components/ChampionShipName";
import ScoringTable from "../components/ScoringTable";
import ScoringTab from "../components/ScoringTabs"
const OngoingIndiviualScore: FunctionComponent = () => {
  return (
    <div className="   text-left text-lg text-white font-poppins mt-20 ">
      <ChampionShipName />
      {/* <FriendSection /> */}
       <div className="[background:linear-gradient(180deg,_#edfffd,_#f2fffa)] max-w-screen-2xl mx-auto mt-[50px] border-solid border-2 border-[#51ff85] rounded-md">
        <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-6 gap-4  bg-white p-2 rounded shadow-md mt-8">
        <div className="col-span-6 md:col-span-3 ">
          <div className="flex items-center gap-4 h-20 rounded">
            <img
              className="h-full"
              src="img/rectangle-1267@2x.png"
              alt="World Ranking"
            />
            <div className=" text-black font-bold text-2xl">
              <h2 className="m-0">Fore Friends</h2>
              <p className="m-0 flex items-center gap-2">world Ranking <span>10</span></p>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="flex justify-end h-20  rounded">
            <img className="  h-full" src="/img/golf-player.png" alt="Golf Player" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 py-10">
        <img src="/img/short.png" alt="" className="h-40 w-40" />
        <h2 className="text-blue-900 font-bold text-4xl">Team Score Card</h2>
      </div>
      <ScoringTab/>
      {/* <ScoringTable/> */}
        </div>
       
       </div>
      
    </div>
  );
};

export default OngoingIndiviualScore;
