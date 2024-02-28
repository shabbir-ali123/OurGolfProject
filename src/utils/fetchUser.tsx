import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export  const getUser = async ( setUser: any) => {
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
        setUser(response.data)
      }
    } catch (error) {
      throw "sdf";
    }
  };
