import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchPosts = async (setPosts: any, category: any, navigate:any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICPOSTS;
    const headers: any = {}
    if (token && token !== "undefined") {
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
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.removeItem('token');
          localStorage.clear();
      toast.error("Session expired. Please log in again.");
      navigate('/login-page');
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};
export const fetchMyPosts = async (setPosts: any, navigate:any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETMYPOSTS;
    const headers: any = {}
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETMYPOSTS;
    }
    const response = await axios.get(endpoint, {
      headers,
    });
    setPosts(response.data.posts);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
      navigate('/login-page');
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};
export const fetchAllPosts = async (setPosts: any,category:any, navigate:any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICPOSTS;
    const headers: any = {}
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETALLPOSTS;
    }
    const response = await axios.get(endpoint, {
      headers,
      params: { category },
    });
    setPosts(response.data.posts);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
      navigate('/login-page');
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

export const fetchSinglePosts = async (setSinglePosts: any, id: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPOSTBYID + id;
    const headers: any = {}
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


export const deletePost = async (postId: any, navigate: any) => {
  try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.DELETEPOST + postId;
      const headers: any = {};
      if (token && token !== "undefined") {
          headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.delete(endpoint, { headers });
      console.log(response);
      // Handle the response, e.g., remove the post from the state or notify the user
  } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          navigate('/login-page');
      } else {
          toast.error("An error occurred. Please try again.");
      }
  }
};
