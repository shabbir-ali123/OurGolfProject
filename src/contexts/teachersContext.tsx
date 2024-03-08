import React, {  useCallback, useEffect, useState } from 'react';
import { getUser } from '../utils/fetchUser';
import { fetchTeacherss } from '../utils/fetchTeacher';


const TeachersContext = React.createContext<any>({});

export const TeacherContext = ({children}:any)=>{
    const [teachers, setTeachers] = useState<any[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [schedules, setSchedules] = useState<any[]>([]);
    const [shift, setShift] = useState<any>()

    useEffect(() => {
        fetchTeacherss(handleTeachers, setSelectedTeacher, handleSchedules);
    }, []);

    const handleTeachers = useCallback((value: any) => {
        setTeachers(value);
    },[teachers]);

    const handleSchedules = useCallback((value: any) => {
        setTeachers(value);
    },[schedules]);

    const handleShift = useCallback((value: any) => {
        setShift(value);
    },[shift]);

    const value =  {handleSchedules, handleShift, schedules, teachers, selectedTeacher}

    return <TeachersContext.Provider  value={value}> {children} </TeachersContext.Provider>
}

export const teacherContext = ()=> React.useContext(TeachersContext);

