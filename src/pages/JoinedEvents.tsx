import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import EventMap from "../components/EventMap";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

interface Event {
  id: string;
  creator: {
    nickName: any;
  };
  comments:[];
  isFavorite: boolean;
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
  likes: Array<{
    counter: number;
    userId: string;
    id: number;
  }>;
}

const JoinedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("User not authenticated");
          return;
        }

        const response = await axios.get(API_ENDPOINTS.JOINEDEVENTS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 1,
            pageSize: 50000, 
          },
        });

        setEvents(response.data.events || []); 
      } catch (error) {
        console.error("Error fetching joined events:", error);
      }
    };

    fetchJoinedEvents();
  }, []);

  const itemsPerPage = 6;
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const localEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = indexOfLastEvent >= events.length;
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    const totalPages = Math.ceil(events.length / itemsPerPage);

    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };

  const handleLike = async (event: Event) => {
    // Handle like logic if needed
  };

  return (
    <div className="grid grid-cols-1 mx-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="col-span-3 ">
        <Table events={localEvents} handleLike={handleLike} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: any) => setCurrentPage(page)}
          pageSize={pageSize}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
      </div>
      <div className="">
        <EventMap />
      </div>
    </div>
  );
};

export default JoinedEvents;
