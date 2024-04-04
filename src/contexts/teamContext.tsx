import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllMembers, fetchTeam } from "../utils/fetchTeams";

const SingleTeamContext = React.createContext<any>({});

export const SingleTeamsContext = ({children}:any)=>{

    const params = useParams<{ id?: string }>();
    const teamId = params.id;
    const [teams, setTeams] = useState<any[]>([]);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [waitingUsers, setWaitingUsers] = useState<any>(null);
    const [joinedUsers, setJoinedUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [members, setMembers] =  useState(); 
    const [totalJoinedMembers, setTotalJoinedMembers] = useState<any>(false);
    const id = localStorage.getItem('id');


    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const teamData = await fetchAllMembers(teamId);
                

                setWaitingUsers(teamData.waitingUsers);
                setJoinedUsers(teamData.joinedUsers);
                setTotalJoinedMembers(teamData.waitingCount + teamData.joinedCount)
            } catch (error) {
                console.error("Error fetching single event:", error);
            }
        };

        fetchMembers();

        const fetchData = async () => {
            try {
                const teamData = await fetchTeam(teamId);

                setTeams(teamData.teams);
                setTeamMembers(teamData.teams.map((team: any) => team.members))
                setTotalJoinedMembers(teamData.totalJoinedMembers);
                setIsLoading(false);
                
            } catch (error) {
                console.error("Error fetching single event:", error);
            }
        };

        fetchData();
    }, [teamId]);
    
    const uniqueMembers = teams.flatMap((team: any) => team.members || [])
    .reduce((acc: any, member: any) => {
        const existingMember = acc.find((m: any) => m.userId === member.userId);
        if (!existingMember) {
            acc.push(member);
        }
        return acc;
    }, []);  

    const handleSingleTeam =  useCallback((value: any) => {
        return setTeams(value);
    }, []);

    const uId = localStorage.getItem('id');

    const memberrr = uniqueMembers?.map((member: any) => member.userId).toString();
    const isJoined = memberrr?.includes(uId); 
    
    console.log(waitingUsers)
    const value =  { handleSingleTeam,waitingUsers, joinedUsers,  teamMembers, isJoined, uniqueMembers, totalJoinedMembers,isLoading, teams}

    return <SingleTeamContext.Provider  value={value}> {children}</SingleTeamContext.Provider>
}

export const singleTeamsContextStore = ()=> React.useContext(SingleTeamContext);