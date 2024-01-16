import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export const fetchPosts = async (setPosts:any) => {
    try {
      const token = localStorage.getItem("token");
      const headers:any= {}
      if (token) {
        headers["Authorization"]=  `Bearer ${token}`
      }
      const response = await axios.get(API_ENDPOINTS.GETPOSTS, {
        headers,
        // params: {
        //   page: 1,
        //   pageSize: 50000,
        // },
      });
      console.log(response);
      setPosts(response.data.posts);
    } catch (error) {
      throw error; 
    }
  };