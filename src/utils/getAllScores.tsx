import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const getAllScores = async ( setScore: any) => {
    try {
        const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        const response = await axios.get(`${API_ENDPOINTS.GETALLSCORE}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setScore(response.data.user)
      }
    } catch (error) {
      throw console.log(error);
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
        setEventScore(response.data.user)
      }
    } catch (error) {
      throw console.log(error);
    }
  };

  export const postScores = async (score: any,) => {
    console.log(score, 'score')
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