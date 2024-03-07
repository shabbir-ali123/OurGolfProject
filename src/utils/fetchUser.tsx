import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export  const getUser = async ( setUser: any, navigate:any) => {
    try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        const response = await axios.get(`${API_ENDPOINTS.GET_USER}${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem( "nickName", response.data.nickName)
        setUser(response.data.user)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate('/login-page'); 
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
