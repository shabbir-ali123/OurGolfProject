import { FunctionComponent } from "react";
import ChampionShipName from "../components/ChampionShipName";
import { Link } from "react-router-dom";
import FirstScore from "../components/FirstScore"
const OngoingTeamScore: FunctionComponent = () => {
  const rowData = [
    { teamName: "Fore Friends", score1: 26, score2: 15, score3: 22 ,teamImage: "/img/ellipse-23085@2x.png",rowBackgroundColor: "#B8E4FD",teamBackgroundColor: "#00BF9E" },
    { teamName: "Birdie Brigad", score1: 30, score2: 18, score3: 25 ,teamImage: "/img/ellipse-2311@2x.png",rowBackgroundColor: "#FFD98C",teamBackgroundColor: "#74B96A" },
    { teamName: "Hole-in-Won", score1: 30, score2: 18, score3: 25 ,teamImage: "/img/ellipse-23114@2x.png",rowBackgroundColor: "#CDD5FF",teamBackgroundColor: "#011F3B" },
    { teamName: "Tee-rific Titan", score1: 30, score2: 18, score3: 25 ,teamImage: "/img/ellipse-23086@2x.png",rowBackgroundColor: "#AFFFAF",teamBackgroundColor: "#1D3D86" },
    { teamName: "Eagle Express", score1: 30, score2: 18, score3: 25 ,teamImage: "/img/ellipse-23113@2x.png",rowBackgroundColor: "#FFC1C5",teamBackgroundColor: "#1E264E" },
    // Add more data objects for each row
  ];
  return (
    <div className="relative bg-white w-full h-[2107px] overflow-hidden text-left text-lg text-white font-poppins">
      <div className="absolute top-[2197px] left-[1248px] leading-[20px] font-medium">
        RESULT
      </div>
      <div className="absolute top-[2287px] left-[1248px] leading-[20px] font-medium">
        WINNER
      </div>
     <ChampionShipName/>
      <div className="absolute top-[calc(50%_-_681.5px)] left-[calc(50%_-_670px)] [background:linear-gradient(180deg,_#edfffd,_#f2fffa)] w-[1339px] h-[1606px] overflow-hidden text-13xl">
        <div className="absolute top-[72px] left-[12px] w-[1323.2px] h-[851px]">
          <div className="absolute top-[697px] left-[0px] w-[1303px] h-[154px] text-lg">
            <div className="absolute top-[0px] left-[0px] w-[1303px] h-[154px]">
              <div className="absolute top-[0px] left-[516px] w-[58px] h-[154px]">
                <div className="absolute top-[0px] left-[0px] w-[58px] h-[154px]">
                  <div className="absolute top-[0px] left-[0px] bg-white w-[58px] h-[154px]" />
                </div>
              </div>
              <div className="absolute top-[0px] left-[897px] w-[58px] h-[154px]">
                <div className="absolute top-[0px] left-[0px] bg-white w-[58px] h-[154px]" />
              </div>
              <div className="absolute top-[0px] left-[calc(50%_-_648.5px)] w-[1300px] h-[63px]">
                <div className="absolute top-[0px] left-[calc(50%_-_650px)] rounded-md bg-green shadow-[0px_4px_12px_#193a8b] w-[1300px] h-[63px]" />
                <b className="absolute top-[21px] left-[31px] text-5xl leading-[20px]">
                  Hole #
                </b>
                <div className="absolute top-[22px] left-[203px] leading-[20px]">
                  1
                </div>
                <div className="absolute top-[22px] left-[382px] leading-[20px] font-medium">
                  6
                </div>
                <div className="absolute top-[22px] left-[237px] leading-[20px] font-medium">
                  2
                </div>
                <div className="absolute top-[22px] left-[418px] leading-[20px] font-medium">
                  7
                </div>
                <div className="absolute top-[22px] left-[273px] leading-[20px] font-medium">{`3 `}</div>
                <div className="absolute top-[22px] left-[456px] leading-[20px] font-medium">
                  8
                </div>
                <div className="absolute top-[22px] left-[309px] leading-[20px] font-medium">
                  4
                </div>
                <div className="absolute top-[22px] left-[487px] leading-[20px] font-medium">
                  9
                </div>
                <div className="absolute top-[22px] left-[348px] leading-[20px] font-medium">
                  5
                </div>
                <div className="absolute top-[22px] left-[580px] leading-[20px] font-medium">
                  10
                </div>
                <div className="absolute top-[22px] left-[622px] leading-[20px] font-medium">
                  11
                </div>
                <div className="absolute top-[22px] left-[651px] leading-[20px] font-medium">
                  12
                </div>
                <div className="absolute top-[22px] left-[689px] leading-[20px] font-medium">
                  13
                </div>
                <div className="absolute top-[22px] left-[722px] leading-[20px] font-medium">
                  14
                </div>
                <div className="absolute top-[22px] left-[760px] leading-[20px] font-medium">
                  15
                </div>
                <div className="absolute top-[22px] left-[797px] leading-[20px] font-medium">
                  16
                </div>
                <div className="absolute top-[22px] left-[832px] leading-[20px] font-medium">
                  17
                </div>
                <div className="absolute top-[22px] left-[869px] leading-[20px] font-medium">
                  18
                </div>
                <div className="absolute top-[22px] left-[965px] leading-[20px] font-medium">
                  Total
                </div>
                <div className="absolute top-[22px] left-[1039px] leading-[20px] font-medium">
                  Rate
                </div>
                <div className="absolute top-[22px] left-[1102px] leading-[20px] font-medium">
                  Slope
                </div>
                <div className="absolute top-[22px] left-[1192px] leading-[20px] font-medium">
                  Result
                </div>
                <div className="absolute top-[1px] left-[514px] w-14 h-[62px] text-base">
                  <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                  <div className="absolute top-[21px] left-[14px] leading-[20px] font-medium">
                    Out
                  </div>
                </div>
                <div className="absolute top-[1px] left-[895px] w-14 h-[62px] text-base">
                  <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                  <div className="absolute top-[21px] left-[20px] leading-[20px] font-medium">
                    IN
                  </div>
                </div>
              </div>
              <div className="absolute top-[90px] left-[0px] w-[1302px] h-16">
                <div className="absolute top-[0px] left-[1px] rounded-8xs bg-lightseagreen-200 shadow-[0px_4px_15px_rgba(0,_0,_0,_0.25)] w-[1301px] h-16" />
                <div className="absolute top-[0px] left-[0px] w-[1267px] h-16">
                  <div className="absolute top-[22px] left-[151px] leading-[20px] font-semibold">
                    Par
                  </div>
                  <div className="absolute top-[22px] left-[1037px] leading-[20px] font-medium">
                    HDCP
                  </div>
                  <div className="absolute top-[22px] left-[980px] leading-[20px] font-medium">
                    76
                  </div>
                  <div className="absolute top-[22px] left-[1113px] leading-[20px] font-medium">
                    NET
                  </div>
                  <div className="absolute top-[22px] left-[1195px] leading-[20px] font-medium">
                    Position
                  </div>
                  <div className="absolute top-[22px] left-[203px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[385px] leading-[20px] font-medium">
                    3
                  </div>
                  <div className="absolute top-[22px] left-[240px] leading-[20px] font-medium">
                    3
                  </div>
                  <div className="absolute top-[22px] left-[421px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[275px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[459px] leading-[20px] font-medium">
                    4
                  </div>
                  <div className="absolute top-[22px] left-[312px] leading-[20px] font-medium">
                    4
                  </div>
                  <div className="absolute top-[22px] left-[490px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[351px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[586px] leading-[20px] font-medium">
                    4
                  </div>
                  <div className="absolute top-[22px] left-[626px] leading-[20px] font-medium">
                    3
                  </div>
                  <div className="absolute top-[22px] left-[657px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[695px] leading-[20px] font-medium">
                    4
                  </div>
                  <div className="absolute top-[22px] left-[729px] leading-[20px] font-medium">
                    3
                  </div>
                  <div className="absolute top-[22px] left-[766px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[803px] leading-[20px] font-medium">
                    4
                  </div>
                  <div className="absolute top-[22px] left-[838px] leading-[20px] font-medium">
                    5
                  </div>
                  <div className="absolute top-[22px] left-[875px] leading-[20px] font-medium">
                    4
                  </div>
                  <div className="absolute top-[1px] left-[517px] w-14 h-[62px]">
                    <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                    <div className="absolute top-[21px] left-[17px] leading-[20px] font-medium">
                      39
                    </div>
                  </div>
                  <div className="absolute top-[1px] left-[898px] w-14 h-[62px]">
                    <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                    <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_10px)] leading-[20px] font-medium">
                      37
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[0px] w-[135px] h-16 text-5xl">
                    <div className="absolute top-[0px] left-[0px] bg-fuchsia-200 shadow-[0px_0px_5px_#cf24eb] w-[135px] h-16" />
                    <div className="absolute top-[22px] left-[27px] leading-[20px]">{`Teams `}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[461px] left-[0px] w-[387px] h-24 text-gray1-1800">
            <b className="absolute top-[38px] left-[104px] leading-[20px] [text-shadow:0px_7px_4px_rgba(0,_0,_0,_0.25)]">
              Team Score Card
            </b>
            <img
              className="absolute top-[0px] left-[0px] w-[90px] h-24 object-cover"
              alt=""
              src="/img/rectangle-1271@2x.png"
            />
          </div>
          <div className="absolute top-[599px] left-[0px] w-[1304px] h-[76px] text-5xl">
            <div className="absolute top-[0px] left-[0px] w-[1304px] h-[76px]">
              <div className="absolute top-[0px] left-[1064px] w-60 h-[72px]">
                <div className="absolute top-[0px] left-[0px] rounded-smi bg-deepskyblue-100 w-60 h-[72px]" />
                <div className="absolute top-[18px] left-[18px] w-[205px] h-9">
                  <div className="absolute top-[0px] left-[41px] font-medium">
                    Update Score
                  </div>
                  <img
                    className="absolute h-[94.44%] w-[16.59%] top-[2.78%] right-[83.9%] bottom-[2.78%] left-[-0.49%] max-w-full overflow-hidden max-h-full"
                    alt=""
                    src="/img/group1.svg"
                  />
                </div>
              </div>
              <div className="absolute top-[21px] left-[0px] w-[493px] h-[55px]">
                <div className="absolute top-[0px] left-[0px] w-[493px] h-[55px]">
                  <div className="absolute top-[0px] left-[0px] w-[239px] h-[55px]">
                    <div className="absolute top-[0px] left-[0px] rounded bg-fuchsia-200 w-[239px] h-[55px]" />
                    <div className="absolute top-[18px] left-[54px] leading-[20px]">
                    <Link className="no-underline text-white" to="/ongoing-team-score">
                      Team View
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[254px] w-[239px] h-[55px] text-darkslategray-100">
                    <div className="absolute top-[0px] left-[0px] rounded bg-whitesmoke-200 w-[239px] h-[55px]" />
                    <div className="absolute top-[18px] left-[24px] leading-[20px]">
                      <Link className="no-underline text-darkslategray-100" to="/ongoing-indiviual-score">
                      Individual Score
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[180px] left-[calc(50%_-_661.6px)] w-[1323.2px] h-44 text-gray1-2100">
            <div className="absolute top-[42px] left-[calc(50%_-_661.6px)] bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-[1302px] h-[134px]" />
            <img
              className="absolute top-[0px] left-[1010px] w-[313.2px] h-44 object-cover"
              alt=""
              src="/img/rectangle-1272@2x.png"
            />
            <div className="absolute top-[42px] left-[0px] w-[380px] h-[134px]">
              <div className="absolute top-[0px] left-[0px] w-[380px] h-[134px]">
                <div className="absolute top-[0px] left-[0px] w-[380px] h-[134px]">
                  <div className="absolute top-[0px] left-[0px] w-[380px] h-[134px]">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-md w-[139px] h-[134px] object-cover"
                      alt=""
                      src="/img/rectangle-1267@2x.png"
                    />
                    <div className="absolute top-[37px] left-[183px] w-[197px] h-[60px]">
                      <div className="absolute top-[0px] left-[0px] leading-[20px] font-semibold">
                        Fore Friends
                      </div>
                      <div className="absolute top-[40px] left-[0px] w-[184px] h-5 text-xl text-gray1-1000">
                        <div className="absolute top-[0px] left-[0px] leading-[20px]">
                          World Ranking
                        </div>
                        <div className="absolute top-[0px] left-[160px] text-5xl leading-[20px] font-medium text-seagreen-100">
                          10
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[0px] left-[0px] w-[482px] h-[199px] text-17xl text-darkslateblue-300">
            <div className="absolute top-[0px] left-[0px] w-[482px] h-[199px]">
              <div className="absolute top-[49px] left-[0px] rounded-[50%] [background:linear-gradient(180deg,_#8eff93,_rgba(171,_255,_132,_0.78))] w-[84px] h-[84px]" />
              <img
                className="absolute top-[0px] left-[6px] w-[57px] h-[103px] object-cover"
                alt=""
                src="/img/rectangle-1248@2x.png"
              />
              <img
                className="absolute top-[87px] left-[370px] rounded-[50%] w-28 h-28 object-cover"
                alt=""
                src="/img/ellipse-2301@2x.png"
              />
              <b className="absolute top-[103px] left-[51px] uppercase [text-shadow:0px_7px_4px_#ccf2fe]">
                LIVE Scoring Table
              </b>
            </div>
          </div>
        </div>
        <div className="absolute top-[945px] left-[15px] w-[1302px] h-[458px] text-lg">
        <div className="absolute top-[0px] left-[0px] w-[1302px] h-[458px]">
          {rowData.map((data, index) => (
            <div className="my-4"key={index}>
              <FirstScore data={data}    rowBackgroundColor={data.rowBackgroundColor} teamBackgroundColor={data.teamBackgroundColor}/>
            </div>
          ))}
        </div>
          <img
            className="absolute top-[0px] left-[189px] w-[974px] h-[458px]"
            alt=""
            src="/img/lines.png"
          />
        </div>
      </div>
    </div>
  );
};

export default OngoingTeamScore;
