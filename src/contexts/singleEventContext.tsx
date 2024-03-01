import React, {  useCallback, useEffect, useState } from 'react';
import {  fetchSingleEvent } from '../utils/fetchEvents';

const SingleEventContext = React.createContext<any>({});

export const SingleEventsContext = ({children}:any)=>{
    const [event, setEvent] = useState<any[]>([]);
    const [eventId, setEventId] = useState<any>(1)
    const [isCreated, setIsCreated] = useState<any>(false)

    useEffect(() => {
        fetchSingleEvent(eventId, setEvent, setIsCreated);
    }, []);

    const handleEventId = useCallback((value: any) => {
        return setEventId(value);
    }, [eventId]);

    const value =  { handleEventId, isCreated, event}

    return <SingleEventContext.Provider  value={value}> {children}</SingleEventContext.Provider>
}

export const singleEventContextStore = ()=> React.useContext(SingleEventContext);

