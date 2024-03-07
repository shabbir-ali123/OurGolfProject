import React, {  useCallback, useEffect, useState } from 'react';
import { getUser } from '../utils/fetchUser';
import { fetchSingleTeacher, fetchTeacherss } from '../utils/fetchTeacher';
import { useParams } from 'react-router-dom';


const TeachersContext = React.createContext<any>({});

export const TeacherContext = ({children}:any)=>{
    const [teachers, setTeachers] = useState<any[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [schedules, setSchedules] = useState<any[]>([]);

    useEffect(() => {
        fetchTeacherss(handleTeachers, setSelectedTeacher, handleSchedules);
    }, []);

    const handleTeachers = useCallback((value: any) => {
        setTeachers(value);
    },[teachers]);

    const handleSchedules = useCallback((value: any) => {
        setTeachers(value);
    },[schedules]);








    const value =  {handleSchedules, schedules, teachers, selectedTeacher}

    return <TeachersContext.Provider  value={value}> {children} </TeachersContext.Provider>
}

export const teacherContext = ()=> React.useContext(TeachersContext);

const SingleTeacherContext = React.createContext<any>({});

export const TeacherDetailsContext = ({children}:any)=>{
    const params = useParams<{ id?: string }>();
    const teacherId = params.id;
    const [teacher, setTeacher] = useState<any[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [schedules, setSchedules] = useState<any[]>([]);

    useEffect(() => {
        fetchSingleTeacher(handleTeacher, teacherId);
    }, [teacherId]);

    const handleTeacher = useCallback((value: any) => {
        setTeacher(value);
    },[teacher]);

    const handleSchedules = useCallback((value: any) => {
        setTeacher(value);
    },[schedules]);

    const value =  {handleSchedules, schedules, teacher, selectedTeacher}

    return <SingleTeacherContext.Provider  value={value}> {children} </SingleTeacherContext.Provider>
}

export const useTeacherContext = ()=> React.useContext(SingleTeacherContext);