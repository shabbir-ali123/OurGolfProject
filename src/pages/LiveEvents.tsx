import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { formatDate } from "../utils/getStartedDate";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import EventMap from "../components/EventMap";
import Pagination from "../components/Pagination";
import { fetchEvents } from "../utils/fetchEvents";
import Table from "../components/Table";
interface Event {
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
}

const LiveEvents: React.FC = () => {
  const [events, setEvents] = useState([]);
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // Show 4 items per page
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const isPreviousDisabled = currentPage === 1;

  // Example: Disable "Next" button on the last page
  const isNextDisabled =
    indexOfLastEvent >= events.length ||
    currentPage === Math.ceil(events.length / itemsPerPage);
  const totalPages = Math.ceil(events.length / itemsPerPage);
  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    const totalPages = Math.ceil(events.length / itemsPerPage);
    // Ensure the new page number is within the valid range
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };

  // const fetchLiveEvents = async (page: any) => {
  //   try {
  //     const currentDate = new Date();
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
  //         pageSize,
  //         page,
  //         eventStartDate: formatDate(currentDate),
  //       },
  //     });

  //     setLiveEvents(response.data.events);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };
  const currentDate = new Date();
  const dd = "2023-27-12";

  useEffect(() => {
    fetchEvents(currentDate, "", setEvents);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="col-span-3 ">
        <Table events={currentEvents} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: any) => setCurrentPage(page)}
          pageSize={pageSize}
        />
      </div>
     
      <div>
        <EventMap />
      </div>
    </div>
  );
};
export default LiveEvents;
