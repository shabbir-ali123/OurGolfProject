import { FunnelIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";

const SearchMainEventFilter: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const { handleSearch, handleInitialSearch, eventsName } = eventContextStore();
  const [input, setInput] = useState<string>("");
  const handleChange = (e: any) => {
    setInput(e.target.value);
    handleInitialSearch(e.target.value);
  };
  const handleClickSearch = (e: any) => {
    e.preventDefault();

    handleSearch(input);
  };
  const handleFocus = (e: any) => {
    // e.preventDefault();
    // handleSearch(input)
  };

  return (
    <form
      className="flex w-full py-1 mt-2 animate__animated animate__fadeInLeft gap-2"
      onSubmit={handleClickSearch}
    >
      <div className="relative  items-stretch flex-grow focus-within:z-10">
      <div className="relative flex self-stretch flex-grow focus-within:z-10">
        <input
          onChange={handleChange}
          className="block w-full rounded-l-md border outline-none py-2 pl-4 ring-1 ring-inset ring-[#17B3A6]"
          placeholder={t("SEARCH_EVENT")}
          onFocus={handleFocus}
        />
      </div>
      <div>
        <ul>
          {eventsName?.map((item: any) => {
            return <li>{item.eventName}</li>;
          })}
        </ul>
      </div>
      </div>
      <button
        type="button"
        onClick={handleClickSearch}
        className="inline-flex h-[40px] items-center gap-x-1.5 text-white bg-[#17B3A6] rounded-r-md px-4 cursor-pointer"
      >
        <FunnelIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        {t("FILTER")}
      </button>
    </form>
  );
};

export default SearchMainEventFilter;
// import { FunnelIcon } from "@heroicons/react/24/outline";
// import { FunctionComponent, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { eventContextStore } from "../contexts/eventContext"; // Import the context

// const SearchMainEventFilter: FunctionComponent = () => {
//   const { t, i18n } = useTranslation();
//   const [searchTerm, setSearchTerm] = useState('');
//   const { handleSearch } = eventContextStore(); // Use a function from the context to handle the search

//   document.body.dir = i18n.dir();

//   const handleInputChange = (event:any) => {
//     setSearchTerm(event.target.value);
//     handleSearch(event.target.value); // Trigger the search when the user types
//   };

//   return (
//     <div className="flex w-full py-1 mt-2 animate__animated animate__fadeInLeft">
//       <div className="relative flex items-stretch flex-grow focus-within:z-10">
//         <input
//           type="text"
//           id="search"
//           className="block w-full rounded-l-md border outline-none py-2 pl-4 ring-1 ring-inset ring-[#17B3A6]"
//           placeholder={t('SEARCH_EVENT')}
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button
//         type="button"
//         className="inline-flex items-center gap-x-1.5 text-white bg-[#17B3A6] rounded-r-md px-4 cursor-pointer"
//       >
//         <FunnelIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
//         {t('FILTER')}
//       </button>
//     </div>
//   );
// };

// export default SearchMainEventFilter;
