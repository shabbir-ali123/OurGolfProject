import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Client as PusherPushNotifications } from '@pusher/push-notifications-web';
import { userAuthContext } from '../../contexts/authContext';
import { getTimeAgo } from '../../pages/ReadPost';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from "../../appConfig";
import { fetchMessage } from '../../utils/fetchChat';
const Messages = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<any>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sender] = useState(localStorage.getItem("id"));
    const { receiver, handleReceiver,chatId,handleNotificationCount, notificationCount } = userAuthContext();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessage(sender, receiver, setMessages);
    }, [sender, receiver, notificationCount]);

    console.log(messages, "messages")
    useEffect(() => {
        setupNotifications();
    }, [sender]);

    useEffect(() => {
      const handleNotification = (event:any) => {
          if (event.data && event.data.type === 'NEW_NOTIFICATION') {
              const incomingMessage = {
                  sender: event.data.title,
                  message: event.data.body,
                  timestamp: new Date().toISOString(),
              };
              // Add the new message to the messages state
              // setMessages((prevMessages) => [...prevMessages, incomingMessage]);
              // Increment the notification count
              handleNotificationCount(incomingMessage);
            }
      };
  
      const checkForNotifications = () => {
          if (navigator.serviceWorker) {
              navigator.serviceWorker.ready.then((registration) => {
                  if (registration.active) {
                      console.log('Adding event listener for service worker messages');
                      navigator.serviceWorker.addEventListener('message', handleNotification);
                  }
              }).catch((error) => {
                  console.error('Service Worker not ready:', error);
              });
          } else {
              console.error('Service Worker is not supported or not registered.');
          }
      };
  
      // Check for notifications on mount
      checkForNotifications();
  
      // Cleanup function to remove event listener when component unmounts
      return () => {
          if (navigator.serviceWorker) {
              navigator.serviceWorker.ready.then((registration) => {
                  if (registration.active) {
                      console.log('Removing event listener for service worker messages');
                      navigator.serviceWorker.removeEventListener('message', handleNotification);
                  }
              });
          }
      };
  }, []);
   // Empty dependency array ensures this effect runs only once when the component mounts


    const handleSendMessage = async (e:any) => {
        e.preventDefault();
        try {
            await axios.post('https://backend.golf-encounters.com:5000/api/post-chat', {
                channel: 'my-channel',
                event: 'my-event',
                message: newMessage,
                sender: sender,
                receiver: receiver
            });
            setNewMessage('');
            fetchMessage(sender, receiver, setMessages);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const setupNotifications = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    const beamsClient = new PusherPushNotifications({
                        instanceId: process.env.REACT_APP_PUSHER_INSTANCE_KEY || ""
                    });

                    beamsClient
                        .start()
                        .then(() => beamsClient.addDeviceInterest(`user-${sender}`))
                        .then(() => console.log('Successfully registered and subscribed to interest!'))
                        .catch(console.error);
                }
            });
        } else {
            console.error('Notifications are not supported by this browser.');
        }
    };

  
    return (
        <div className="flex flex-col justify-center h-[77vh] pb-16  sticky w-[100%]  bg-white shadow-lg">
            <div className='flex items-end gap-4 mb-8 shadow-lg p-4'>
                <img src={messages.receiver?.imageUrl} className='rounded-full' width='50px' height='50px' alt="" />
                <p>{messages.receiver?.nickName}</p>
            </div>
            <div className="flex-1 overflow-y-scroll bg-white border border-gray-300 rounded-lg p-4">
                {messages.userMessages?.length > 0 ? (
                    messages.userMessages.map((msg:any, index:any) => (
                        <div key={index} className={`p-2 mb-2 bg-gray-100 w-[50%] rounded-e-xl ${msg.sender === sender ? 'float-left rounded-es-xl' : 'float-right rounded-es'}`}>
                            <div className='flex justify-end'>
                            <span>
                                            <small className="text-gray-500">
                                                {getTimeAgo(new Date(msg.timestamp), t)}
                                            </small>
                                        </span>
                            </div>
                            <div className='flex items-start gap-4 relative'>
                                <img src={msg.sender === sender ? messages.sender.imageUrl : messages.receiver.imageUrl} width='40px' height='40px' alt="" className='rounded-full' />
                                <div>
                                    <strong className={`text-blue-600 gap-4  ${msg.sender === sender ? 'text-left' : 'text-right'}`}>
                                        {msg.sender === sender ? messages.sender.nickName : messages.receiver.nickName}
                                      
                                    </strong>
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No messages available.</p>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="block absolute bottom-0 w-[92%] gap-2 p-4  border-t border-gray-300">
                <div className='sticky top-0 w-full bottom-0 flex gap-2 p-4'>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter your message"
                        required
                        className="flex-1 px-4 xl:w-[600px] py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Send Message
                    </button>
                </div>
            </form>
            {/* <div className="fixed bottom-0 right-0 p-4 bg-blue-500 text-white rounded-lg">
                Notifications: {notificationCount}
            </div> */}
        </div>
    );
};

export default Messages;
