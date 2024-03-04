import axios from "axios";
import { formatDate } from "./getStartedDate";
import { API_ENDPOINTS } from "../appConfig";

export const fetchEvents = async ( startDate:any, endDate:any,setEvents:any,  location?:any, status?:any) => {
  try {
    const token = localStorage.getItem("token");
    const headers:any= {}
    if (token) {
      headers["Authorization"]=  `Bearer ${token}`
    }
    const response = await axios.get(token && token !== "undefined" ? API_ENDPOINTS.GETALLEVENT: API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      params: {
        page: 1,
        pageSize: 50000,
        eventStartDate: startDate ? formatDate(startDate) : "",
        eventEndDate: endDate ? formatDate(endDate) : "",
        status: status,
        place: location
      },
    });
    setEvents(response.data.events);
  } catch (error) {
    throw error; 
  }
};

export const fetchEventss = async (setEvents:any, setEventsCount:any, queryParams:any) => {
  const { store_token,currentPage, locations, startDate, endDate,pageSize, eventStatus} = queryParams;
  try {
    const headers:any= {}
    if (store_token) {
      headers["Authorization"]=  `Bearer ${store_token}`
    }
    const response = await axios.get(store_token && store_token !== "undefined" ? API_ENDPOINTS.GETALLEVENT: API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      params: {
        page: currentPage,
        pageSize: pageSize,
        eventStartDate: startDate ? formatDate(startDate) : "",
        eventEndDate: endDate ? formatDate(endDate) : "",
        status: eventStatus,
        place: locations[0]
      },
    });
    console.log(locations[0], 'loca')
    setEvents(response.data.events);
    setEventsCount(response.data.count)
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

export const fetchSingleEvent = async (eventId: any) => {
  try {
      const token = localStorage.getItem("token");
      const headers: any = {};
      if (token) {
          headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(
          token && token !== "undefined"
              ? API_ENDPOINTS.GETEVENTBYID + eventId
              : API_ENDPOINTS.GETPUBLICEVENTBYID + eventId,
          {
              headers,
          }
      );

      return response.data;
  } catch (error) {
      console.error("Error fetching single event:", error);
      throw error; // Rethrow the error to handle it in the component
  }
};
