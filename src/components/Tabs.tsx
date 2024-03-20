import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Calendar from "../components/Calender";
import LocationSelectionPopup from "../components/LocationSelectionPopup";
import LiveEvents from "../pages/LiveEvents";
import PastEvents from "../pages/PastEvents";
import UpcomingEvents from "../pages/UpcomingEvents";
import { useTranslation } from "react-i18next";
import AllEvents from "../pages/AllEvents";
import { eventContextStore } from "../contexts/eventContext";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Event {
  id: string;
  creator: {
    nickName: any;
  };
  isFavorite: Boolean;
  comments: [];
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
  count: any;
}

interface TabsProps {
  events: Event[];
  setEvents: any;
  selectedCities?: any;
  setCurrentTabs: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  events,
  setEvents,
  selectedCities,
  setCurrentTabs,
}: TabsProps) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [currentPage, setCurrentPage] = useState(1);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("ALL");
  const { handleEventStatus, clearFilter } = eventContextStore();
  const itemsPerPage = 6;

  useEffect(() => {
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const newLocalEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    setLocalEvents(newLocalEvents);
  }, [events, currentPage]);

  const [isLocationPopupOpen, setLocationPopupOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<any>();
  const categories = {
    ALL: [],
    LIVE: [],
    UPCOMING: [],
    PAST: [],
  };

  const handleLocationSelect = (locations: string | string[]) => {
    const newLocations = Array.isArray(locations) ? locations : [locations];
    setSelectedLocations((prevSelectedLocations) => [
      ...prevSelectedLocations,
      ...newLocations,
    ]);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setCurrentTabs(tab);
  };

  const handleFilterLocation = (data: any) => {
    setFilterLocation(data);

  };

  useEffect(() => {
    // Set localEvents to all events
    handleEventStatus(currentTab);
  }, []);
  return (
    <div className="flex flex-wrap">
      <div className="w-full animate__animated animate__fadeInLeft">
        <Tab.Group>
          <Tab.List className="flex justify-between w-full lg:col-span-6   space-x-4 items-center px-2 rounded-md bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]">
            <div className="flex flex-wrap gap-4 py-2 lg:flex-nowrap">
              <div className="w-full  md:mx-20 xl:relative animate__animated animate__shakeY">
                <button
                  type="button"
                  onClick={() => setLocationPopupOpen(true)}
                  className="py-4 flex justify-center w-full xl:w-auto rounded-md sm:absolute left-[-88px] top-[-7px] items-center gap-x-1.5 text-[18px] px-6 mt-2 bg-[#17B3A6] text-white"
                >
                  <MapPinIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                  {filterLocation && filterLocation.length
                    ? filterLocation.length > 1
                      ? `${filterLocation[0]} ...`
                      : filterLocation[0]
                    : "Location..."}
                </button>
              </div>
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-md  px-6 text-base font-normal leading-5 cursor-pointer ",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-[#B1B1B1]  text-white flex items-center justify-center"
                        : "text-[#17B3A6] shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] flex items-center justify-center hover:bg-[#B1B1B1] hover:border-none hover:text-white"
                    )
                  }
                  onClick={() => handleTabChange(category)} // Call handleTabChange on tab click
                >
                  {category === "LIVE" ? (
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="red"
                        className="w-6 h-6 pr-2.5"
                      >
                        <path
                          strokeLinecap="round"
                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <p className="w-[50px]">{t(category)}</p>
                    </div>
                  ) : (
                    <p className="w-[100px]">{t(category)}</p>
                  )}
                </Tab>
              ))}
              <div className="flex justify-end ml-0 lg:ml-2 ">
                <Calendar setEvents={setEvents} setFilterLocation={setFilterLocation}  />
              </div>

            </div>
          </Tab.List>
          {isLocationPopupOpen && (
            <LocationSelectionPopup
              isOpen={isLocationPopupOpen}
              onClose={() => setLocationPopupOpen(false)}
              onLocationSelect={handleLocationSelect}
              selectedCitiesData={selectedCities}
              sendDataToParent={handleFilterLocation}
            />
          )}
          <Tab.Panels>
            <Tab.Panel key="ALL">
              <AllEvents events={events} setEvents={setEvents} />
            </Tab.Panel>
            <Tab.Panel key="LIVE">
              <LiveEvents />
            </Tab.Panel>
            <Tab.Panel key="UPCOMING">
              <UpcomingEvents events={events} setEvents={setEvents} />
            </Tab.Panel>
            <Tab.Panel key="PAST">
              <PastEvents events={events} setEvents={setEvents} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Tabs;
function handleStartDate(arg0: null) {
  throw new Error("Function not implemented.");
}

function handleEndDate(arg0: null) {
  throw new Error("Function not implemented.");
}

