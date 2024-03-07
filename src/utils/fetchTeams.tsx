import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchTeams = async (setTeams: any, eventId: any, setTeamMembers: any, setTotalJoinedMembers:any) => {
    try {
        const token = localStorage.getItem("token");
        let letUrl = API_ENDPOINTS.GETPUBLICTEAMSBYEVENT+ eventId;
        
        if(token){
            letUrl = API_ENDPOINTS.GETTEAMSBYEVENT+ eventId;
        }else{
        }

        const response = await fetch(letUrl, {
            headers: {
                Authorization: `Bearer ${token}`,

            },
        });
        const data = await response.json();
        setTeams(data.teams);
        setTotalJoinedMembers(data.totalJoinedMembers);
        setTeamMembers(data.teams.map((team: any) => team.members))
        

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
          } else {
            toast.error("An error occurred. Please try again.");
          }
    }
};
export const fetchTeam = async (teamId: any) => {
    try {
        const token = localStorage.getItem("token");
        const headers: any = {};
        let url = API_ENDPOINTS.GETPUBLICTEAMSBYEVENT + teamId
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
            url = API_ENDPOINTS.GETTEAMSBYEVENT + teamId
        }
        const response = await axios.get( url ,
            {
                headers
            }
        );

        return response.data;
        

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
          } else {
            toast.error("An error occurred. Please try again.");
          }
    }
};
export const updateTeams = async (event: any, selectedUserId: any, selectedTeamId: any) => {
    event.preventDefault();

    const uId = selectedUserId.toString();
    const formDataObj = {

        userId: uId,
        teamId: selectedTeamId,
    };
    try {
        const response = await axios.put(API_ENDPOINTS.UPDATETEAMMEMBER,
            JSON.stringify(formDataObj),
            {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        toast.success(response.data.message);

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
          } else {
            toast.error("An error occurred. Please try again.");
          }
    }
};