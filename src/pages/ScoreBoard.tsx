import { FunctionComponent } from 'react';
import ChampionShipName from '../components/ChampionShipName';
import Slider from '../components/Slider';
import LeaderBoardSection from '../components/LeaderBoardSection';
import LeaderBoardScoringTab from '../components/LeaderBoardScoringTable';
import IndiviualPlayerScore from '../components/LeaderBoardPlayerScore';
import TeamPerformance from '../components/TeamPerformance';
import ScoringTable from '../components/ScoringTable';

const ScoreBoard: FunctionComponent = () => {
    return (
        <div className='font-poppins'>
            <div className='flex flex-col'>
                <ChampionShipName />
                <LeaderBoardSection />
                {/* indiviual player  score */}
                <IndiviualPlayerScore />
                {/* Drive Context  and Near Pin Contest */}
                <TeamPerformance title='Drive Context (Hole 4)' />
                <TeamPerformance title='Near Pin Contest (Hole 9)' />
                <ScoringTable/>

            </div>
            {/* <Slider /> */}

            {/* <LeaderBoardScoringTab /> */}
        </div>
    );
};

export default ScoreBoard;
