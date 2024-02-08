import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { formatDate } from "../utils/getStartedDate";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import EventMap from "../components/EventMap";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import { fetchEvents } from "../utils/fetchEvents";

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
  likes?: any[];
  nickname?: string;
  email?: string;
}
interface AllEventsProps {
  events: Event[];
  setEvents: any;
  status?: any;
}

const PastEvents: React.FC<AllEventsProps> = ({
    events, 
    setEvents,
    status
  }: AllEventsProps) => {
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState<any>(['Tokyo']);

  // const fetchPastEvents = async (page: number) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       console.error("User not authenticated");
  //       return;
  //     }

  //     const response = await axios.get(API_ENDPOINTS.GETALLEVENT, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params: {
  //         page: 1,
  //         pageSize: 50000,
  //         status: "past",
  //         endDate: formatDate(currentDate),
  //       },
  //     });
  //     const updatedLikes: Record<string, number> = {};
  //     response.data.events.forEach((event: Event) => {
  //       updatedLikes[event.id] = likes[event.id] || 0;
  //     });
  //     setLikes(updatedLikes);
  //     setPastEvents(response.data.events);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };
  // const currentDate = new Date();
  // const current = formatDate(currentDate);
  // console.log({locationFilter}, "asdsa");
  // useEffect(() => {
  //   fetchEvents("","",setPastEvents,locationFilter,"past");
  // }, [currentPage, locationFilter]);

  const totalEvents = pastEvents.length;
  const totalPages = Math.ceil(totalEvents / pageSize);
  const indexOfLastEvent = currentPage * pageSize;
  const indexOfFirstEvent = indexOfLastEvent - pageSize;
  const visibleEvents = pastEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled =
    indexOfLastEvent >= totalEvents || currentPage === totalPages;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    // Set localEvents to all events
    setPastEvents(events);
  }, [events, currentPage]);
  
  const handleLike = async (event: Event) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "");
      const eventLikes = event?.likes || [];
      const userEventLike = eventLikes.find(
        (like: any) => like.userId === loggedInUser
      );
      const newCounter = userEventLike?.counter === 1 ? 0 : 1;
      const response = await axios.post(
        API_ENDPOINTS.ADDLIKE,
        {
          eventId: event.id,
          Count: newCounter,
          userId: loggedInUser,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPastEvents((prevPastEvents) =>
        prevPastEvents.map((e) =>
          e.id === event.id
            ? {
                ...e,
                likes: userEventLike
                  ? eventLikes.map((like: any) =>
                      like.userId === loggedInUser
                        ? { ...like, counter: newCounter }
                        : like
                    )
                  : [
                      ...eventLikes,
                      {
                        counter: newCounter,
                        userId: loggedInUser,
                        id: Math.floor(Math.random() * 10),
                      },
                    ],
              }
            : e
        )
      );

      setLikes((prevLikes) => ({
        ...prevLikes,
        [event.id]: newCounter,
      }));
    } catch (error) {
      toast.error(`Error updating like: ${error}`, toastProperties as ToastConfig);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-3">
        <Table events={visibleEvents} handleLike={handleLike} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
      </div>
      <div>
        <EventMap />
      </div>
    </div>
  );
};

export default PastEvents;
