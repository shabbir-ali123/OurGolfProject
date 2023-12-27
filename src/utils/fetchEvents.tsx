import axios from "axios";
import { formatDate } from "./getStartedDate";
import { API_ENDPOINTS } from "../appConfig";

export const fetchEvents = async (startDate:any, endDate:any, setEvents:any) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    const response = await axios.get(API_ENDPOINTS.GETALLEVENT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    throw error; // Throw the error to handle it in the calling code
  }
};
