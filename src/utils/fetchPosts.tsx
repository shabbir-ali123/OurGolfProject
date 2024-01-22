import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export const fetchPosts = async (setPosts:any, category:any) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.GETPUBLICPOSTS;
      const headers:any= {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        endpoint = API_ENDPOINTS.GETPOSTS; 
      }
      const response = await axios.get(endpoint, {
        headers,
        params: { category }, 
      });
      console.log(response);
      setPosts(response.data.posts);
    } catch (error) {
      throw error; 
    }
  };