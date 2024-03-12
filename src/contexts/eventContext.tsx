import React, {  Children, useCallback, useEffect, useState } from 'react';
import { fetchCreatedEvents, fetchEventss, fetchSingleEvent } from '../utils/fetchEvents';
import { useNavigate, useParams } from 'react-router-dom';

const EventCreateContext = React.createContext<any>({});

export const EventsContext = ({children}:any)=>{
    const [eventss, setEvents] = useState<any[]>([]);
    const store_token: string = localStorage.getItem('token') || '';
    const [eventsCount, setEventsCount] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(6);
    const [locations, setLocations]=useState<any[]>([]);
    const [startDate, setStartDate]=useState<string>("");
    const [endDate, setEndDate]= useState<string>("");
    const [eventStatus, setEventStatus]= useState<string>("past");
    const navigate = useNavigate();

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
        fetchEventss(setEvents,setEventsCount, queryParams, navigate);
    }, [currentPage,pageSize, locations, startDate, endDate, eventStatus]);

    const handleEvents = useCallback((value: any) => {
        return setEvents(value);
    }, [eventss]);
    
    const handlePageChange = useCallback((value: any) => {
        setCurrentPage(value);
    },[currentPage]);

    const handlePageSize = useCallback((value: any) => {
        setPageSize(value);
    },[pageSize]);

    const handleLocationFilter = (location: any)=>{
        setLocations([location, ...locations]);
    }

    const handleStartDate = (startDate: string)=>{
        setStartDate(startDate);
    }

    const handleEndDate = (endDate: string)=>{
        setEndDate(endDate);
    }
    
    // const handleEventStatus = (status: string)=>{
    //     setEventStatus(status);
    // }
    const handleEventStatus = useCallback((value: any) => {
        setEventStatus(value);
    },[eventStatus]);
    const sortedPosts = [...eventss].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
    
        return Number(dateB) - Number(dateA);
      });
    const value =  { handleEvents,handlePageChange, handlePageSize, handleLocationFilter,handleStartDate, handleEndDate,handleEventStatus, locations, sortedPosts,eventss, eventsCount}

    return <EventCreateContext.Provider  value={value}> {children}</EventCreateContext.Provider>
}

export const eventContextStore = ()=> React.useContext(EventCreateContext);

const SingleEventContext = React.createContext<any>({});

export const SingleEventsContext = ({children}:any)=>{

    const params = useParams<{ id?: string }>();
    const eventId = params.id;

    const [singleEvent, setSingleEvent] = useState<any[]>([]);
    const [isCreated, setIsCreated] = useState<any>(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await fetchSingleEvent(eventId);
                setSingleEvent(eventData.event);
                if (eventData.event.creatorId == localStorage.getItem('id')) {
                    handleisCreated(true);
                    console.log(true);
                }
            } catch (error) {
                console.error("Error fetching single event:", error);
            }
        };

        fetchData();
    }, [eventId]);
   
    const handleSingleEvent =  useCallback( (value: any) => {
        return setSingleEvent(value);
    }, []);
    const handleisCreated =  useCallback( (value: any) => {
        return setIsCreated(value);
    }, []);
    
    const value =  { handleSingleEvent, isCreated, singleEvent}

    return <SingleEventContext.Provider  value={value}> {children}</SingleEventContext.Provider>
}

export const singleEventContextStore = ()=> React.useContext(SingleEventContext);

//context for created events 
const CreatedEventsContext = React.createContext<any>({})

export const CreatedEventContext = ({children}: any) => {
    const pageSize = 6;
    const [createdEvents, setCreatedEvents] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<any>('past');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        fetchCreatedEvents(activeTab, pageSize, currentPage, setTotalPages, setCreatedEvents)
    }, [])

    const handleActiveTab = useCallback((value: any) => {
        return setActiveTab(value);
    }, []);

    const handleCurrentPage = useCallback((currentPage: any) => {
        return setCurrentPage(currentPage);
    }, []);

    const value = {handleActiveTab, handleCurrentPage, activeTab, totalPages, currentPage, createdEvents}
    return <CreatedEventsContext.Provider  value={value}> {children}</CreatedEventsContext.Provider>

}

export const createdEventsStore = ()=> React.useContext(CreatedEventsContext);
