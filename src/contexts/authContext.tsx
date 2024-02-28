import React, {  useCallback, useEffect, useState } from 'react';
import { getUser } from '../utils/fetchUser';


const UserAuthContext = React.createContext<any>({});

export const AuthContext = ({children}:any)=>{
    const [user, setUser] = useState<any[]>([]);
    
    useEffect(() => {
        getUser(setUser);
    }, []);

    const handleUser = useCallback((value: any) => {
        return setUser(value);
    }, [user]);

    const value =  { handleUser, user}

    return <UserAuthContext.Provider  value={value}> {children}</UserAuthContext.Provider>
}

export const userAuthContext = ()=> React.useContext(UserAuthContext);

