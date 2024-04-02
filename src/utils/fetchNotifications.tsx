import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchNotifications = async (
  setNotificationData: any,
  setIsLoading: any
) => {
  try {
    const token = localStorage.getItem("token");
    const headers: any = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(API_ENDPOINTS.GET_NOTIFICATION, {
      headers,
    });
    setNotificationData(response.data.notifications);
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      toast.error("error");
    } else {
      toast.error("error");
    }
  } finally {
    setIsLoading(false);
  }
};
