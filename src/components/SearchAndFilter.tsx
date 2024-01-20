import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from "@heroicons/react/24/solid";
interface SearchAndFiltersEducatorProps {
    setsearch?: (value: string | null) => void;
    setLocation?: (value: string | null) => void;
    setAvailibilty?:(value: boolean | null) => void;

}    

const SearchAndFiltersEducator: React.FC<SearchAndFiltersEducatorProps> = ({ setsearch , setLocation, setAvailibilty}) => {
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();

    const [search, setSearch] = useState(['']);
    const [showLocationInput, setShowLocationInput] = useState(false);
    const [newAvailibilty, setNewAvailibilty] = useState(true);

    const searchHandler = (value: string) => {


        if (value === 'Location') {
            setShowLocationInput(true);
            return;
        }
    
        if (value === 'Availibilty') {
            setAvailibilty!(newAvailibilty);
            setNewAvailibilty(!newAvailibilty);
        }
        setSearch((prevSearch) => {
            if (prevSearch.includes(value)) {

                return prevSearch.filter((filter) => filter !== value);
            } else {
                return [...prevSearch, value];
            }
        });
        
    };

    

    const handleChange = (getsearch: string, type: string = 'search') => {
        setsearch!(getsearch); // Update parent's state
    };

    const handleLocationChange = (getLocation:any) => {
        setShowLocationInput(true);
        setLocation!(getLocation); // Update location in search
    };

    return (
        <>
        <div className='max-w-7xl mx-auto'>
        <p className='text-[21.59px] leading-[25.76px] tracking-wide font-bold m-0'>
                {t('FIND_TEACHER')}
            </p>
            <div className='relative pb-4 flex  items-center justify-between md:flex-row  mt-4'>
                {/* Search Input */}
                <div className='relative w-full h-[44.08px] md:w-[204.64px] md:h-[24.08px]'>
                    <input
                        type='text'
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder={t('SEARCH')}
                        className='px-2 w-full h-full rounded-md py-1.5 box-border text-sm text-gray-300 border-solid border-[0.42px] border-[#CDCDCD]'
                    />
                    <img
                        className='absolute top-0 bottom-0 right-0 w-2 h-2 mx-2 my-auto'
                        alt=''
                        src='/img/search.svg'
                    />
                </div>

                {/* Filter Buttons */}
                <div className='flex flex-row items-center'>
                    <p className='text-[10px] font-normal'>{t('FILTER_BY')}:</p>
                    <div className='flex items-center justify-center gap-x-0'>
                        {['Rating', 'Location', 'Availibilty'].map((title, index) => (
                          
                            <button
                                key={index}
                                className={`flex justify-center p-2 ml-2 rounded-md font-normal text-xs cursor-pointer ${search.includes(title) ? 'bg-[#A8FFC2]' : 'bg-[#D9D9D966]'
                                    } text-xs text-black shadow-sm`}
                                onClick={() => searchHandler(title)}
                            >
                                
                                {t(title.toLocaleUpperCase())}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location Input Field */}
            {showLocationInput && (
                <div className='absolute top-[95px] w-[470px] '>
                    <div className="flex items-center mt-2 relative ">
                        <input
                            type="text"
                            onChange={(e) => handleLocationChange(e.target.value)}
                            placeholder="Enter location"
                            className="p-2 rounded-md w-full my-2"
                        />
                        <button
                            onClick={() => {
                                setShowLocationInput(false);
                            }}
                            className="ml-2 absolute right-0 bg-transparent cursor-pointer"><XMarkIcon className="w-4 h-4  round-full" aria-hidden="true" /></button>
                    </div>
                </div>

            )}
        </div>
           
        </>
    );
};

export default SearchAndFiltersEducator;
