import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const getAllScores = async ( setScore: any,setLoading:any, navigate:any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETALLSCOREPUBLIC;
    const headers: any = {}
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETALLSCORE;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    
    });
    setScore(response.data)
  }
   catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
        navigate('/login-page'); 
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }finally{
      setLoading(false);
    }
  };

export const getScoreById = async ( setEventScore: any, eventId: any ) => {
    try {
        const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        const response = await axios.get(`${API_ENDPOINTS.GETSCOREBYEVENTID}${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventScore(response.data)
      }
    } catch (error) {
      throw console.log(error);
    }
  };

  export const postScores = async (score: any,) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_ENDPOINTS.ADDSCORE,
        score,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
        toast.success(response.data.message)
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };