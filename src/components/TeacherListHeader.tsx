import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import NameFilter from "./filters/NameFilter";
import { teacherContext } from "../contexts/teachersContext";
import { Link } from "react-router-dom";

// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function TeacherListHeader() {
  const tId = localStorage.getItem("teacher_id");
  const {
    handleAvailability,
    handleRating,
    handleSubjects,
    handleLocationSearch,
    handleNameSearch,
  } = teacherContext();
  const { t } = useTranslation();
  const handleNameChange = (e: any) => {
    handleNameSearch(e.target.value);
  };
  return (
    <>
      <div>
        <div>
          {!tId && (
            <Link
              to="/teacher-page"
              className="flex justify-center xl:justify-end my-4"
            >
              <button className="flex cursor-pointer items-center justify-center gap-2 bg-[#17b3a6] hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">
                {t("BECOME_TEACHER")}
              </button>
            </Link>
          )}
        </div>
        <div className="py-4  md:flex justify-between items-center mx-2">
          <h3 className="block text-xl font-bold leading-6 text-gray-900 text-start">
            {t("FIND_TEACHER")}
          </h3>
          <div>
            <NameFilter handleNameChange={handleNameChange} />
          </div>
        </div>
      </div>
    </>
  );
}
