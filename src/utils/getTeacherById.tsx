import axios from 'axios';
import { API_ENDPOINTS } from '../appConfig';

export const getTeacherById = async (teacherId:any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_ENDPOINTS.GETTEACHERBYID}/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if ('error' in response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching teacher details:');
    return null;
  }
};
