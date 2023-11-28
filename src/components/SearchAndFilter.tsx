import { useState } from 'react';

const SearchAndFiltersEducator: React.FC = () => {
    const [search, setSearch] = useState(['Rating']);
    const searchHandler = (value: string) => {
        if (search.includes(value)) {
            let items = search.filter((data) => data != value);
            setSearch(items);
            return;
        }
        let addSearchitem = [...search];
        addSearchitem.push(value);
        setSearch(addSearchitem);
    };
    return (
        <>
            <p className=' text-[21.59px] leading-[25.76px] tracking-wide font-bold'>
                Find Your Educator
            </p>
            <div className='flex flex-col md:flex-row bg-white justify-between items-center'>
                <div className='relative w-full h-[44.08px] md:w-[204.64px] md:h-[24.08px] '>
                    <input
                        placeholder='search'
                        className='px-2 w-full h-full rounded-md py-1.5  box-border text-sm text-gray-300 border-solid border-[0.42px] border-[#CDCDCD]'
                    />
                    <img
                        className='absolute w-2 h-2 top-0 right-0 bottom-0 mx-2 my-auto'
                        alt=''
                        src='/img/search.svg'
                    />
                </div>
                <div className='flex flex-row items-center'>
                    <p className='text-[12px] font-bold'>Filter By:</p>

                    <div className='flex items-center justify-center gap-x-2'>
                        {['Rating', 'Location', 'Availability'].map(
                            (title, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`flex justify-center  p-2 ml-2 rounded-md font-normal text-xs ${
                                            search.includes(title)
                                                ? 'bg-[#A8FFC2]'
                                                : 'bg-[#D9D9D966]'
                                        } text-xs text-black shadow-sm`}
                                        onClick={() => {
                                            searchHandler(title);
                                        }}
                                    >
                                        {title}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default SearchAndFiltersEducator;
