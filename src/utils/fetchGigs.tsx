import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchGigsById = async (setGigs: any, tId: any) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICGIGSBYID + tId;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETGIGSBYID + tId;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });

    setGigs(response.data)
  } catch (error) {
    console.log(error);
  }
};
export const deleteGig = async (setLoading: any, gigId: any) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.DELETEGIGBYID;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.DELETEGIGBYID + gigId;
    }
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });
    if (response.status === 200) {
      toast.success(response.data.message);
      window.location.reload()

    } else {
      toast.error(response.data.error);
    }
    setLoading(response.data)
  } catch (error) {
    console.log(error);
  }
};