import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { formatDate } from "../utils/getStartedDate";
import Table from "../components/Table";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import EventMap from "../components/EventMap";
import Pagination from "../components/Pagination";
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
const UpcomingEvents:  React.FC<TabsProps> = ({ events, setEvents }: TabsProps) => {
  const [UpcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  
  const fetchUpcomingEvents = async (page: any) => {
    try {
      const currentDate = new Date();
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const response = await axios.get(API_ENDPOINTS.GETALLEVENT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          pageSize: 50000,
          status: "upcoming",
        },
      });

      setUpcomingEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents(currentPage);
  }, [currentPage]);

  const totalEvents = UpcomingEvents.length;
  const totalPages = Math.ceil(totalEvents / pageSize);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEvents);

  const visibleEvents = UpcomingEvents.slice(startIndex, endIndex);
   // Define the handleLike function
 const handleLike = (eventId: string) => {
  // Implement your like logic here
  console.log(`Liked event with ID: ${eventId}`);
};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="col-span-3">
        <div className="animate__animated animate__fadeInLeft">
        <Table events={visibleEvents} handleLike={handleLike}  />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: any) => setCurrentPage(page)}
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
export default UpcomingEvents;
