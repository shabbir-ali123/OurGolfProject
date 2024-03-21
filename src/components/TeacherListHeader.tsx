
import { MagnifyingGlassIcon  } from '@heroicons/react/24/outline'
import { useTranslation } from "react-i18next";
import NameFilter from './filters/NameFilter';
import { teacherContext } from '../contexts/teachersContext';

// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function TeacherListHeader() {
    const {handleAvailability, handleRating, handleSubjects, handleLocationSearch, handleNameSearch} = teacherContext();
    const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const handleNameChange = (e: any) => {
    handleNameSearch(e.target.value);
  };
    return (
        <>
       
                <div>
                    <div className='py-4  md:flex justify-between items-center mx-2'>
                        <h3 className="block text-xl font-bold leading-6 text-gray-900 text-start">{t("FIND_TEACHER")}</h3>
                        <div>
                           
                        <NameFilter handleNameChange={handleNameChange}/>
                        </div>
                    </div>

                </div>
          
        </>
    )
}
