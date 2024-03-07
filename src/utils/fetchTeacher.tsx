import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchTeacherCounts = async (setAppointsCount:any) => {
    try {
      const token = localStorage.getItem("token");
      const headers:any= {}
      let endpoint = API_ENDPOINTS.GETTEACHERAPPPOINTMENTPUBLICCOUNT;

      if (token && token !== null)  {
        headers["Authorization"] = `Bearer ${token}`;
        endpoint = API_ENDPOINTS.GETTEACHERAPPPOINTMENTCOUNT;  
      }
      
      const response = await axios.get(endpoint, {
        headers,
      });
      console.log(response.data);
      setAppointsCount(response.data);
    } catch (error) {
      throw error; 
    }
  };
  export  const fetchTeachers = async (search:any, locationInput:any, availibilty:any, setTeachers:any,setSelectedTeacher:any, setLoading:any) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;
      if (token && token !== "undefined") {
        endpoint = API_ENDPOINTS.GETALLTEACHERS;
      }

      const response = await axios.get(endpoint, {
        headers: token
          ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
          : {},
        params: {
          page: 1,
          pageSize: 20,
          search: search,
          location: locationInput,
          availability: availibilty,
        },
      });

      setTeachers(response.data.teachers);

      if (response.data.teachers && response.data.teachers.length > 0) {
        setSelectedTeacher(response.data.teachers[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setLoading(false);
    }
  };

  export const fetchTeacherss = async (setTeachers: any, setSelectedTeacher: any, setSchedules:any) => {
    try {
      const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETALLTEACHERS;
    }
    const response = await axios.get(endpoint, {
      headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: {
          page: 1,
          pageSize: 20,
        },
      });

      if (response.data && response.data.teachers) {
        setTeachers(response.data.teachers);
        if (response.data.teachers.length > 0) {
          setSelectedTeacher(response.data.teachers[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error('Error fetching teachers');
    }
  }

 export const toggleFavoriteStatus = async (teacher: any, setTeachers:any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_ENDPOINTS.FAVORITETEACHER,
        { teacherId: teacher.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTeachers((prevTeachers:any) =>
        prevTeachers.map((t:any) =>
          t.id === teacher.id ? { ...t, isFavorite: !t.isFavorite } : t
        )
      );
      toast.success(response.data.message)
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };
  export  const fetchFavoriteTeachers = async (setFavoriteTeachers:any) => {
    try {
      const token = localStorage.getItem("token");
   if(token && token !== "undefined"){
    const userId= localStorage.getItem("id");
    const response = await axios.get(API_ENDPOINTS.GETFAVORITETEACHER, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        userId: userId,
      },
    });
    if (response.status === 200) {
      setFavoriteTeachers(response.data.favoriteTeachers);
    } else {
      return "get error";
    }
   }
    } catch (error: any) {
      console.error("Error fetching favorite teachers:", error.message);
    }
  };