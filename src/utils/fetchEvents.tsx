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
    const response = await axios.get(token ? API_ENDPOINTS.GETALLEVENT: API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      params: {
        page: 1,
        pageSize: 50000,
        eventStartDate: startDate ? formatDate(startDate) : "",
        eventEndDate: endDate ? formatDate(endDate) : "",
      },
    });

    console.log(response.data.events); 
    setEvents(response.data.events);

  } catch (error) {
    throw error; 
  }
};
