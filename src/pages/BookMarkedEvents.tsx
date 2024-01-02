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

const BookMarkedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("User not authenticated");
          return;
        }

        const response = await axios.get(API_ENDPOINTS.GETFAVEVENTS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 1,
            pageSize: 50000, // Update with your desired pageSize
          },
        });

        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching favorite events:", error);
      }
    };

    fetchFavoriteEvents();
  }, []);

  // Pagination logic
  const itemsPerPage = 6;
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const localEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = indexOfLastEvent >= events.length;
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    const totalPages = Math.ceil(events.length / itemsPerPage);
    // Ensure the new page number is within the valid range
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };

  // Function to handle like button click
  const handleLike = async (event: Event) => {
    // Your existing handleLike logic
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

export default BookMarkedEvents;
