import React, {  useCallback, useEffect, useState } from 'react';
import { fetchSingleTeacher, fetchTeacherss } from '../utils/fetchTeacher';
import { useParams } from 'react-router-dom';


const TeachersContext = React.createContext<any>({});

export const TeacherContext = ({children}:any)=>{
    const [teachers, setTeachers] = useState<any[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [schedules, setSchedules] = useState<any[]>([]);
    const [shift, setShift] = useState<any>([])
    const [teacherData, setTeacherData] = useState({
        availability: true,
        rating: null,
        subjects: [],
        locationSearch: '',
        nameSearch: ''
    });

    useEffect(() => {
        fetchTeacherss(handleTeachers, setSelectedTeacher, handleSchedules, teacherData);
    }, [teacherData]);

    const handleTeachers = useCallback((value: any) => {
        setTeachers(value);
    },[teachers]);

    const handleSchedules = useCallback((value: any) => {
        setTeachers(value);
    },[schedules]);

    const handleShift = useCallback((value: any) => {
        setShift(value);
    },[shift]);

    const handleAvailability = useCallback((value: any) => {
        setTeacherData(prevData => ({
            ...prevData,
            availability: value,
        }));
    },[teacherData]);

    const handleRating = useCallback((value: any) => {
        setTeacherData(prevData => ({
            ...prevData,
            rating: value,
        }));
    },[teacherData]);

    const handleSubjects = useCallback((value: any) => {
        setTeacherData(prevData => ({
            ...prevData,
            subjects: value,
        }));
    },[teacherData]);

    const handleLocationSearch = useCallback((value: any) => {
        setTeacherData(prevData => ({
            ...prevData,
            locationSearch: value,
        }));
    },[teacherData]);

    const handleNameSearch = useCallback((value: any) => {
        setTeacherData(prevData => ({
            ...prevData,
            nameSearch: value,
        }));
    },[teacherData]);

    const value =  {handleSchedules, handleShift, handleAvailability, handleRating, handleSubjects, handleLocationSearch, handleNameSearch, shift, schedules, teachers, selectedTeacher}

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