const SearchAndFiltersEducator: React.FC = () => {
    return (
        <>
            <p className=' text-[21.59px] leading-[25.76px] tracking-wide font-bold'>
                Find Your Educator
            </p>
            <div className='flex bg-white justify-between items-center'>
                <div className='relative min-w-[204.64px] h-[24.08px] '>
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
                <div className='flex items-center'>
                    <p className='text-[12px] font-bold'>Filter By:</p>

                    <div className='flex items-center justify-center gap-x-2'>
                        <button className='flex justify-center w-[64.34px] p-2 ml-2 rounded-md font-normal text-xs bg-[#A8FFC2] text-xs text-black shadow-sm'>
                            Rating
                        </button>
                        <button className='flex justify-center w-[64.34px] p-2 rounded-md font-normal text-xs bg-[#D9D9D966] text-xs text-black shadow-sm'>
                            Location
                        </button>
                        <button className='flex justify-center w-[70.34px] p-2 mr-1 rounded-md font-normal text-xs bg-[#D9D9D966] text-xs text-black shadow-sm'>
                            Availability
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SearchAndFiltersEducator;
