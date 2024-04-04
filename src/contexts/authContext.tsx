import React, { useCallback, useEffect, useState } from "react";
import { getSingleUser, getUser, updateUser } from "../utils/fetchUser";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../appConfig";

const UserAuthContext = React.createContext<any>({});

export const AuthContext = ({ children }: any) => {
  const [user, setUser] = useState<any>("");

  const [message, setMessage] = useState<string>();
  const [chatUser, setChatUser] = useState<string>('4');
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    nickName: "",
    email: "",
    password: "",
    userId: "",
    imageUrl: "",
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

  const handleSelectedUser = useCallback(
    (value: any) => {
      return setChatUser(value);
    },
    [chatUser]
  );

  const handleUpdateUser = async () => {
    const payload = {
      nickName: userFormData.nickName,
      email: userFormData.email,
      password: userFormData.password,
      imageUrl: userFormData.imageUrl,
    };

    const authToken = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_ENDPOINTS.UPDATEUSERPROFILE}${userFormData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
      toast.success(data.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "There was a problem with the fetch operation: " + error.message
        );
        toast.error("Update failed: " + error.message);
      } else {
        console.error("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

 

  const value = {
    handleUser,
    handleUpdateUser,
    setUserFormData,
    handleSelectedUser,
    chatUser,
    userFormData,
    user,
    message,
  };
  return (
    <UserAuthContext.Provider value={value}>
      {" "}
      {children}
    </UserAuthContext.Provider>
  );
};

export const userAuthContext = () => React.useContext(UserAuthContext);



const SingleUserContext = React.createContext<any>({});

export const UserContext = ({ children }: any) => {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const [singleUser, setSingleUser] = useState<any>("");
  
  console.log(singleUser)
  useEffect(() => {
 
      getSingleUser(setSingleUser, userId)

  }, [userId]);

  

  const value = {
    singleUser,
  };
  return (
    <SingleUserContext.Provider value={value}>
      {" "}
      {children}
    </SingleUserContext.Provider>
  );
};

export const singleUserContext = () => React.useContext(SingleUserContext);
