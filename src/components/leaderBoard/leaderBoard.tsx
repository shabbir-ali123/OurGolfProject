import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScoreContext } from "../../contexts/scoreContext";
import { useParams } from "react-router-dom";
import { singleEventContextStore } from "../../contexts/eventContext";

const LeaderBoard = (props: {
  title: string;
  className: string;
  dir?: string;
}) => {
  return (
    <td className={`p-2 leading-[20px] ${props.className}`} dir={props.dir}>
      {props.title}
    </td>
  );
};

const LeaderBoardTables: FunctionComponent = () => {
  const { singleEvent } = singleEventContextStore();
  const [showRegularScores, setShowRegularScores] = useState(true);
  const params = useParams<{ id?: string }>();
  const { score } = useScoreContext();
  const { t } = useTranslation();
  
  const paramsFilter = score?.filter(
    (id: any) => id.eventId == Number(params.id)
  );
  const filteredScores = paramsFilter?.filter(
    (scores: any, index: any, self: any) => {
      return self.findIndex((s: any) => s.userId === scores.userId) === index;
    }
  );

  let shotsPerHoles = singleEvent?.shotsPerHoles?.split(",").map(Number);
  let sum = shotsPerHoles?.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue,
    0
  );

  return (
    <div className="py-4 rounded-lg my-10">
      <div className="px-3 overflow-x-auto">
        <div className="hidden xl:flex gap-4">
          <img
            className="w-[57px] h-[103px]"
            alt=""
            src="/img/leaderboard.png"
          />
          <b className="relative left-[-24px] top-[35px] z-[-1] text-6xl xl:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
            {t("LEADER_BOARD")}
          </b>
        </div>
        <div className="flex xl:justify-end justify-center gap-4 mb-4">
          <button
            onClick={() => setShowRegularScores(true)}
            className={`xl:px-4 xl:py-2 ${showRegularScores
              ? "bg-[#17b3a6] rounded-sm xl:p-4 cursor-pointer  border-none xl:py-4 xl:px-20 text-white text-lg"
              : "bg-transparent border-solid border-[#17b3a6] border-2  rounded-sm p-4 cursor-pointer  py-4 px-20 text-[#17b3a6] text-lg font-bold"
              }`}

          >
            {t("REGULAR")}
          </button>
          <button
            onClick={() => setShowRegularScores(false)}
            className={`px-4 py-2 ${!showRegularScores
              ? "bg-[#17b3a6] rounded-sm p-4 cursor-pointer  border-none py-4 px-20 text-white text-lg"
              : "bg-transparent border-solid border-[#17b3a6] border-2  rounded-sm p-4 cursor-pointer  py-4 px-20 text-[#17b3a6] text-lg font-bold"
              }`}

          >
            {t("HANDICAP_SCORE")}
          </button>
        </div>
        {showRegularScores && (
          <div className="hidden md:block">
            <table className="w-full border-spacing-y-[1px] ">
              <thead className="text-left text-white">
                <tr className="bg-[#17B3A6] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px]">
                  <LeaderBoard
                    title={t("HOLE")}
                    className="rounded-s-[3px] font-bold text-[24px] text-start ml-4 border-[1px] border-solid border-white"
                  />
                  {Array.from({ length: 9 }, (_, index) => (
                    <LeaderBoard
                      key={index}
                      title={`${index + 1}`}
                      className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                    />
                  ))}
                  {Array.from({ length: 9 }, (_, index) => (
                    <LeaderBoard
                      key={index}
                      title={`${index + 10}`}
                      className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                    />
                  ))}
                  <LeaderBoard
                    title={t("TOTAL")}
                    className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                  />
                  <LeaderBoard
                    title={"Net Value"}
                    className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                  />
                </tr>
                <tr className="bg-[#17B3A6] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px]">
                  <LeaderBoard
                    title={t("PAR")}
                    className="rounded-s-[3px] font-bold text-[24px] text-start ml-4 border-[1px] border-solid border-white"
                  />
                  {shotsPerHoles?.map((shot: any) => (
                    <td className="p-2 leading-[20px] text-center border-[1px] border-solid border-white">{shot}</td>
                  ))}
                  <td className="p-2 leading-[20px] text-center border-[1px] border-solid border-white">{sum}</td>
                  <td className="p-2 leading-[20px] text-center border-[1px] border-solid border-white">0</td>
                </tr>
              </thead>
              {filteredScores?.map((scored: any, index: any) => {
                let arr = scored.scorePerShot;
                arr = JSON.parse(arr);
                return (
                  <tbody key={index}>
                    <tr className="bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[69px] font-medium text-black">
                      <td className="whitespace-nowrap tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[13px]">
                        <div
                          className="w-[135px] text-[24px] h-[69px] px-4 flex items-center font-normal leading-5 text-black bg-[#E8F7F6] overflow-hidden"
                         
                        >
                          <img
                            className="h-11 w-11 rounded-full mr-2"
                            src={scored?.userScoreCard?.imageUrl}
                            alt="user"
                          />
                          <p className="text-[14px]">
                            {scored.userScoreCard?.nickName}
                          </p>
                        </div>
                      </td>
                      {arr?.map((scores: any) => (
                        <LeaderBoard
                          key={scores?.hole}
                          title={`${scores}`}
                          className="text-[18px] font-medium text-center"
                        />
                      ))}
                      <LeaderBoard
                        title={scored?.totalScore}
                        className="text-[18px] font-medium text-center"
                      />
                      <LeaderBoard
                        title={scored?.netValue}
                        className="text-[18px] font-medium text-center"
                      />
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        )}
        {!showRegularScores && (
          <div className="hidden md:block">
            <table className="w-full border-spacing-y-[1px]">
              <thead className="text-left text-white">
                <tr className="bg-[#17B3A6] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px]">
                  <LeaderBoard
                    title={t("HOLE")}
                    className="rounded-s-[3px] font-bold text-[24px] text-start ml-4 border-[1px] border-solid border-white"
                  />
                  {Array.from({ length: 9 }, (_, index) => (
                    <LeaderBoard
                      key={index}
                      title={`${index + 1}`}
                      className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                    />
                  ))}
                  {Array.from({ length: 9 }, (_, index) => (
                    <LeaderBoard
                      key={index}
                      title={`${index + 10}`}
                      className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                    />
                  ))}
                  <LeaderBoard
                    title={t("TOTAL")}
                    className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                  />
                  <LeaderBoard
                    title={"Net Value"}
                    className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                  />
                  <LeaderBoard
                    title={"HandiCap Value"}
                    className="text-[18px] font-medium text-center border-[1px] border-solid border-white"
                  />
                </tr>
                <tr className="bg-[#17B3A6] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px]">
                  <LeaderBoard
                    title={t("PAR")}
                    className="rounded-s-[3px] font-bold text-[24px] text-start ml-4 border-[1px] border-solid border-white"
                  />
                  {shotsPerHoles?.map((shot: any) => (
                    <td className="p-2 leading-[20px] text-center  border-[1px] border-solid border-white">{shot}</td>
                  ))}
                  <td className="p-2 leading-[20px] text-center  border-[1px] border-solid border-white">{sum}</td>
                  <td className="p-2 leading-[20px] text-center border-[1px]  border-solid border-white">0</td>
                  <td className="p-2 leading-[20px] text-center  border-[1px] border-solid border-white">0</td>
                </tr>
              </thead>
              {filteredScores?.map((scored: any, index: any) => {
                let arr = scored.scorePerShot;
                arr = JSON.parse(arr);
                return (
                  <tbody key={index}>
                    <tr className="bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[69px] font-medium text-black">
                      <td className="whitespace-nowrap tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[13px]">
                        <div
                          className="w-[135px] text-[24px] h-[69px] px-4 flex items-center font-normal leading-5 text-white bg-black overflow-hidden"
                          style={{
                            boxShadow: "0px 0px 5px 0px #CF24EB",
                          }}
                        >
                          <img
                            className="h-11 w-11 rounded-full mr-2"
                            src={scored?.userScoreCard?.imageUrl}
                            alt="user"
                          />
                          <p className="text-[10px]">
                            {scored.userScoreCard?.nickName}
                          </p>
                        </div>
                      </td>
                      {arr?.map((scores: any) => (
                        <LeaderBoard
                          key={scores.hole}
                          title={`${scores}`}
                          className="text-[18px] font-medium text-center  border-solid border-white"
                        />
                      ))}
                      <LeaderBoard
                        title={scored?.totalScore}
                        className="text-[18px] font-medium text-center"
                      />
                      <LeaderBoard
                        title={scored?.netValue}
                        className="text-[18px] font-medium text-center"
                      />
                      <LeaderBoard
                        title={scored?.handiCapValue}
                        className="text-[18px] font-medium text-center"
                      />
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        )}
        {/* Mobile View */}
        {showRegularScores && (
          <div className="block mx-4 md:hidden">
            <div className="flex justify-between items-center bg-[#17B3A6] p-2 text-white rounded-t-md">
              <div className="text-[10px]"><p>{t("PLAYER_NO")}</p></div>
              <div className="text-[10px]"><p>{t("PLAYER_NAME")}</p></div>
              <div className="text-[10px]"><p>{t("TOTAL_SCORE")}</p></div>
              <div className="text-[10px]"><p>{t("PAR_SCORE")}</p></div>
              <div className="text-[10px]"><p>{t("TOTAL_PAR")}</p></div>
            </div>
            {filteredScores?.map((scored: any, index: any) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-2 mb-2 shadow-md"
              >
                <div className="flex items-center">
                  <p className="text-[14px] text-center text-[#17B3A6] font-bold">{index + 1}</p>
                </div>
                <div className="text-center text-[16px] font-medium flex "><p>{scored?.userScoreCard?.nickName}</p></div>
                <div className="text-center text-[14px] flex "><p>{scored.totalScore}</p></div>
                <div className="text-center text-[14px] flex "><p >{sum}</p></div>
                <div className="text-center text-white font-medium text-[14px] flex justify-center items-center bg-[#17B3A6] p-1 rounded-md h-6 w-6"><p>{scored?.totalScore}</p></div>
              </div>
            ))}
          </div>
        )}
        {!showRegularScores && (
          <div className="block md:hidden">
            <div className="flex justify-between items-center bg-[#17B3A6] p-2 text-white rounded-t-md">
              <div className="text-[10px]"><p>{t("PLAYER_NO")}</p></div>
              <div className="text-[10px]"><p>{t("PLAYER_NAME")}</p></div>
              <div className="text-[10px]"><p>{t("TOTAL_SCORE")}</p></div>
              <div className="text-[10px]"><p>{t("PAR_SCORE")}</p></div>
              <div className="text-[10px]"><p>{t("TOTAL_PAR")}</p></div>
              <div className="text-[10px]"><p>{t("HandiCap Value")}</p></div>
            </div>
            {filteredScores?.map((scored: any, index: any) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-2 mb-2 shadow-md"
              >
                <div className="flex items-center">
                  <p className="text-[14px] text-center text-[#17B3A6] font-bold">{index + 1}</p>
                </div>
                <div className="text-end text-[14px] flex "><p>{scored?.userScoreCard?.nickName}</p></div>
                <div className="text-end text-[14px] flex "><p>{scored?.totalScore}</p></div>
                <div className="text-end text-[14px] flex "><p >{sum}</p></div>
                <div className="text-end text-[14px] flex "><p className="mr-[40px]">{scored?.totalScore}</p></div>
                <div className="text-end text-[14px] flex "><p>{scored?.handiCapValue}</p></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoardTables;
