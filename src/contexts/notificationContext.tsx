import React, { useCallback, useEffect, useState } from "react";
import socket from "../socket";
import { fetchNotifications } from "../utils/fetchNotifications";

const NotiContext = React.createContext<any>({});

export const NotificationsContext = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any>([])
  const [notificationData, setNotificationData] = useState<any>(null);

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      fetchNotifications(setNotificationData);
    };
    fetchDataWithDelay();
    const handleAppointmentBooked = (data: any) => {
      setNotifications((prevNotifications: any) => [...prevNotifications, data]); 
    };    
    socket.on('appointmentBooked', handleAppointmentBooked);

    return () => {
      socket.off('appointmentBooked', handleAppointmentBooked);
    };
  }, []); 

  const handleNotification = useCallback((value: any) => {
    setNotifications(value);
  }, []);

  const value = { handleNotification,notifications,  notificationData }; 

  return <NotiContext.Provider value={value}> {children}</NotiContext.Provider>
}

export const notificationsContextStore = () => React.useContext(NotiContext);
