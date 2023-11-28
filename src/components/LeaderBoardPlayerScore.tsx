import { FunctionComponent } from 'react';
import IndiviualPlayerTableHeader from './IndiviualPlayerTableHeader';
import IndiviualPlayerTableRow from './IndiviualPlayerTableRow';

const LeaderBoardIndiviualPlayerScore: FunctionComponent = () => {
    return (
        <div className='mt-20 mx-5 md:mx-[80px] my-20'>
            <div className='my-20'>
                <div className='flex items-center'>
                    <div className='relative w-[90.5px] h-[147.5px]'>
                        <img
                            className='absolute top-[60px] left-[0px] w-[90.5px] h-[87.5px]'
                            alt=''
                            src='/img/ellipse-2303.svg'
                        />
                        <img
                            className='absolute top-[0px] left-[22.5px] w-[58px] h-[108px] object-cover'
                            alt=''
                            src='/img/rectangle-1250@2x.png'
                        />
                    </div>
                    <div className='text-21xl text-darkslateblue-300 uppercase font-semibold [text-shadow:0px_7px_4px_#b8e4fd]'>
                        Indiviual Player Score
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row  gap-8 relative'>
                <div className='basis-1/2'>
                    <div className='flex  items-center justify-center basis-1/2 h-[80px] bg-[#0AA3BC]'>
                        <div className='text-13xl text-white font-medium'>
                            {' '}
                            Drive Context (Hole 4)
                        </div>
                    </div>
                    <IndiviualPlayerTableHeader />
                    <IndiviualPlayerTableRow />
                    <IndiviualPlayerTableRow />
                    <IndiviualPlayerTableRow />
                </div>

                <div className='basis-1/2'>
                    <div className=' flex items-center justify-center h-[80px] bg-[#0AA3BC]'>
                        <div className='text-13xl text-white font-medium'>
                            Near Pin Contest (Hole 9)
                        </div>
                    </div>
                    <IndiviualPlayerTableHeader />
                    <IndiviualPlayerTableRow />
                    <IndiviualPlayerTableRow />
                    <IndiviualPlayerTableRow />
                </div>
                {/* icon */}
                <div className='right-0 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[170.7px] h-[229.6px]'>
                    <img
                        className='absolute top-[78.4px] left-[0px] w-[170.7px] h-[151.2px]'
                        alt=''
                        src='/img/ellipse-2305.svg'
                    />
                    <img
                        className='absolute top-[0px] left-[7.7px] w-[109.5px] h-[197.5px] object-cover'
                        alt=''
                        src='/img/rectangle-1249@2x.png'
                    />
                </div>
            </div>
        </div>
    );
};

export default LeaderBoardIndiviualPlayerScore;
