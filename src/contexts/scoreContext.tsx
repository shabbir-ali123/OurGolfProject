import React, {  useCallback, useEffect, useState } from 'react';
import { getAllScores, getScoreById, postScores } from '../utils/getAllScores';
import { useParams } from 'react-router-dom';
import { singleEventContextStore } from './eventContext';


const ScoresContext = React.createContext<any>({});

export const ScoreContextProvider = ({children}:any)=>{
  

    const [score, setScore] = useState<any>();
    const [eventScore, setEventScore] = useState<any>()
    const [eventId, setEventId] = useState<any>()

    useEffect(() => {
        const fetchScores = async () => {
            await getAllScores(setScore);
        };
        fetchScores();    
    }, [score]);

    useEffect( () => {
        const fetchEventScore = async () => {
               if(eventId){
                await getScoreById(setEventScore, eventId);
               }
            
        };
        fetchEventScore();
    }, [ eventId ]);

    const handleScore = useCallback((score: any) => {
        postScores(score);
    },[score]);

    const handleEventId = useCallback((eventId: any) => {
        setEventId(eventId);
    },[]);

    const value =  {handleScore,handleEventId, score, eventScore}

    return <ScoresContext.Provider  value={value}> {children}</ScoresContext.Provider>
}

export const useScoreContext = ()=> React.useContext(ScoresContext);

