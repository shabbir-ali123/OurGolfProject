import { FunctionComponent, useState, useEffect } from "react";
import SearchEventContainer from "../components/SearchMainEventFilter";
import SideIconMenu from "../components/SideIconMenu";
import { Clip } from "../components/Clip";
import Tabs from "../components/Tabs";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// import { fetchEvents } from "../utils/fetchEvents";
import { ToastProvider } from '../utils/ToastProvider';
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";

const EventMainPage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [events, setEvents] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1280);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("ALL");

  const { handleLocationFilter } = eventContextStore();
  useEffect(() => {
    handleLocationFilter(selectedLocations);
  }, [selectedLocations]);

  const handleTabChange = (tab: string) => {
    const lowerTab = tab?.toLowerCase();
    setCurrentTab(lowerTab);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRemoveLocation = (locationToRemove: string) => {
    setSelectedLocations((prevSelectedLocations) =>
      prevSelectedLocations.filter((location) => location !== locationToRemove)
    );
  };

  return (
    <ToastProvider iconColor="white" textColor="white">
      <div className="flex flex-col gap-0 overflow-hidden px-10 py-0 mx-0 xl:px-20 bg-[white]  transition-colors duration-2000 animate-color-change">
        <SearchEventContainer />
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-end gap-3">
            <div className="animate__animated animate__rotateIn">
              <img
                className="object-cover w-16 animate-pulse"
                alt=""
                src="/img/rectangle-1248@2x.png"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 my-2 xl:m-0">
              <h1 className="text-[#193A8B] text-[3xl] font-semibold animate__animated animate__rubberBand animate__repeat-3">
                {t('EVENTS_IN')}
              </h1>
              {selectedLocations.map((location, index) => (
                <div key={index} className="flex items-center ">
                  <Clip place={location} />
                  <span
                    onClick={() => handleRemoveLocation(location)}
                    data-te-chip-close
                    className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>

                </div>
              ))}
            </div>
          </div>
          <div>
            <Link to="/create-event">
              <button
                type="button"
                className="flex items-center  rounded-md bg-[#17B3A6] px-3 py-3 text-xs font-semibold text-white shadow-sm cursor-pointer animate__animated animate__jello animate__repeat-2 hover:animate-bounce"
                onClick={() => localStorage.removeItem('par')}
              >
                <PencilSquareIcon
                  className="-mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                {t('CREATE_EVENTS')}
              </button>
            </Link>
          </div>
        </div>

        <Tabs events={events} setEvents={setEvents} selectedCities={setSelectedLocations} setCurrentTabs={handleTabChange} />

      </div>
    </ToastProvider>
  );
};

export default EventMainPage;
