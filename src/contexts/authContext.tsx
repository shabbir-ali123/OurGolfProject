import React, {  useCallback, useEffect, useState } from 'react';
import { fetchEventss, fetchUser } from '../utils/fetchEvents';


const UserAuthContext = React.createContext<any>({});

export const AuthContext = ({children}:any)=>{
    const [userss, setUser] = useState<any[]>([]);
    
    useEffect(() => {
        fetchUser(setUser);
    }, []);

    const handleUser = useCallback((value: any) => {
        return setUser(value);
    }, [userss]);

    const value =  { handleUser, userss}

    return <UserAuthContext.Provider  value={value}> {children}</UserAuthContext.Provider>
}

export const userAuthContext = ()=> React.useContext(UserAuthContext);

