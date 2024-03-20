import React, { Children, useCallback, useEffect, useState } from 'react';
import { fetchCreatedEvents, fetchEventss, fetchSingleEvent } from '../utils/fetchEvents';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../appConfig';

const EventCreateContext = React.createContext<any>({});

export const EventsContext = ({ children }: any) => {
    const [eventss, setEvents] = useState<any[]>([]);
    const store_token: string = localStorage.getItem('token') || '';
    const [eventsCount, setEventsCount] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(6);
    const [locations, setLocations] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [eventStatus, setEventStatus] = useState<string>("past");
    const [clearFilter, setClearFilter] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (clearFilter) {
            setLocations([]);
            setClearFilter(false); // Reset clearFilter to avoid repeated triggers
        }
    }, [clearFilter]);
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
        fetchEventss(setEvents, setEventsCount, queryParams, navigate);
    }, [currentPage, pageSize, locations, startDate, endDate, eventStatus]);

    const handleEvents = useCallback((value: any) => {
        return setEvents(value);
    }, [eventss]);

    const handlePageChange = useCallback((value: any) => {
        setCurrentPage(value);
    }, [currentPage]);

    const handlePageSize = useCallback((value: any) => {
        setPageSize(value);
    }, [pageSize]);

    const handleLocationFilter = (location: any) => {
        setLocations([location, ...locations]);
    }

    const handleStartDate = (startDate: string) => {
        setStartDate(startDate);
    }

    const handleEndDate = (endDate: string) => {
        setEndDate(endDate);
    }

    const handleClear = useCallback((value: any) => {
        setClearFilter(value);
    }, [clearFilter]);

    const handleEventStatus = useCallback((value: any) => {
        setEventStatus(value);
    }, [eventStatus]);
    // const handleSearch = async (query:any) => {
    //     console.log(`Searching for: ${query}`); // Debugging
    //     const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    //     if (!token) {
    //         console.log("No token found in localStorage");
    //         return; // Exit if no token is found
    //     }
    //     const headers = new Headers({
    //         'Authorization': `Bearer ${token}`, // Use Bearer authentication scheme
    //         'Content-Type': 'application/json',
    //     });
    
    //     try {
    //         const response = await fetch(`${API_ENDPOINTS.SEARCH_EVENT_NAME}?name=${query}`, {
    //             method: 'GET',
    //             headers: headers,
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
    //         }
    
    //         const data = await response.json();
    //         console.log('Search results:', data); // Debugging
    
    //         if (data && data.events) {
    //             setEvents(data.events);
    //         } else {
    //             console.log('No results or error in fetching'); // Debugging
    //         }
    //     } catch (error) {
    //         console.error("Error fetching search results:", error);
    //     }
    // };
    
    const sortedPosts = [...eventss].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return Number(dateB) - Number(dateA);
    });
    const value = { handleEvents, handlePageChange, handlePageSize, handleLocationFilter, handleStartDate, handleEndDate, handleEventStatus, handleClear, clearFilter, locations, sortedPosts, eventss, eventsCount }

    return <EventCreateContext.Provider value={value}> {children}</EventCreateContext.Provider>
}

export const eventContextStore = () => React.useContext(EventCreateContext);
export interface CreateEventType {
    id?: number;
    eventType?: string;
    eventName?: string;
    files?: File[] | null;
    video?: string;
    eventDetails?: string;
    address?: string;
    eventVideoUrl?: string;
    categories?: string;
    place?: string;
    placeCoordinates?: { lat: string; lng: string };
    capacity?: number;
    selfIncluded?: boolean;
    eventStartDate?: string;
    eventStartTime?: string;
    eventEndDate?: string;
    eventEndTime?: string;
    recruitmentStartDate?: string;
    recruitmentStartTime?: string;
    eventDeadlineDate?: string;
    eventDeadlineTime?: string;
    matchType?: string;
    paymentType?: string;
    bankName?: string;
    branchName?: string;
    accountHolderName?: string;
    accountNumber?: number;
    paypalId?: string;
    teamSize?: number;
    participationFee?: number;
    isEventPublished?: boolean;
    hideParticipantName?: boolean;
    isRequiresApproval?: boolean;
    scoringType?: string;
    selectedHoles?: string[];
    shotsPerHoles?: string[];
    driverContest?: number;
    nearPinContest?: number;
}
// single event context 
const SingleEventContext = React.createContext<any>({});

export const SingleEventsContext = ({ children }: any) => {

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

    const handleSingleEvent = useCallback((value: any) => {
        return setSingleEvent(value);
    }, []);
    const handleisCreated = useCallback((value: any) => {
        return setIsCreated(value);
    }, []);

    const value = { handleSingleEvent, isCreated, singleEvent }

    return <SingleEventContext.Provider value={value}> {children}</SingleEventContext.Provider>
}

export const singleEventContextStore = () => React.useContext(SingleEventContext);

//context for created events 
const CreatedEventsContext = React.createContext<any>({})

export const CreatedEventContext = ({ children }: any) => {
    const { id } = useParams<{ id: string }>();

    const pageSize = 6;
    const [createdEvents, setCreatedEvents] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<any>('past');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1)



    useEffect(() => {
        fetchCreatedEvents(activeTab, pageSize, currentPage, setTotalPages, setCreatedEvents)
    }, [activeTab])

    const handleActiveTab = useCallback((value: any) => {
        return setActiveTab(value);
    }, []);

    const handleCurrentPage = useCallback((currentPage: any) => {
        return setCurrentPage(currentPage);
    }, []);


    const updateEvent = createdEvents.find((event: CreateEventType) => event.id == id);
    console.log(updateEvent?.eventName, "xasdf")


    const value = { handleActiveTab, handleCurrentPage, id, activeTab, totalPages, currentPage, createdEvents, updateEvent }
    return <CreatedEventsContext.Provider value={value}> {children}</CreatedEventsContext.Provider>

}

export const createdEventsStore = () => React.useContext(CreatedEventsContext);
