import axios from 'axios';
import { API_ENDPOINTS } from '../appConfig';
import { toast } from 'react-toastify';


export const getEventFee = async (setFee: any) => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.GETEVENTPAYMENT,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setFee(response.data.fee);
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }
};
export const getTeacherFee = async (setFee: any) => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.GETTEACHERPAYMENT,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setFee(response.data.fee);
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }
};

