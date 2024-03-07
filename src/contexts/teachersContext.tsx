import React, {  useCallback, useEffect, useState } from 'react';
import { getUser } from '../utils/fetchUser';
import { fetchTeacherss } from '../utils/fetchTeacher';


const TeachersContext = React.createContext<any>({});

export const TeacherContext = ({children}:any)=>{
    const [teachers, setTeachers] = useState<any[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

    useEffect(() => {
        fetchTeacherss(setTeachers, setSelectedTeacher);
    }, []);

    const value =  {teachers, selectedTeacher}

    return <TeachersContext.Provider  value={value}> {children} </TeachersContext.Provider>
}

export const teacherContext = ()=> React.useContext(TeachersContext);

