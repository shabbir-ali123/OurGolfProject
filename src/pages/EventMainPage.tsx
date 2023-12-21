import { FunctionComponent, useState, useEffect } from "react";
import SearchEventContainer from "../components/SearchMainEventFilter";
import SideIconMenu from "../components/SideIconMenu";
import { Clip } from "../components/Clip";
import Tabs from "../components/Tabs";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
const EventMainPage: FunctionComponent = () => {
  const [events, setEvents] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1280);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GETALLEVENT, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        console.log("Events data:", response.data);
  
        if (response.status === 200) {
          // Make sure to access the correct property (response.data.events)
          setEvents(response.data.events);
        } else {
          // Handle error
          console.error("Error fetching events:", response.data);
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, [])
  const handleImageClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuItemClick = () => {
    setIsMenuVisible(false);
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

  return (
    <div className="flex flex-col gap-0 overflow-hidden px-10 py-0 mx-0 xl:px-20 bg-[white]  transition-colors duration-2000 animate-color-change">
      <SearchEventContainer />
      <div className="flex justify-between items-center">
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
              EVENTS IN
            </h1>
            <Clip title="Tokyo" />
          </div>
        </div>
        <div>
          <Link to="/create-event">
            <button
              type="button"
              className="flex items-center  rounded-md bg-[#65BCFE] px-3 py-3 text-xs font-semibold text-white shadow-sm cursor-pointer animate__animated animate__jello animate__repeat-2 hover:animate-bounce"
            >
              <PencilSquareIcon
                className="-mr-0.5 h-5 w-5"
                aria-hidden="true"
              />
              Create Event
            </button>
          </Link>
        </div>
      </div>

      {events.length === 0 ? <div>Loading...</div> : <Tabs events={events} />}

      {isDesktop && <SideIconMenu />}
    </div>
  );
};

export default EventMainPage;
