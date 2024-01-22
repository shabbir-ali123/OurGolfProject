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


export const fetchSinglePosts = async (setSinglePosts:any, id:any) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.GETPOSTBYID + id;
      const headers:any= {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        endpoint = API_ENDPOINTS.GETPOSTBYID + id; 
      }
      const response = await axios.get(endpoint, {
        headers,
      });
      console.log(response);
      setSinglePosts(response.data.post);
    } catch (error) {
      throw error; 
    }
  };

  export const addPostComment = async (formData: any) => {
    try {
      const response = await axios.post(API_ENDPOINTS.ADDPOSTCOMMENT, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      throw error;
    }
  };

  