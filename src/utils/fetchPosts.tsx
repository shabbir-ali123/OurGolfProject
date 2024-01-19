import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export const fetchPosts = async (setPosts:any) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.GETPUBLICPOSTS;
      const headers:any= {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        endpoint = API_ENDPOINTS.GETPOSTS;  // Use private endpoint if token exists
      }
      const response = await axios.get(endpoint, {
        headers,
        // Uncomment and adjust params as needed for pagination or filtering
        // params: {
        //   page: 1,
        //   pageSize: 20,
        // },
      });
      console.log(response);
      setPosts(response.data.posts);
    } catch (error) {
      throw error; 
    }
  };