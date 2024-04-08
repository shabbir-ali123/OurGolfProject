import React, { useCallback, useEffect, useState } from "react";
import socket from "../socket";
import { fetchNotifications } from "../utils/fetchNotifications";
import { approveEvent } from "../utils/fetchEvents";

const NotiContext = React.createContext<any>({});

export const NotificationsContext = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any>([])
  const [notificationData, setNotificationData] = useState<any>(null);
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState<any>({userId: '', eventId: ''});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchNotifications(setNotificationData, setIsLoading);
    const handleAppointmentBooked = (data: any) => {
      setNotifications((prevNotifications: any) => [...prevNotifications, data]); 
    };    
    socket.on('appointmentBooked', handleAppointmentBooked);

    return () => {
      socket.off('appointmentBooked', handleAppointmentBooked);
    };
  }, [isLoading]); 

  const handleNotification = useCallback((value: any) => {
    setNotifications(value);
  }, [notifications]);

  const handleMessage = useCallback((value: any) => {
    setMessage(value);
  }, [message]);

  const handleFormData = useCallback((value: any) => {
    setFormData(value)
  }, [formData])
  // const approveEvents = useCallback((value: any) => {
  //   approveEvent(formData, handleMessage);
  //   }, [formData])


  const value = { handleNotification, handleMessage, handleFormData, isLoading, formData, notifications,  notificationData }; 

  return <NotiContext.Provider value={value}> {children}</NotiContext.Provider>
}

export const notificationsContextStore = () => React.useContext(NotiContext);
