import {FunnelIcon} from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const SearchMainEventFilter: FunctionComponent = () => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  return (
    <div className="flex w-full py-1 mt-2 animate__animated animate__fadeInLeft">
      <div className="relative flex items-stretch flex-grow focus-within:z-10">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-l-md border outline-none py-2 pl-4 ring-1 ring-inset ring-[#17B3A6]"
          placeholder={t('SEARCH_EVENT')}
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 text-white bg-[#17B3A6] rounded-r-md px-4 cursor-pointer"
      >
        <FunnelIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        {t('FILTER')}
      </button>
    </div>
  );
};

export default SearchMainEventFilter;
