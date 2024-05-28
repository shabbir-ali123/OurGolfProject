import React, { useCallback, useEffect, useState } from "react";
import { fetchGigsById } from "../utils/fetchGigs";
import { useTeacherContext } from "./teachersContext";
import { useParams } from "react-router-dom";

const TeacherGigsContext = React.createContext<any>({});

export const TeacherGigsProvider = ({ children }: any) => {
    const params = useParams<{ id?: string }>();
    const teacherId = params.id;
    

    const [TeacherId, setTeacherId] = useState<any>(null);
    const [gigs, setGigs] = useState<any[]>([]);

    useEffect(() => {

            fetchGigsById(setGigs, teacherId)
        
        if(TeacherId !== null && TeacherId !== undefined){
            fetchGigsById(setGigs, TeacherId)

        }
    }, [TeacherId, teacherId]);

    const handleTeacherId = useCallback(
        (value: any) => {
          return setTeacherId(value);
        },
        [TeacherId]
      );
    const value = { gigs, handleTeacherId }

    console.log(gigs, 'cd')
    return <TeacherGigsContext.Provider value={value}> {children}</TeacherGigsContext.Provider>
}

export const gigsContextStore = () => React.useContext(TeacherGigsContext);
