import React, { useCallback, useEffect, useState } from "react";
import { fetchGigsById } from "../utils/fetchGigs";
import { useTeacherContext } from "./teachersContext";
import { useParams } from "react-router-dom";

const TeacherGigsContext = React.createContext<any>({});

export const TeacherGigsProvider = ({ children }: any) => {
    const params = useParams<{ id?: string }>();
    const teacherId = params.id;
    
    const [gigs, setGigs] = useState<any[]>([]);

    useEffect(() => {
        fetchGigsById(setGigs, teacherId)
    }, []);

    const value = { gigs }

    console.log(gigs, 'cd')
    return <TeacherGigsContext.Provider value={value}> {children}</TeacherGigsContext.Provider>
}

export const gigsContextStore = () => React.useContext(TeacherGigsContext);
