import { FunctionComponent } from 'react';
import LeaderBoardHeader from '../components/LeaderBoardHeader';
import LeaderBoardFirstRow from '../components/LeaderBoardRow';
import Team from '../utils/Team';
import { useTranslation } from 'react-i18next';
import { useScoreContext } from '../contexts/scoreContext';

const LeaderBoardSection: FunctionComponent = () => {
    const { score } = useScoreContext();
    const {t, i18n} = useTranslation();
    document.body.dir = i18n.dir();
   
    return (
        <>
            <div className='mt-20 mx-5 md:mx-[80px] bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]  p-[80px]  animate__animated animate__bounceInDown'>
                <div>
                    <LeaderBoardHeader />
                    <div className='mt-10'>
                        {score?.map((score: any, index: any) => (
                            <div key={index}>
                                <LeaderBoardFirstRow
                                    data={score}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center mt-10 text-center'>
                <button
                    className='flex items-center justify-center rounded-[40px] text-lg bg-white shadow-[4px_4px_16px_#268d61] w-[171px] h-[59px] leading-[20px] font-medium'
                    style={{ cursor: 'pointer' }}
                >{t('LOAD_MORE')}</button>
            </div>
        </>
    );
};

export default LeaderBoardSection;
