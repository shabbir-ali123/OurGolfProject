import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useScoreContext } from "../../contexts/scoreContext";
import { useParams } from "react-router-dom";

const LeaderBoard = (props: {
  title: string;
  className: string;
  dir?: string;
}) => {
  return (
    <td className={` p-2 leading-[20px]  ${props.className}`} dir={props.dir}>
      {props.title}
    </td>
  );
};

const LeaderBoardTables: FunctionComponent = () => {
  const params = useParams<{ id?: string }>();
  const { score } = useScoreContext()
  const { t } = useTranslation();

  const paramsFilter = score?.filter((id: any) => id.eventId == Number(params.id));
  const filteredScores = paramsFilter?.filter((scores:any, index:any, self:any) => {
    return self.findIndex((s: any) => s.userId === scores.userId) === index;
});

return (
    <div className=" mx-5 md:mx-[80px] ">
      <div className="px-3 overflow-x-auto">
      <div className="flex gap-4">
            <img
              className="w-[57px] h-[103px]"
              alt=""
              src="/img/rectangle-1248@2x.png"
            />
            <b className="relative left-[-24px] top-[35px] text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
              {'Leader Board'}
            </b>
          
          </div>
        <table className="w-full border-spacing-y-5 ">
          <thead className="text-left text-white ">
            <tr className=" bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px]">
              <LeaderBoard
                title={t("HOLE")}
                className="rounded-s-[3px] font-bold text-[24px] text-start ml-4"
              />

              {Array.from({ length: 9 }, (_, index) => (
                <LeaderBoard
                  key={index}
                  title={`${index + 1}`}
                  className="text-[18px] font-medium text-center "
                />
              ))}

              {Array.from({ length: 9 }, (_, index) => (
                <LeaderBoard
                  key={index}
                  title={`${index + 10}`}
                  className="text-[18px]  font-medium text-center"
                />
              ))}

              <LeaderBoard
                title={t("TOTAL")}
                className=" text-[18px] font-medium text-center"
              />
              <LeaderBoard
                title={'Net Value'}
                className=" text-[18px] font-medium text-center"
              />
              <LeaderBoard
                title={'HandiCap Value'}
                className="text-[18px] font-medium text-center"
              />
              
            </tr>
          </thead>
          {filteredScores?.map((scored: any, index: any) => {
            let arr = scored.scorePerShot;
            arr = JSON.parse(arr);
            return (
              <tbody>
                <tr className="bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  h-[69px] font-medium text-black">
                  <td className="whitespace-nowrap tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[13px]">
                    <div
                      className="w-[135px] text-[24px] h-[69px] flex items-center justify-center font-normal leading-5 text-white bg-black"
                      style={{
                        boxShadow: " 0px 0px 5px 0px #CF24EB",
                      }}
                    >
                      {t("PAR")}
                    </div>
                  </td>
                  {
                    arr?.map((scores:any) => (
                        <LeaderBoard
                          key={scores.hole}
                          title={`${scores}`}
                          className="text-[18px] font-medium text-center"
                        />
                    ))
                  }
               
                  <LeaderBoard
                    title={scored?.totalScore}
                    className="text-[18px] font-medium text-center "
                  />
                  <LeaderBoard
                    title={scored?.netValue}
                    className="text-[18px] font-medium text-center "
                  />
                  <LeaderBoard
                    title={scored?.handiCapValue}
                    className="text-[18px] font-medium text-center "
                  />
                  
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};
export default LeaderBoardTables;
