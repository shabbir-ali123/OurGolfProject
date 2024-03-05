import React, {  useCallback, useEffect, useState } from 'react';
import { getAllScores, getScoreById, postScores } from '../utils/getAllScores';


const ScoresContext = React.createContext<any>({});

export const ScoreContext = ({children}:any)=>{
    const [score, setScore] = useState<any>();
    const [eventId, setEventId] = useState<any>(2)
    const [eventScore, setEventScore] = useState<any>()

    useEffect(() => {
        getAllScores(setScore);
    }, [score]);

    useEffect(() => {
        getScoreById(setEventScore, eventId);
    }, [eventScore]);

    const handleScore = useCallback((score: any) => {
        postScores(score);
    },[score]);

    const handleEventId = useCallback((eventId: any) => {
        setEventId(eventId);
    },[score]);

    const value =  {handleScore, handleEventId, score}

    return <ScoresContext.Provider  value={value}> {children}</ScoresContext.Provider>
}

export const scoreContext = ()=> React.useContext(ScoresContext);

