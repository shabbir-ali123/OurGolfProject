import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchNotifications = async (
  setNotificationData: any,
  setIsLoading: any
) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const headers: any = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(API_ENDPOINTS.GET_NOTIFICATION, {
      headers,
      params:{
        organizerId:userId
      }
    });
    setNotificationData(response.data.notifications);
  } catch (error) {
    console.log(error) 
  } finally {
    setIsLoading(false);
  }
};
