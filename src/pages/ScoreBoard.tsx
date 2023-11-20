import { FunctionComponent } from "react";
import ChampionShipName from "../components/ChampionShipName";
import Slider from "../components/Slider";
import LeaderBoardSection from "../components/LeaderBoardSection";

import LeaderBoardHeader from "../components/LeaderBoardHeader";
import LeaderBoardFirstRow from "../components/LeaderBoardRow";

import LeaderBoardScoringTab from "../components/LeaderBoardScoringTable";
import IndiviualPlayerScore from "../components/IndiviualPlayerScore";


const ScoreBoard: FunctionComponent = () => {
  const teamData = [
    { pos:1, teamName: "Fore Friends", score1: 26, score2: 15, score3: 22 ,totalPar:728,teamImage: "/img/ellipse-23085@2x.png",rowBackgroundColor: "#B8E4FD",teamBackgroundColor: "#00BF9E" },
    { pos:2, teamName: "Birdie Brigad", score1: 30, score2: 18, score3: 25 , totalPar:708, teamImage: "/img/ellipse-2311@2x.png",rowBackgroundColor: "#E2FFFD",teamBackgroundColor: "#74B96A" },
    { pos:3, teamName: "Hole-in-Won", score1: 30, score2: 18, score3: 25 ,totalPar:738,teamImage: "/img/ellipse-23114@2x.png",rowBackgroundColor: "#EDF0FF",teamBackgroundColor: "#011F3B" },
    { pos:4, teamName: "Tee-rific Titan", score1: 30, score2: 18, score3: 25 , totalPar:718, teamImage: "/img/ellipse-23086@2x.png",rowBackgroundColor: "#FEF0F0",teamBackgroundColor: "#1D3D86" },
    { pos:5, teamName: "Eagle Express", score1: 30, score2: 18, score3: 25 , totalPar:708, teamImage: "/img/ellipse-23113@2x.png",rowBackgroundColor: "#FCF5DE",teamBackgroundColor: "#1E264E" },
  ];
  return (
    <div className="relative bg-white w-full   text-left text-[1.97px] text-darkslategray-200 font-poppins">
      <ChampionShipName />
      <Slider />
      <div className="absolute top-[848px] left-[calc(50%_-_675px)] w-[1350px] h-[1095px]">
     
        <LeaderBoardSection />
        <div className="absolute top-[1036px] left-[590px] w-[171px] h-[59px] text-lg text-black">
          <div className="absolute  top-[0px] left-[0px] rounded-[40px] bg-white shadow-[4px_4px_16px_#268d61] w-[171px] h-[59px]" />
          <div className="absolute top-[20px] left-[39px] leading-[20px] font-medium" style={{ cursor: 'pointer' }}>{`Load More `}</div>
        </div>
      
        <div className="absolute top-[272px] left-[64px] w-[1211px] h-[697px]">
         
          <LeaderBoardHeader />
         <div className="mt-20">
         {teamData.map((data, index) => (
             <div key={index} >
          <LeaderBoardFirstRow data={data} rowBackgroundColor={data.rowBackgroundColor} teamBackgroundColor={data.teamBackgroundColor} />
          </div>
          ))}
         </div>
         
        </div>
      </div>
      <div className="absolute top-[2976px] left-[105px] w-[1350px] h-[1470px] text-17xl text-darkslateblue-300">
        <div className="absolute top-[785px] left-[120px] w-[1350px] h-[685px]">
          <div className="absolute top-[0px] left-[0px] w-[596px] h-[103px]">
            <div className="absolute top-[0px] left-[0px] w-[596px] h-[103px]">
              <div className="absolute top-[2px] left-[0px] w-[545px] h-[71px]">
                <img
                  className="absolute top-[0px] left-[0px] rounded-[50%] w-[71px] h-[71px] object-cover"
                  alt=""
                  src="/img/ellipse-2300@2x.png"
                />
                <b className="absolute top-[36px] left-[48px]  leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                  Near Pin Contest (Hole 9)
                </b>
              </div>
              <img
                className="absolute top-[0px] left-[539px] w-[57px] h-[103px] object-cover"
                alt=""
                src="/img/rectangle-1248@2x.png"
              />
            </div>
          </div>
          <div className="absolute top-[201px] left-[0px] w-[1350px] h-[484px] text-lg text-gray1-300">
            <div className="absolute top-[74px] left-[0px] w-[1350px] h-[410px]">
              <div className="absolute top-[341px] left-[0px] w-[1350px] h-[69px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightsteelblue shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]" />
              </div>
              <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-pink-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]" />
              </div>
              <div className="absolute top-[85px] left-[0px] w-[1350px] h-[70px]">
                <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[70px]">
                  <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightblue shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[70px]" />
                </div>
              </div>
              <div className="absolute top-[170px] left-[0px] w-[1350px] h-[70px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightgreen-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[70px]" />
              </div>
              <div className="absolute top-[256px] left-[0px] w-[1350px] h-[69px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-khaki-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]" />
              </div>
            </div>
            <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightseagreen-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[55px]" />
            <div className="absolute top-[22px] left-[1157px] w-[51px] h-[431.6px]">
              <div className="absolute top-[0px] left-[0px] w-[51px] h-[431.6px]">
                <div className="absolute top-[0px] left-[0px] w-[51px] h-[431.6px]">
                  <div className="absolute top-[0px] left-[0px] w-[51px] h-[431.6px]">
                    <div className="absolute top-[420.6px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[79.8px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[165px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[250.2px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[335.4px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[0px] left-[0px] text-xl leading-[10.25px] font-medium text-white">{`Total `}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[22px] left-[1246px] w-[74px] h-[431.6px]">
              <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                  <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                    <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                      <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                        <div className="absolute top-[420.6px] left-[24px] leading-[10.25px]">
                          2nd
                        </div>
                        <div className="absolute top-[79.8px] left-[30px] leading-[10.25px]">
                          1st
                        </div>
                        <div className="absolute top-[165px] left-[26px] leading-[10.25px]">
                          3rd
                        </div>
                        <div className="absolute top-[250.2px] left-[24px] leading-[10.25px]">{`2nd `}</div>
                        <div className="absolute top-[336.4px] left-[30px] leading-[10.25px]">
                          1st
                        </div>
                        <div className="absolute top-[0px] left-[0px] text-xl leading-[10.25px] font-medium text-white">
                          Postion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[22px] left-[33px] w-[125px] h-[431.6px] text-xl text-gray1-500">
              <div className="absolute top-[0px] left-[0px] w-[125px] h-[431.6px]">
                <div className="absolute top-[420.6px] left-[0px] leading-[10.25px] font-medium">
                  Team 5
                </div>
                <div className="absolute top-[75.8px] left-[0px] leading-[10.25px] font-medium">
                  Team 1
                </div>
                <div className="absolute top-[161px] left-[0px] leading-[10.25px] font-medium">
                  Team 2
                </div>
                <div className="absolute top-[247.2px] left-[0px] leading-[10.25px] font-medium">
                  Team 3
                </div>
                <div className="absolute top-[331.5px] left-[0px] leading-[10.25px] font-medium">
                  Team 4
                </div>
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium text-white">
                  Team Name
                </div>
              </div>
            </div>
            <div className="absolute top-[22px] left-[196px] w-[923px] h-[444.7px] text-xl text-white">
              <div className="absolute top-[0px] left-[0px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[3px] leading-[10.25px] font-medium">
                  Player 1
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-136@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Courtney
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-137@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Debra
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-138@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Kristin
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-139@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Angel
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1310@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Arthur
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[192px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 2
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-136@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Dianne
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1311@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Darlene
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-139@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Esther
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1312@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Arlene
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1313@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Shawn
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[384px] w-[155px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 3
                </div>
                <div className="absolute top-[69px] left-[0px] w-[155px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1314@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Marjorie
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1315@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Victoria
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1316@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Cameron
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1317@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Kyle
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-138@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Greg
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[577px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 4
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1318@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Shane
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1319@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Mitchell
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1320@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Leslie
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1321@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Max
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1322@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Aubrey
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[769px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 5
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-137@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Soham
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1310@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Arlene
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1323@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Ronald
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1324@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Darrell
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1325@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Annaaa
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[128px] left-[0px] text-13xl font-semibold text-seagreen-100 [text-shadow:0px_6px_4px_rgba(0,_0,_0,_0.25)]">
            Team Performance
          </div>
        </div>
        <div className="absolute top-[0px] left-[120px] w-[1350px] h-[685px]">
          <div className="absolute top-[0px] left-[0px] w-[526px] h-[103px]">
            <div className="absolute top-[0px] left-[0px] w-[526px] h-[103px]">
              <div className="absolute top-[2px] left-[0px] w-[486px] h-[73px]">
                <img
                  className="absolute top-[0px] left-[0px] rounded-[50%] w-[71px] h-[71px] object-cover"
                  alt=""
                  src="/img/ellipse-2300@2x.png"
                />
                <b className="absolute top-[19px] left-[48px]  [text-shadow:0px_7px_4px_#b8e4fd]">
                  Drive Context (Hole 4)
                </b>
              </div>
              <img
                className="absolute top-[0px] left-[469px] w-[57px] h-[103px] object-cover"
                alt=""
                src="/img/rectangle-1248@2x.png"
              />
            </div>
          </div>
          <div className="absolute top-[201px] left-[0px] w-[1350px] h-[484px] text-lg text-gray1-300">
            <div className="absolute top-[74px] left-[0px] w-[1350px] h-[410px]">
              <div className="absolute top-[341px] left-[0px] w-[1350px] h-[69px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightsteelblue shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]" />
              </div>
              <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-pink-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]" />
              </div>
              <div className="absolute top-[85px] left-[0px] w-[1350px] h-[70px]">
                <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[70px]">
                  <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightblue shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[70px]" />
                </div>
              </div>
              <div className="absolute top-[170px] left-[0px] w-[1350px] h-[70px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightgreen-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[70px]" />
              </div>
              <div className="absolute top-[256px] left-[0px] w-[1350px] h-[69px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-khaki-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[69px]" />
              </div>
            </div>
            <div className="absolute top-[0px] left-[0px] rounded-10xs bg-lightseagreen-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[55px]" />
            <div className="absolute top-[22px] left-[1157px] w-[51px] h-[431.6px]">
              <div className="absolute top-[0px] left-[0px] w-[51px] h-[431.6px]">
                <div className="absolute top-[0px] left-[0px] w-[51px] h-[431.6px]">
                  <div className="absolute top-[0px] left-[0px] w-[51px] h-[431.6px]">
                    <div className="absolute top-[420.6px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[79.8px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[165px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[250.2px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[335.4px] left-[21px] leading-[10.25px]">
                      17
                    </div>
                    <div className="absolute top-[0px] left-[0px] text-xl leading-[10.25px] font-medium text-white">{`Total `}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[22px] left-[1246px] w-[74px] h-[431.6px]">
              <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                  <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                    <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                      <div className="absolute top-[0px] left-[0px] w-[74px] h-[431.6px]">
                        <div className="absolute top-[420.6px] left-[24px] leading-[10.25px]">
                          2nd
                        </div>
                        <div className="absolute top-[79.8px] left-[30px] leading-[10.25px]">
                          1st
                        </div>
                        <div className="absolute top-[165px] left-[26px] leading-[10.25px]">
                          3rd
                        </div>
                        <div className="absolute top-[250.2px] left-[24px] leading-[10.25px]">{`2nd `}</div>
                        <div className="absolute top-[336.4px] left-[30px] leading-[10.25px]">
                          1st
                        </div>
                        <div className="absolute top-[0px] left-[0px] text-xl leading-[10.25px] font-medium text-white">
                          Postion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[22px] left-[33px] w-[125px] h-[431.6px] text-xl text-gray1-500">
              <div className="absolute top-[0px] left-[0px] w-[125px] h-[431.6px]">
                <div className="absolute top-[420.6px] left-[0px] leading-[10.25px] font-medium">
                  Team 5
                </div>
                <div className="absolute top-[75.8px] left-[0px] leading-[10.25px] font-medium">
                  Team 1
                </div>
                <div className="absolute top-[161px] left-[0px] leading-[10.25px] font-medium">
                  Team 2
                </div>
                <div className="absolute top-[247.2px] left-[0px] leading-[10.25px] font-medium">
                  Team 3
                </div>
                <div className="absolute top-[331.5px] left-[0px] leading-[10.25px] font-medium">
                  Team 4
                </div>
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium text-white">
                  Team Name
                </div>
              </div>
            </div>
            <div className="absolute top-[22px] left-[196px] w-[923px] h-[444.7px] text-xl text-white">
              <div className="absolute top-[0px] left-[0px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[3px] leading-[10.25px] font-medium">
                  Player 1
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-136@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Courtney
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-137@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Debra
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-138@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Kristin
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-139@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Angel
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1310@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Arthur
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[192px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 2
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-136@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Dianne
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1311@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Darlene
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-139@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Esther
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1312@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Arlene
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1313@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Shawn
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[384px] w-[155px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 3
                </div>
                <div className="absolute top-[69px] left-[0px] w-[155px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1314@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Marjorie
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1315@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Victoria
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1316@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Cameron
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1317@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Kyle
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[155px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-138@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[114px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Greg
                      </div>
                      <div className="absolute top-[0px] left-[96px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[577px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 4
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1318@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Shane
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1319@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Mitchell
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1320@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Leslie
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1321@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Max
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1322@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Aubrey
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[769px] w-[154px] h-[444.7px]">
                <div className="absolute top-[0px] left-[0px] leading-[10.25px] font-medium">
                  Player 5
                </div>
                <div className="absolute top-[69px] left-[0px] w-[154px] h-[375.7px] text-lg text-gray1-600">
                  <div className="absolute top-[255px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-137@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Soham
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-deeppink w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[86px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1310@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Arlene
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-seagreen-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[170px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1323@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Ronald
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[340px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1324@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Darrell
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-firebrick-100 w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[154px] h-[35.7px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-[50%] w-9 h-[35.7px] object-cover"
                      alt=""
                      src="/img/ellipse-1325@2x.png"
                    />
                    <div className="absolute top-[8px] left-[41px] w-[113px] h-[18px]">
                      <div className="absolute top-[4px] left-[0px] tracking-[1.45px] leading-[9.22px]">
                        Ann
                      </div>
                      <div className="absolute top-[0px] left-[95px] w-[18px] h-[18px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-blueviolet w-[18px] h-[18px]" />
                        <div className="absolute top-[4px] left-[4px] leading-[10.25px] inline-block w-2.5 h-[10.9px]">
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[128px] left-[0px] text-13xl font-semibold text-seagreen-100 [text-shadow:0px_6px_4px_rgba(0,_0,_0,_0.25)]">
            Team Performance
          </div>
        </div>
      </div>
      <LeaderBoardScoringTab />
      <IndiviualPlayerScore />
     
    </div>
  );
};

export default ScoreBoard;
