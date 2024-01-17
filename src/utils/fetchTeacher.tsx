import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export const fetchTeacherCounts = async (setAppointsCount:any) => {
    try {
      const token = localStorage.getItem("token");
      const headers:any= {}
      if (token) {
        headers["Authorization"]=  `Bearer ${token}`
      }
      const response = await axios.get(API_ENDPOINTS.GETTEACHERAPPPOINTMENTCOUNT, {
        headers,
      });
      console.log(response.data);
      setAppointsCount(response.data);
    } catch (error) {
      throw error; 
    }
  };