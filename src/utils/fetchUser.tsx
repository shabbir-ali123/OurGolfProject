import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export  const getUser = async ( setUser: any, navigate:any) => {
    try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        const response = await axios.get(`${API_ENDPOINTS.GET_USER}${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem( "nickName", response.data.nickName)
        setUser(response.data.user)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.removeItem('token');
          localStorage.removeItem('tokenTimestamp');
          localStorage.removeItem('nickName');
          localStorage.removeItem('teacher_id');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('score');
          localStorage.removeItem('par');
        toast.error("Session expired. Please log in again.");
        navigate('/login-page'); 
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
};
export const updateUser = async (formData:any, setUser:any) => {
    const userToken = localStorage.getItem("token");

    console.log(formData, "updd")
    try {
      const formDataToSend = new FormData();

      console.log(formData.imageUrl);
      formDataToSend.append("nickName", formData.nickName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("imageUrl", formData.imageUrl?.[0]);
   
      console.log("FormData:", formDataToSend);
      const response = await axios.put(
        API_ENDPOINTS.UPDATEUSERPROFILE + formData.userId,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data.user);
    } catch (error: unknown) {}
};