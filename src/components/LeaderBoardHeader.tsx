import { FunctionComponent } from 'react';
import StateDefault from './StateDefault';

const LeaderBoardHeader: FunctionComponent = () => {
    return (
        <>
            <div className='flex gap-[8px]'>
                <div className='flex items-center justify-center rounded-md bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] box-border w-[55px] h-[62px] border-[1px] border-solid border-silver'>
                    <img
                        className='h-[33.87%] w-[32.73]'
                        alt=''
                        src='/img/icon.svg'
                    />
                </div>
                <StateDefault
                    search='Search player score here...'
                    stateDefaultBorder='1px solid #b5b5b5'
                    stateDefaultHeight='62px'
                    searchFontSize='19px'
                />
            </div>

            <div className=' mt-12 tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-21xl '>
                Leader Board
            </div>
            <div className='mt-10'>
                <div className=' rounded-md bg-darkslategray-400 h-[57px] text-lg text-white font-poppins text-center'>
                    <div className='flex items-center h-full gap-4 px-3 leading-[18px]'>
                        <div className='flex gap-2 basis-1/6 text-sm font-body-b2'>
                            <div className=''>POS</div>
                            <img className='' alt='' src='/img/vector1.svg' />
                        </div>
                        <div className='basis-4'>
                            <img
                                className=''
                                alt=''
                                src='/img/group-1000008891.svg'
                            />
                        </div>
                        <div className='basis-1/2 flex gap-2'>
                            <div className=''>PLAYERS</div>
                            <img
                                className='h-[18px]'
                                alt=''
                                src='/img/players_arrow.svg'
                            />
                        </div>
                        <div className='basis-1/3'>TEAM NAME</div>
                        <div className='basis-1/5'>SCORE</div>
                        <div className='basis-1/5 '>Drive Con. Pos</div>
                        <div className='basis-1/5'>Near Pin Con</div>
                        <div className='basis-1/5'>Total Par</div>
                        <div className='basis-1/2'>STATS</div>
                    </div>
                </div>
            </div>
            
        </>
        // <div className="absolute top-[0px] left-[0px] w-[1211px] h-[57px] text-left text-lg text-white font-poppins">
        //   <div className="absolute top-[0px] left-[0px] rounded-md bg-darkslategray-400 w-[1211px] h-[57px]" />
        //   <div className="absolute top-[12px] left-[23px] w-[1098px] h-9">
        //     <div className="absolute top-[7px] left-[0px] w-[47.8px] h-5 text-sm font-body-b2">
        //       <div className="absolute top-[0px] left-[0px] leading-[20px]">
        //         POS
        //       </div>
        //       <img
        //         className="absolute h-[45%] w-[28.87%] top-[30%] right-[0%] bottom-[25%] left-[71.13%] max-w-full overflow-hidden max-h-full"
        //         alt=""
        //         src="/img/vector1.svg"
        //       />
        //     </div>
        //     <div className="absolute top-[7px] left-[125px] leading-[20px]">
        //       PLAYERS
        //     </div>
        //     <img
        //       className="absolute h-[34.72%] w-[2.19%] top-[27.78%] right-[90.53%] bottom-[37.5%] left-[7.29%] max-w-full overflow-hidden max-h-full"
        //       alt=""
        //       src="/img/group-1000008891.svg"
        //     />
        //     <div className="absolute h-3/4 w-[1.55%] top-[8.33%] right-[80.05%] bottom-[16.67%] left-[18.4%] text-4xs">
        //       <img
        //         className="absolute h-[38.15%] w-[52.94%] top-[31.48%] right-[50%] bottom-[30.37%] left-[-2.94%] max-w-full overflow-hidden max-h-full"
        //         alt=""
        //         src="/img/vector2.svg"
        //       />
        //       <div className="absolute top-[0px] left-[10px] leading-[20px]">A</div>
        //       <div className="absolute top-[7px] left-[11px] leading-[20px]">Z</div>
        //     </div>
        //     <div className="absolute top-[7px] left-[363px] leading-[20px]">
        //       TEAM NAME
        //     </div>
        //     <div className="absolute top-[7px] left-[507px] leading-[20px]">
        //       SCORE
        //     </div>
        //     <div className="absolute top-[0px] left-[598px] tracking-[0.04em] leading-[18px] text-center">
        //       <p className="m-0">Drive Con.</p>
        //       <p className="m-0">Pos</p>
        //     </div>
        //     <div className="absolute top-[0px] left-[750px] tracking-[0.04em] leading-[18px] text-center">
        //       <p className="m-0">{`Near Pin `}</p>
        //       <p className="m-0">Con</p>
        //     </div>
        //     <div className="absolute top-[8px] left-[870px] tracking-[0.04em] leading-[18px] text-center">
        //       Total Par
        //     </div>
        //     <div className="absolute top-[7px] left-[1045px] leading-[20px]">
        //       STATS
        //     </div>
        //   </div>
        // </div>
    );
};

export default LeaderBoardHeader;
