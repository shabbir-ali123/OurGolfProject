import React, {  useCallback, useEffect, useState } from 'react';
import { getUser } from '../utils/fetchUser';
import { useNavigate } from 'react-router-dom';


const UserAuthContext = React.createContext<any>({});

export const AuthContext = ({children}:any)=>{
    const [user, setUser] = useState<any[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        getUser(setUser, navigate);
    }, []);

    const handleUser = useCallback((value: any) => {
        return setUser(value);
    }, [user]);

    const value =  { handleUser, user}

    return <UserAuthContext.Provider  value={value}> {children}</UserAuthContext.Provider>
}

export const userAuthContext = ()=> React.useContext(UserAuthContext);

