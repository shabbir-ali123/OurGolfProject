import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

const fetchUserCreatedEvents = async () => {
    try {
      const userId = 123; 
      const response = await axios.get(`${API_ENDPOINTS.GETEVENTSBYID}/${userId}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user created events:', error);
      throw error;
    }
};
