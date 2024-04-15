import { useRef, useState } from "react";
import ScoringTable from "./LiveScoringTable";
import ScoringTableRow from './ScoringTableRow';
import { useTranslation } from 'react-i18next';
type Tab = "team" | "individual";
const ScoringTableColumn = (props: {
  title: string;
  className: string;
  dir?: string;
}) => {
  return (
      <td
          className={` p-2 leading-[20px]  ${props.className}`}
          dir={props.dir}
      >
          {props.title}
      </td>
  );
};
const ScoringTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>("team");
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-2 ">
      <div className="">
        <div className="flex justify-end gap-2 mx-8 ">
          <div className="flex justify-end gap-2">
            <button
              className={` ${
                activeTab === "team"
                  ? "bg-[#17b3a6] rounded-md p-4 cursor-pointer animate-bounce border-none py-4 px-20 text-white text-lg" : "bg-[#EEEEEE] rounded-md p-4 cursor-pointer  border-none py-4 px-20 text-[#17b3a6]  text-lg font-bold"
              } px-4 py-2 border rounded-full`}
              onClick={() => handleTabClick("team")}
            >
              {t("REGULAR")}
            </button>
            <button
              className={`${
                activeTab === "individual"
                  ? "bg-[#17b3a6] rounded-md p-4 cursor-pointer animate-bounce border-none py-4  text-white text-lg" : "bg-[#EEEEEE] rounded-md p-4 cursor-pointer  border-none py-4  text-[#17b3a6]  text-lg font-bold"
              } px-4 py-2   rounded-full`}
              onClick={() => handleTabClick("individual")}
            >
             {t("HANDICAP_SCORE")}
            </button>
          </div>
        
        </div>

        {activeTab === "team" && (
          <div>
             <div className='mx-5 '>
            <div className='px-3 overflow-x-auto'>
                <table className='w-full border-spacing-y-5 '>
                    <thead className='text-left text-white '>
                        <tr className=' bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px]'>
                            <ScoringTableColumn
                                title={t('HOLE')}
                                className='rounded-s-[3px] font-bold text-[24px] text-center'
                            />

                            {Array.from({ length: 9 }, (_, index) => (
                                <ScoringTableColumn
                                    key={index}
                                    title={`${index + 1}`}
                                    className='text-[18px] font-medium text-center '
                                />
                            ))}

                            <ScoringTableColumn
                                title='Out'
                                className='bg-black  text-[18px] font-medium text-center'
                            />
                            {Array.from({ length: 9 }, (_, index) => (
                                <ScoringTableColumn
                                    key={index}
                                    title={`${index + 10}`}
                                    className='text-[18px]  font-medium text-center'
                                />
                            ))}
                            <ScoringTableColumn
                                title='In'
                                className='bg-black text-[18px] font-medium text-center min-w-[24px]'
                            />
                            <ScoringTableColumn
                                title={t('TOTAL')}
                                className=' text-[18px] font-medium text-center'
                            />
                            <ScoringTableColumn
                                title={t('RATE')}
                                className=' text-[18px] font-medium text-center'
                            />
                            <ScoringTableColumn
                                title={t('SLOPE')}
                                className='text-[18px] font-medium text-center'
                            />
                            <ScoringTableColumn
                                title={t('RESULT')}
                                className='text-[18px] font-medium min-w-[100px] text-center rounded-s-[3px]'
                                dir='rtl'
                            />
                        </tr>
                    </thead>

                    <tbody>
                        <tr className='bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  h-[69px] font-medium text-black'>
                            <td className='whitespace-nowrap tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[13px]'>
                                <div
                                    className='w-[135px] text-[24px] h-[69px] flex items-center justify-center font-normal leading-5 text-white bg-black'
                                    style={{
                                        boxShadow: ' 0px 0px 5px 0px #CF24EB',
                                    }}
                                >
                                    {t('TEAMS')}
                                </div>
                                <div className='pl-3 text-lg font-semibold first-line:leading-5'>
                                    Par
                                </div>
                            </td>
                            {Array.from({ length: 9 }, (_, index) => (
                                <ScoringTableColumn
                                    key={index}
                                    title={`${index}`}
                                    className='text-[18px] text-center font-medium '
                                />
                            ))}
                            <ScoringTableColumn
                                title='39'
                                className='bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  text-[18px] font-medium text-center text-black'
                            />
                            {Array.from({ length: 9 }, (_, index) => (
                                <ScoringTableColumn
                                    key={index}
                                    title={`${index}`}
                                    className='text-[18px] text-center font-medium '
                                />
                            ))}
                            <ScoringTableColumn
                                title='37'
                                className='bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  text-[18px] font-medium text-center text-black '
                            />
                            <ScoringTableColumn
                                title='76'
                                className='text-[18px] font-medium text-center '
                            />
                            <ScoringTableColumn
                                title='HDCP'
                                className='text-[18px] font-medium text-center '
                            />
                            <ScoringTableColumn
                                title='NET'
                                className='text-[18px] font-medium text-center '
                            />
                            <ScoringTableColumn
                                title={t('POSITION')}
                                className='text-[18px] font-medium text-center rounded-s-[3px] '
                                dir='rtl'
                            />
                        </tr>
                        <ScoringTableRow
                            teamImageUrl='/img/ellipse-23085@2x.png'
                            teamName='Fore Friends'
                            background='#A9A9A9'
                            teamBG='#A9A9A9'
                        />
                        <ScoringTableRow
                            teamImageUrl='/img/ellipse-23086@2x.png'
                            teamName=' Brigadbasd'
                            background='#FFD98C'
                            teamBG='#808080'
                        />
                        <ScoringTableRow
                            teamImageUrl='/img/ellipse-23114@2x.png'
                            teamName='Hole-Won'
                            background='#CDD5FF'
                            teamBG='#D3D3D3'
                        />
                        <ScoringTableRow
                            teamImageUrl='/img/ellipse-23088@2x.png'
                            teamName='Tee-rific'
                            background='#AFFFAF'
                            teamBG='#E0E0E0'
                        />
                    </tbody>
                </table>
            </div>
        </div>
          </div>
        )}

        {activeTab === "individual" && (
          <div>
            <ScoringTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoringTabs;
