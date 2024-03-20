import React, { useCallback, useEffect, useState } from "react";
import socket from "../socket";
import { fetchNotifications } from "../utils/fetchNotifications";

const NotiContext = React.createContext<any>({});

export const NotificationsContext = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any>([])
  const [notificationData, setNotificationData] = useState<any>(null);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<any>({userId: undefined, eventId: undefined});
  
  
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
  }, [message]);

  const handleMessage = useCallback((value: any) => {
    setMessage(value);
  }, []);

  const handleFormData = useCallback((value: any) => {
    setFormData(value)
  }, [])


  const value = { handleNotification, handleMessage, handleFormData, formData, notifications,  notificationData }; 

  return <NotiContext.Provider value={value}> {children}</NotiContext.Provider>
}

export const notificationsContextStore = () => React.useContext(NotiContext);
