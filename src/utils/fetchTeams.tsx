import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchTeams = async (setTeams: any,  eventId: any, setTeamMembers: any, setTotalJoinedMembers:any) => {
    try {

        const response = await fetch(API_ENDPOINTS.GETTEAMSBYEVENT + eventId, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
        });
        const data = await response.json();
        setTeams(data.teams);
        setTotalJoinedMembers(data.totalJoinedMembers);
        setTeamMembers(data.teams.map((team: any) => team.members))
        // setMembers(data.teams.members);

    } catch (error) {
        console.error("Error fetching teams:", error);
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
            JSON.stringify(formDataObj), // Convert the object to JSON string
            {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to application/json
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        toast.success(response.data.message);

    } catch (error) {
        console.error("Error fetching teams:", error);
    }
};