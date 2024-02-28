import React, {  useCallback, useEffect, useState } from 'react';
import { fetchEventss } from '../utils/fetchEvents';

const EventCreateContext = React.createContext<any>({});

export const EventsContext = ({children}:any)=>{
    const [eventss, setEvents] = useState<any[]>([]);
    const store_token: string = localStorage.getItem('token') || '';
    const [eventsCount, setEventsCount] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [locations, setLocations]=useState<any[]>([]);
    const [startDate, setStartDate]=useState<string>("");
    const [endDate, setEndDate]= useState<string>("");
    const [eventStatus, setEventStatus]= useState<string>("past");

    useEffect(() => {
        const queryParams = {
            store_token,
            currentPage,
            pageSize,
            locations: locations,
            startDate: startDate,
            endDate: endDate,
            eventStatus: eventStatus
        };
        fetchEventss(setEvents,setEventsCount, queryParams);
    }, [currentPage, locations, startDate, endDate, eventStatus, eventStatus]);

    const handleEvents = useCallback((value: any) => {
        return setEvents(value);
    }, [eventss]);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    };

    const handleLocationFilter = (location: any)=>{
        setLocations([location, ...locations]);
    }

    const handleStartDate = (startDate: string)=>{
        setStartDate(startDate);
    }

    const handleEndDate = (endDate: string)=>{
        setEndDate(endDate);
    }
    
    const handleEventStatus = (status: string)=>{
        setEventStatus(status);
    }

    const value =  { handleEvents,handlePageChange, handlePageSize, handleLocationFilter,handleStartDate, handleEndDate,handleEventStatus, locations, eventss, eventsCount}

    return <EventCreateContext.Provider  value={value}> {children}</EventCreateContext.Provider>
}

export const eventContextStore = ()=> React.useContext(EventCreateContext);

