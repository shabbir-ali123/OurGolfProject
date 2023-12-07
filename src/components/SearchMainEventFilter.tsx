import {
  BarsArrowUpIcon,
  FunnelIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  ServerStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";

const SearchMainEventFilter: FunctionComponent = () => {
  return (
    <div className="py-1 mt-2 flex w-full animate__animated animate__rotateInDownLeft">
      <div className="relative flex flex-grow  items-stretch focus-within:z-10">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-l-md border outline-none py-2 pl-4 ring-1 ring-inset ring-[#17B3A6]"
          placeholder="Search Event"
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 text-white bg-[#17B3A6] rounded-r-md px-4 cursor-pointer"
      >
        <FunnelIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        Filter
      </button>
    </div>
  );
};

export default SearchMainEventFilter;
