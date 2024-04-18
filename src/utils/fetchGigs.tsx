import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export const fetchGigsById = async ( setGigs: any, tId: any) => {
 
    try {
      const token = localStorage.getItem("token");
        let endpoint = API_ENDPOINTS.GETPUBLICGIGSBYID + tId;
        if (token && token !== "undefined") {
            endpoint = API_ENDPOINTS.GETGIGSBYID + tId;
        }
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
           
        });
      
      if (response.status === 201) {
        setGigs(response.data)  
      } 
    } catch (error) {
      console.log(error);
    }
  };