import axios from "axios";
import { formatDate } from "./getStartedDate";
import { API_ENDPOINTS } from "../appConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.removeItem('token');
          localStorage.removeItem('tokenTimestamp');
          localStorage.removeItem('nickName');
          localStorage.removeItem('teacher_id');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('score');
          localStorage.removeItem('par');
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

export const fetchEventss = async (setEvents:any, setEventsCount:any, queryParams:any, navigate:any) => {

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

  // Check for 401 status code right after receiving the response
  if (response.status === 401) {
    // Handle 401 Unauthorized error
    console.error("Unauthorized access - 401 error");
    // Optionally, you can perform actions like redirecting to a login page or displaying an error message
    return;
  }    setEvents(response.data.events);
    setEventsCount(response.data.count)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.removeItem('token');
          localStorage.removeItem('tokenTimestamp');
          localStorage.removeItem('nickName');
          localStorage.removeItem('teacher_id');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('score');
          localStorage.removeItem('par');
      toast.error("Session expired. Please log in again.");
      navigate('/login-page'); 
    } else {
      toast.error("An error occurred. Please try again.");
    }
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
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.removeItem('token');
          localStorage.removeItem('tokenTimestamp');
          localStorage.removeItem('nickName');
          localStorage.removeItem('teacher_id');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('score');
          localStorage.removeItem('par');
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
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
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.removeItem('token');
          localStorage.removeItem('tokenTimestamp');
          localStorage.removeItem('nickName');
          localStorage.removeItem('teacher_id');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('score');
          localStorage.removeItem('par');
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};
