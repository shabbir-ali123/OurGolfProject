import { FunctionComponent } from 'react';
import ScoringTableRow from './ScoringTableRow';
import { useTranslation } from 'react-i18next';

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

const ScoringTable: FunctionComponent = () => {
    const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();

    return (
        <div className='mx-5 '>
            <div className='px-3 overflow-x-auto'>
                <table className='w-full border-spacing-y-5 '>
                    <thead className='text-left text-whitesmoke-100'>
                        <tr className=' bg-green shadow-[0px_4px_12px_#193a8b] h-[63px] min-w-[182px]'>
                            <ScoringTableColumn
                                title={t('HOLE')}
                                className='rounded-s-[3px] font-bold text-[24px] text-center'
                            />

                            {Array.from({ length: 9 }, (_, index) => (
                                <ScoringTableColumn
                                    key={index}
                                    title={`${index + 1}`}
                                    className='text-[18px] font-medium text-center'
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
                        <tr className='bg-[#17B3A6]  h-[69px] font-medium text-white'>
                            <td className='whitespace-nowrap tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[13px]'>
                                <div
                                    className='w-[135px] text-[24px] h-[69px] flex items-center justify-center font-normal leading-5 text-white bg-[#CF24EB]'
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
                                className='bg-black text-[18px] font-medium text-center'
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
                                className='bg-black text-[18px] font-medium text-center '
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
                            background='#B8E4FD'
                            teamBG='#00BF9E'
                        />
                        <ScoringTableRow
                            teamImageUrl='/img/ellipse-23086@2x.png'
                            teamName='Birdie Brigadbasd'
                            background='#FFD98C'
                            teamBG='#00BF9E'
                        />
                        <ScoringTableRow
                            teamImageUrl='/img/ellipse-23114@2x.png'
                            teamName='Hole-in-Won'
                            background='#CDD5FF'
                            teamBG='#011F3B'
                        />
                        <ScoringTableRow
                            teamImageUrl='/img/ellipse-23088@2x.png'
                            teamName='Tee-rific Titan'
                            background='#AFFFAF'
                            teamBG='#1D3D86'
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ScoringTable;
