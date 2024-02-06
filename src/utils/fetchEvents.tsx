import axios from "axios";
import { formatDate } from "./getStartedDate";
import { API_ENDPOINTS } from "../appConfig";

export const fetchEvents = async (startDate:any, endDate:any, setEvents:any) => {
  try {
    const token = localStorage.getItem("token");
    const headers:any= {}
    if (token) {
      console.error("User not authenticated");
      headers["Authorization"]=  `Bearer ${token}`

    }
    const response = await axios.get(token && token !== "undefined" ? API_ENDPOINTS.GETALLEVENT: API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      params: {
        page: 1,
        pageSize: 50000,
        eventStartDate: startDate ? formatDate(startDate) : "",
        eventEndDate: endDate ? formatDate(endDate) : "",
      },
    });
    setEvents(response.data.events);
  } catch (error) {
    throw error; 
  }
};

export const fetchUser = async (setUser:any) => {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const headers:any= {}
    if (token) {
      console.error("User not authenticated");
      headers["Authorization"]=  `Bearer ${token}`

    }
    const response = await axios.get(token ? API_ENDPOINTS.GET_USER+ id : API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      
    });
    setUser(response.data.user);

  } catch (error) {
    throw error; 
  }
};

export const fetchTeacherByID = async (setUser:any) => {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const teacher_id = localStorage.getItem("teacher_id");

    const headers:any= {}
    if (token) {
      console.error("User not authenticated");
      headers["Authorization"]=  `Bearer ${token}`

    }
    const response = await axios.get(token ? API_ENDPOINTS.GETTEACHERBYID + teacher_id : API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      
    });
    setUser(response.data.teacher);
    console.log(response.data.events); 

  } catch (error) {
    throw error; 
  }
};

export const fetchSingleEvent = async (eventId:any, setEvent:any, setCreatedBy?:any) => {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const headers:any= {}
    if (token) {
      console.error("User not authenticated");
      headers["Authorization"]=  `Bearer ${token}`

    }
    const response = await axios.get(token && token !== "undefined" ? API_ENDPOINTS.GETEVENTBYID + eventId : API_ENDPOINTS.GETPUBLICEVENTBYID + eventId, {
      headers,
     
    });
    setEvent(response.data.event);
    if(response.data.event.creatorId == id){
      setCreatedBy(true);
    }
  } catch (error) {
    return
  }
};