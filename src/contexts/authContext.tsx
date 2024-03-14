import React, { useCallback, useEffect, useState } from "react";
import { getUser, updateUser } from "../utils/fetchUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserAuthContext = React.createContext<any>({});

export const AuthContext = ({ children }: any) => {
  const [user, setUser] = useState<any>("");
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    nickName: "",
    email: "",
    password: "",
    userId: "",
    imageUrl: [],
  });
  useEffect(() => {
    getUser(setUser, navigate);
  }, [message]);

  useEffect(() => {
    setUserFormData({
      nickName: user?.nickName,
      email: user?.email,
      password: user?.password,
      userId: user?.id,
      imageUrl: user?.imageUrl || [],
    });
  }, [user]);

  const handleUser = useCallback(
    (value: any) => {
      return setUser(value);
    },
    [user]
  );

  const handleUpdateUser = () => {
    updateUser(userFormData, setMessage);
  };
  const value = { handleUser,handleUpdateUser,setUserFormData, userFormData, user, message };
  return (
    <UserAuthContext.Provider value={value}>
      {" "}
      {children}
    </UserAuthContext.Provider>
  );
};

export const userAuthContext = () => React.useContext(UserAuthContext);

