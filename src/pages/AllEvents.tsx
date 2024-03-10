import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import Pagination from "../components/Pagination";
import EventMap from "../components/EventMap";
import Table from "../components/Table";
import { eventContextStore } from "../contexts/eventContext";

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

interface AllEventsProps {
  events: Event[];
  setEvents: any;
  status?: any;
}

const AllEvents: React.FC<AllEventsProps> = ({
  events, 
  setEvents,
  status
}: AllEventsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const pageSize = 6;
  const itemsPerPage = 6;

  useEffect(() => {
    // Set localEvents to all events
    setLocalEvents(events);
  }, [events, currentPage]);

  // Pagination logic
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = localEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const { eventsCount, handlePageChange, handlePageSize, handleEventStatus } = eventContextStore();
  const totalPages = Math.ceil(eventsCount / 6); 
  const onPageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber); 
    handlePageChange(pageNumber); 
  };

  useEffect(() => {
    handleEventStatus('All');
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="col-span-1 lg:col-span-3">
        <Table events={currentEvents} {...status} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          pageSize={pageSize}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage === totalPages}
        />
      </div>
      <div className="col-span-1">
        <EventMap />
      </div>
    </div>
  );
};

export default AllEvents;
