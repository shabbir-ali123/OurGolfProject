import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Calendar from "../components/Calender";
import EventMap from "../components/EventMap";
import LocationSelectionPopup from "../components/LocationSelectionPopup";
import Table from "../components/Table";
import LiveEvents from "../pages/LiveEvents";
import PastEvents from "../pages/PastEvents";
import UpcomingEvents from "../pages/UpcomingEvents";
import { useTranslation } from "react-i18next";
import AllEvents from "../pages/AllEvents";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Event {
  id: string;
  creator:{
    nickName:any
  },
  isFavorite: Boolean;
  comments:[];
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
}

const Tabs: React.FC<TabsProps> = ({ events, setEvents }: TabsProps) => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const [currentPage, setCurrentPage] = useState(1);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const itemsPerPage = 6;
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = localEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const isPreviousDisabled = currentPage === 1;
  useEffect(() => {
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const newLocalEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    setLocalEvents(newLocalEvents);
  }, [events, currentPage]);

  const isNextDisabled = indexOfLastEvent >= events.length;
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    const totalPages = Math.ceil(events.length / itemsPerPage);
    const newPage = Math.max(1, Math.min(pageNumber, totalPages)); 
    setCurrentPage(newPage);
  };


  const [isLocationPopupOpen, setLocationPopupOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleLocationSelect = (locations: string | string[]) => {
    const newLocations = Array.isArray(locations) ? locations : [locations];
    setSelectedLocations((prevSelectedLocations) => [
      ...prevSelectedLocations,
      ...newLocations,
    ]);
  };

  const categories ={
    ALL: [],
    LIVE: [],
    UPCOMING: [],
    PAST: [],
    
  };
  
  const handleLocationButtonClick = () => {
    setLocationPopupOpen(true);
  };
 // Define the handleLike function
 const handleLike = (eventId: string) => {
  // Implement your like logic here
  console.log(`Liked event with ID: ${eventId}`);
};
  
  const handleSvgClick: React.MouseEventHandler<SVGSVGElement> = (
    liveevents
  ) => {};
  const buttonsToShow = 3;

  const startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endPage = Math.min(totalPages, startPage + buttonsToShow - 1);
  return (
    <div className="flex flex-wrap xl:flex-nowrap">
      <div className="w-full animate__animated animate__fadeInLeft">
        <Tab.Group>
          <Tab.List className="flex justify-between w-full lg:col-span-6   space-x-4 items-center px-2 rounded-md bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]">
            <div className="flex flex-wrap gap-4 py-2 lg:flex-nowrap">
              <div className="w-full md:mx-20 xl:relative animate__animated animate__shakeY">
                <button
                  type="button"
                  onClick={() => setLocationPopupOpen(true)}
                  className="xl:h-full rounded-l-md sm:absolute left-[-88px] top-[-7px] inline-flex items-center gap-x-1.5 text-[18px] px-6 mt-2 bg-[#17B3A6] text-white"
                >
                  <MapPinIcon className="-mr-0.5 h-5 w-5 " aria-hidden="true" />
                  {t('TOKYO')}
                </button>
              </div>

              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-md py-1 px-10 text-base font-normal leading-5 cursor-pointer hover:animate-bounce",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-[#b1b1b1]  text-black "
                        : "text-[#17B3A6] bg-white border border-solid-green-500 hover:bg-[#b1b1b1] hover:border-none hover:text-white"
                    )
                  }
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
                        onClick={handleSvgClick}
                      >
                        <path
                          strokeLinecap="round"
                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <p className="w-full">
                      {t(category)}
                      </p>
                      
                    </div>
                  ) : (
                    t(category)
                  )}
                </Tab>
              ))}

              <div className="flex justify-end ml-0 lg:ml-2 ">
                <Calendar setEvents={setEvents} />
              </div>
            </div>
          </Tab.List>
          {isLocationPopupOpen && (
          <LocationSelectionPopup
          isOpen={isLocationPopupOpen}
          onClose={() => setLocationPopupOpen(false)}
          onLocationSelect={handleLocationSelect}
          
        />
          )}
          <Tab.Panels>
            <Tab.Panel key="ALL">
            <AllEvents events={events} setEvents={setEvents}/>
            </Tab.Panel>
            <Tab.Panel key="LIVE">
              <LiveEvents  />
            </Tab.Panel>
            <Tab.Panel key="UPCOMING">
            <UpcomingEvents events={events} setEvents={setEvents} />
            </Tab.Panel>
            <Tab.Panel key="PAST">
              <PastEvents   />
            </Tab.Panel>
           
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
export default Tabs;
