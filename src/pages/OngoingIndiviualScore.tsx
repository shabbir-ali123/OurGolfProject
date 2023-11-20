import { FunctionComponent } from "react";
import LiveScoringHole from "../components/LiveScoringHole";
import SectionCardFormFilter from "../components/SectionCardFormFilter";
import IndividualPlayerScore from "../components/IndividualPlayerScore";
import FriendSection from "../components/SingleTeamName";
import { Link } from "react-router-dom";
import ChampionShipName from "../components/ChampionShipName";

const OngoingIndiviualScore: FunctionComponent = () => {
  return (
    <div className="relative bg-white w-full h-[1901px] overflow-hidden text-left text-lg text-white font-poppins">
     <ChampionShipName/>
      <div className="absolute top-[calc(50%_-_625.5px)] left-[calc(50%_-_669px)] w-[1339px] h-[1493px] text-13xl text-gray1-1800">
        <div className="absolute top-[calc(50%_-_746.5px)] left-[calc(50%_-_669.5px)] w-[1339px] h-[1493px]">
          <div className="absolute top-[calc(50%_-_746.5px)] left-[calc(50%_-_669.5px)] w-[1339px] h-[1493px]">
            <div className="absolute top-[calc(50%_-_746.5px)] left-[calc(50%_-_669.5px)] [background:linear-gradient(180deg,_#edfffd,_#f2fffa)] w-[1339px] h-[1493px] overflow-hidden" />
          </div>
          <div className="absolute top-[290px] left-[16px] w-[1302px] h-[960px]">
            <b className="absolute top-[44px] left-[104px] leading-[20px] [text-shadow:0px_7px_4px_rgba(0,_0,_0,_0.25)]">
              Individual Score Card
            </b>
            <img
              className="absolute top-[0px] left-[0px] w-[90px] h-24 object-cover"
              alt=""
              src="/img/rectangle-1271@2x.png"
            />
            <div className="absolute top-[159px] left-[0px] w-[1302px] h-[801px] text-lg text-white">
              <div className="absolute top-[0px] left-[0px] w-[1302px] h-[801px] text-5xl text-darkslategray-100">
                <div className="absolute top-[0px] left-[0px] w-[493px] h-[55px]">
                  <div className="absolute top-[0px] left-[0px] w-[239px] h-[55px]">
                    <div className="absolute top-[0px] left-[0px] rounded bg-whitesmoke-200 w-[239px] h-[55px]" />
                    <div className="absolute top-[18px] left-[54px] leading-[20px]">
                      <Link className="no-underline text-darkslategray-100" to="/ongoing-team-score">
                      Team View
                      </Link>
                      
                    </div>
                  </div>
                  <div className="absolute top-[0px] left-[254px] w-[239px] h-[55px] text-white">
                    <div className="absolute top-[0px] left-[0px] rounded bg-fuchsia-200 w-[239px] h-[55px]" />
                    <div className="absolute top-[18px] left-[24px] leading-[20px]">
                      Individual Score
                    </div>
                  </div>
                </div>
                <div className="absolute top-[86px] left-[0px] w-[1302px] h-[715px] text-lg text-dimgray-100">
                  <div className="absolute top-[179px] left-[0px] w-[1302px] h-[72px]">
                    <div className="absolute top-[0px] left-[0px] rounded bg-lightblue shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] w-[1302px] h-[72px]" />
                    <div className="absolute top-[0px] left-[0px] rounded bg-lightblue shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] w-[1302px] h-[72px]" />
                    <div className="absolute top-[7px] left-[5px] w-[1269px] h-[58px]">
                      <div className="absolute top-[16px] left-[192px] w-[90px] h-[26.9px] text-white">
                        <div className="absolute top-[3px] left-[78px] text-xl leading-[20px] font-semibold text-darkslategray-700">{`3 `}</div>
                        <div className="absolute top-[1px] left-[0px] w-[25px] h-[24.1px]">
                          <div className="absolute top-[0px] left-[0px] rounded-sm bg-seagreen-100 w-[25px] h-[24.1px]" />
                          <div className="absolute top-[calc(50%_-_10.05px)] left-[calc(50%_-_5.5px)] leading-[20px]">
                            6
                          </div>
                        </div>
                        <div className="absolute top-[0px] left-[34px] w-[27.9px] h-[26.9px]">
                          <div className="absolute top-[0px] left-[0px] rounded-smi bg-blueviolet w-[27.9px] h-[26.9px]" />
                          <div className="absolute top-[3px] left-[8px] leading-[20px]">
                            3
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-[8px] left-[1182px] w-[87px] h-[41px] text-base text-black">
                        <div className="absolute top-[0px] left-[0px] rounded-md box-border w-[87px] h-[41px] border-[1px] border-solid border-dimgray-100" />
                        <div className="absolute top-[10px] left-[39px] leading-[20px]">
                          -
                        </div>
                      </div>
                      <div className="absolute top-[19px] left-[306px] w-[191px] h-5">
                        <div className="absolute top-[0px] left-[0px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[37px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[71px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[108px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[144px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[181px] leading-[20px]">
                          -
                        </div>
                      </div>
                      <div className="absolute top-[19px] left-[579px] w-[191px] h-5">
                        <div className="absolute top-[0px] left-[0px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[37px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[71px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[108px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[144px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[181px] leading-[20px]">
                          -
                        </div>
                      </div>
                      <div className="absolute top-[19px] left-[794px] w-[81px] h-5">
                        <div className="absolute top-[0px] left-[0px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[37px] leading-[20px]">
                          -
                        </div>
                        <div className="absolute top-[0px] left-[71px] leading-[20px]">
                          -
                        </div>
                      </div>
                      <div className="absolute top-[0px] left-[0px] w-[167px] h-[58px] text-base text-white">
                        <div className="absolute top-[0px] left-[0px] w-[145px] h-[58px]">
                          <div className="absolute top-[0px] left-[0px] rounded-10xs bg-mediumaquamarine w-[145px] h-[58px]" />
                          <div className="absolute top-[19px] left-[15px] tracking-[2.83px] leading-[18px]">{`Rory `}</div>
                        </div>
                        <img
                          className="absolute top-[0px] left-[109px] rounded-[50%] w-[58px] h-[58px] object-cover"
                          alt=""
                          src="/img/ellipse-2308@2x.png"
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div className="absolute top-[0px] left-[0px] w-[1302px] h-[635px] text-base text-white">
                    <div className="absolute top-[0px] left-[0px] w-[1302px] h-[635px]">
                      <LiveScoringHole />
                      <div className="absolute top-[0px] left-[515px] w-[58px] h-[154px]">
                        <div className="absolute top-[0px] left-[0px] w-[58px] h-[154px]">
                          <div className="absolute top-[0px] left-[0px] bg-white w-[58px] h-[154px]" />
                        </div>
                        <div className="absolute top-[1px] left-[1px] w-14 h-[62px]">
                          <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                          <div className="absolute top-[21px] left-[14px] leading-[20px] font-medium">
                            Out
                          </div>
                        </div>
                        <div className="absolute top-[91px] left-[1px] w-14 h-[62px] text-lg">
                          <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                          <div className="absolute top-[21px] left-[17px] leading-[20px] font-medium">
                            39
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-[0px] left-[0px] w-[1302px] h-[635px] text-lg">
                        <div className="absolute top-[0px] left-[896px] w-[58px] h-[154px]">
                          <div className="absolute top-[0px] left-[0px] bg-white w-[58px] h-[154px]" />
                        </div>
                        <div className="absolute top-[1px] left-[897px] w-14 h-[62px] text-base">
                          <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                          <div className="absolute top-[21px] left-[20px] leading-[20px] font-medium">
                            IN
                          </div>
                        </div>
                        <div className="absolute top-[91px] left-[897px] w-14 h-[62px]">
                          <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
                          <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_10px)] leading-[20px] font-medium">
                            37
                          </div>
                        </div>
                        <div className="absolute top-[180px] left-[897px] w-14 h-[71px]">
                          <div className="absolute top-[0px] left-[0px] bg-gray1-1300 box-border w-14 h-[71px] border-[1px] border-solid border-white" />
                          <div className="absolute top-[calc(50%_-_9.5px)] left-[calc(50%_-_9px)] leading-[20px] font-medium">
                            10
                          </div>
                          <div className="absolute top-[calc(50%_-_9.5px)] left-[calc(50%_-_9px)] leading-[20px] font-medium">
                            10
                          </div>
                        </div>
                        <div className="absolute top-[180px] left-[516px] w-14 h-[71px]">
                          <div className="absolute top-[0px] left-[0px] bg-gray1-1300 box-border w-14 h-[71px] border-[1px] border-solid border-white" />
                          <div className="absolute top-[0px] left-[0px] bg-gray1-1300 box-border w-14 h-[71px] border-[1px] border-solid border-white" />
                          <div className="absolute top-[calc(50%_-_9.5px)] left-[calc(50%_-_5px)] leading-[20px] font-medium">
                            7
                          </div>
                          <div className="absolute top-[calc(50%_-_9.5px)] left-[calc(50%_-_5px)] leading-[20px] font-medium">
                            7
                          </div>
                        </div>
                        <SectionCardFormFilter
                          personName="Shawn"
                          imageDimensions="/img/ellipse-2308@2x.png"
                        />
                        <IndividualPlayerScore
                          personName="Cameron"
                          profileImageId="/img/ellipse-23081@2x.png"
                          rating="10"
                        />
                        <IndividualPlayerScore
                          personName="Leslie"
                          profileImageId="/img/ellipse-23082@2x.png"
                          rating="9"
                          propTop="371px"
                          propBackgroundColor="#ffd98c"
                          propBackgroundColor1="#8b5c56"
                          propTop1="calc(50% - 10px)"
                          propLeft="calc(50% - 5px)"
                          propWidth="11px"
                          propHeight="20.3px"
                        />
                        <SectionCardFormFilter
                          personName="Soham"
                          imageDimensions="/img/ellipse-23083@2x.png"
                          propTop="467px"
                          propBackgroundColor="#b8e4fd"
                          propBackgroundColor1="#c00002"
                        />
                        <IndividualPlayerScore
                          personName="Eduardo"
                          profileImageId="/img/ellipse-23084@2x.png"
                          rating="6"
                          propTop="563px"
                          propBackgroundColor="#cdd5ff"
                          propBackgroundColor1="#2e53ff"
                          propTop1="calc(50% - 10px)"
                          propLeft="calc(50% - 5px)"
                          propWidth="11px"
                          propHeight="20.3px"
                        />
                      </div>
                    </div>
                    <div className="absolute top-[92px] left-[5px] w-[134px] h-[60px] text-lg">
                      <div className="absolute top-[0px] left-[0px] rounded bg-deepskyblue-100 w-[134px] h-[60px]" />
                      <div className="absolute top-[20px] left-[5px] leading-[20px] font-medium">
                        Players Name
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[107px] left-[1199px] leading-[20px] font-medium">
                RESULT
              </div>
              <div className="absolute top-[198px] left-[1196px] leading-[20px] font-medium">
               POSITION
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[2197px] left-[1248px] leading-[20px] font-medium">
        RESULT
      </div>
      <div className="absolute top-[2287px] left-[1248px] leading-[20px] font-medium">
       POSITION
      </div>
      <FriendSection />
    </div>
  );
};

export default OngoingIndiviualScore;
