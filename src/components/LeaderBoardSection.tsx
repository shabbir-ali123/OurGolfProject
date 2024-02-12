import { FunctionComponent } from 'react';
import LeaderBoardHeader from '../components/LeaderBoardHeader';
import LeaderBoardFirstRow from '../components/LeaderBoardRow';
import Team from '../utils/Team';
import { useTranslation } from 'react-i18next';

const LeaderBoardSection: FunctionComponent = () => {
    const {t, i18n} = useTranslation();
    document.body.dir = i18n.dir();
    const teamData = [
        new Team(
            1,
            'Fore Friends',
            26,
            15,
            22,
            78,
            '/img/ellipse-23085@2x.png',
            '#B8E4FD',
            '#00BF9E'
        ),
        new Team(
            2,
            'Birdie Brigad',
            26,
            15,
            22,
            28,
            '/img/ellipse-23085@2x.png',
            '#B8E4FD',
            '#00BF9E'
        ),
        new Team(
            3,
            'Hole-in-Won',
            26,
            15,
            23,
            78,
            '/img/ellipse-23085@2x.png',
            '#B8E4FD',
            '#00BF9E'
        ),
        new Team(
            4,
            'Fore Friends',
            26,
            15,
            22,
            28,
            '/img/ellipse-23085@2x.png',
            '#B8E4FD',
            '#00BF9E'
        ),
        new Team(
            1,
            'Eagle Express',
            23,
            5,
            212,
            748,
            '/img/ellipse-23085@2x.png',
            '#B8E4FD',
            '#00BF9E'
        ),
    ];
    return (
        <>
            <div className='mt-20 mx-5 md:mx-[80px] bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]  p-[80px]'>
                <div>
                    <LeaderBoardHeader />
                    <div className='mt-10'>
                        {teamData.map((data, index) => (
                            <div key={index}>
                                <LeaderBoardFirstRow
                                    data={data}
                                    rowBackgroundColor={data.rowBackgroundColor}
                                    teamBackgroundColor={
                                        data.teamBackgroundColor
                                    }
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
