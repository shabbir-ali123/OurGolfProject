import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export const fetchTeacherCounts = async (setAppointsCount:any) => {
    try {
      const token = localStorage.getItem("token");
      const headers:any= {}
      let endpoint = API_ENDPOINTS.GETTEACHERAPPPOINTMENTPUBLICCOUNT;

      if (token && token !== null)  {
        headers["Authorization"] = `Bearer ${token}`;
        endpoint = API_ENDPOINTS.GETTEACHERAPPPOINTMENTCOUNT;  
      }
      
      const response = await axios.get(endpoint, {
        headers,
      });
      console.log(response.data);
      setAppointsCount(response.data);
    } catch (error) {
      throw error; 
    }
  };