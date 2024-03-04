import React, { useCallback, useEffect, useState } from "react";
import socket from "../socket";

const NotiContext = React.createContext<any>({});

export const NotificationsContext = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any>([])

  useEffect(() => {
    const handleAppointmentBooked = (data: any) => {
      setNotifications((prevNotifications: any) => [...prevNotifications, data]); 
    };    
    socket.on('appointmentBooked', handleAppointmentBooked);

    return () => {
      socket.off('appointmentBooked', handleAppointmentBooked);
    };
  }, []); 

  const handleNotification = useCallback((value: any) => {
    console.log(value, 'val')
    setNotifications(value);
  }, []);

  const value = { notifications, handleNotification }; 

  return <NotiContext.Provider value={value}> {children}</NotiContext.Provider>
}

export const notificationsContextStore = () => React.useContext(NotiContext);
