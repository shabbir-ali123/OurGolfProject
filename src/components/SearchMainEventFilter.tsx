import { FunnelIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";
import { Link } from "react-router-dom";

const SearchMainEventFilter: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const { handleSearch, handleInitialSearch, eventsName } = eventContextStore();
  const [input, setInput] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    // Check if input is empty
    if (inputValue === "") {
      // If input is empty, perform search to fetch all events
      handleInitialSearch(""); // You might want to adjust this based on your implementation
    } else {
      // Combine selected event names with input value
      const selectedNames = selectedItems.map(item => item.eventName);
      const combinedValue = selectedNames.join(" ") + inputValue;

      // Perform search with combined value
      handleSearch(combinedValue);
    }
  };

  const handleItemClick = (item: any) => {
    setSelectedItems([...selectedItems, item]);
    setInput("");
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  return (
    <form
      className="flex w-full py-1 mt-2 animate__animated animate__fadeInLeft gap-2"
    >
      <div className="relative  items-stretch flex-grow focus-within:z-10">
        <div className="flex flex-wrap gap-1">
          {selectedItems.map((item, index) => (
            <div key={index} className="bg-gray-200 rounded-md p-1 flex items-center">
              <span>{item.eventName}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="ml-1 text-red-500 focus:outline-none"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="relative flex self-stretch flex-grow focus-within:z-10">
          <input
            onChange={handleChange}
            value={input}
            className="block w-full rounded-l-md border outline-none py-2 pl-4 ring-1 ring-inset ring-[#17B3A6]"
            placeholder={t('SEARCH_EVENT')}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className="inline-flex h-[40px] items-center gap-x-1.5 text-white bg-[#17B3A6] rounded-r-md px-4 cursor-pointer"
      >
        <FunnelIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        {t("FILTER")}
      </button> 
    </form>
  );
};

export default SearchMainEventFilter;
