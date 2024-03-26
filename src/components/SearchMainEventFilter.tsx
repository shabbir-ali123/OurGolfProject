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
    
  
    handleInitialSearch(inputValue);
  };
  const handleClickSearch = (e: any) => {
    e.preventDefault();
    const selectedNames = selectedItems.map(item => item.eventName);
    const combinedValue = selectedNames.join(" ") + input  ;
    
    handleSearch(combinedValue);
    
  };
  const handleItemClick = (item: any) => {
    setSelectedItems([...selectedItems, item]);
    setInput("");
  };
  const handleRemoveItem = (index: number) => {
    // Remove item from selectedItems based on its index
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

 

  return (
    <form
      className="flex w-full py-1 mt-2 animate__animated animate__fadeInLeft gap-2"
      onSubmit={handleClickSearch}
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
          className="block w-full rounded-l-md border outline-none py-2 pl-4 ring-1 ring-inset ring-[#17B3A6]"
          
        />
      </div>
      {
        eventsName && <div className="shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg p-4">
        <ul className="p-0">
          {eventsName?.map((item: any) => {
            return <li className="list-none text-start">
              <span onClick={() => handleItemClick(item)} className="text-black cursor-pointer">{item.eventName}</span>
              </li>;
          })}
        </ul>
      </div>
      }
   
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
