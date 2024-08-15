import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Client as PusherPushNotifications } from "@pusher/push-notifications-web";
import { userAuthContext } from "../../contexts/authContext";
import { getTimeAgo } from "../../pages/ReadPost";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../../appConfig";
import {
  deleteChatMessage,
  fetchMessage,
  postChat,
  updateChatMessage,
  updateChatStatus,
  updateMessageStatus,
} from "../../utils/fetchChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faChevronLeft,
 
} from "@fortawesome/free-solid-svg-icons";
const Messages = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const [messageDropdown, setMessageDropdown] = useState<any>(null);
  const [showmessageDropdown, setShowMessageDropdown] = useState<any>(false);
  const [sender] = useState(localStorage.getItem("id"));
  const [editMessage, setEditMessage] = useState<any>("");
  const {
    receiver,
    handleReceiver,
    chatId,
    handleNotificationCount,
    notificationCount,
    handleLoading,
    activeChatId,
    handleChatId,
    loading,
  } = userAuthContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessage(sender, receiver, setMessages);
  }, [sender, loading, receiver, notificationCount]);

  console.log(messages, "messages");
  useEffect(() => {
    setupNotifications();
  }, [sender]);

  useEffect(() => {
    const handleNotification = (event: any) => {
      if (event.data && event.data.type === "NEW_NOTIFICATION") {
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
        navigator.serviceWorker.ready
          .then((registration) => {
            if (registration.active) {
              console.log("Adding event listener for service worker messages");
              navigator.serviceWorker.addEventListener(
                "message",
                handleNotification
              );
            }
          })
          .catch((error) => {
            console.error("Service Worker not ready:", error);
          });
      } else {
        console.error("Service Worker is not supported or not registered.");
      }
    };

    checkForNotifications();

    // Cleanup function to remove event listener when component unmounts
    return () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then((registration) => {
          if (registration.active) {
            console.log("Removing event listener for service worker messages");
            navigator.serviceWorker.removeEventListener(
              "message",
              handleNotification
            );
          }
        });
      }
    };
  }, []);
  // Empty dependency array ensures this effect runs only once when the component mounts
console.log(loading,"hey")
  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    const formData = {
      newMessage: newMessage,
      sender: sender,
      receiver: receiver,
    };
    postChat(formData, setMessages, handleLoading);
    setNewMessage("");
  };

  const setupNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const beamsClient = new PusherPushNotifications({
            instanceId: process.env.REACT_APP_PUSHER_INSTANCE_KEY || "",
          });

          beamsClient
            .start()
            .then(() => beamsClient.addDeviceInterest(`user-${sender}`))
            .then(() =>
              console.log("Successfully registered and subscribed to interest!")
            )
            .catch(console.error);
        }
      });
    } else {
      console.error("Notifications are not supported by this browser.");
    }
  };

  const handleMessageDropdown = (value: any) => {
    setMessageDropdown(value);
    setShowMessageDropdown((prevState: any) => !prevState);
  };
  const handleDeleteMessage = (msgId: any) => {
    deleteChatMessage(msgId, handleLoading);
  };
  const editChatMessage = (e: any) => {
    e.preventDefault();
    const formdata = {
      messageId: editMessage.id,
      isRead: false,
      message: editMessage.message,
    };
    updateChatMessage(formdata, handleLoading);
    setEditMessage("");
  };
  const handleMessageStatus = (msgId: any, msgStatus: any) => {
    const formdata = {
      messageId: msgId,
      isRead: msgStatus,
    };
    updateMessageStatus(formdata, handleLoading);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;

    // Update only the message part of the state while keeping the id the same
    setEditMessage((prevState: any) => ({
      ...prevState,
      message: newMessage,
    }));
  };
  const handleBack = () => {
    handleChatId(false)
}
  return (
    <div className={`md:flex ${activeChatId ? "block" : "hidden"} overflow-hidden flex-col justify-center md:h-[80vh] pb-16  sticky w-[100%]  bg-white shadow-lg`}>
      <div className="flex items-center justify-between gap-4 mb-8 shadow-lg p-4 ">
        <div className="flex items-center gap-4 ">
        {activeChatId && <button className="bg-grey rounded-full h-6 w-6 cursor-pointer" onClick={
                handleBack
            }>
                 <FontAwesomeIcon
                      icon={
                       
                          faChevronLeft
                      }
            
                    />
            </button>}
          <img
            src={messages.receiver?.imageUrl}
            className="rounded-full"
            width="50px"
            height="50px"
            alt=""
          />
          <p>{messages.receiver?.nickName}</p>
        </div>
        {/* <div>
          <p>
            Member Since:
            {getTimeAgo(new Date(messages.receiver?.createdAt), t)}
          </p>
        </div> */}
      </div>
      <div className="flex-1 custom-scrollbar md:overflow-y-auto bg-white border   border-gray-300 rounded-lg p-4 ">
      
        {messages.userMessages?.length > 0 ? (
          messages.userMessages.map((msg: any, index: any) => (
            <div
              key={index}
              className={`p-2 mb-2  bg-gray-100 sm:w-[50%] w-full rounded-e-xl relative ${
                msg.sender === sender
                  ? "float-right rounded-es-xl"
                  : "float-left ml-2 bg-[#e4fffd] md:ml-0 rounded-es"
              }`}
            >
              <div className="absolute z-50 right-[40px] md:right-[10px] top-0 p-2 flex justify-center items-center">
                <span>
                  <small className="text-gray-500">
                    {getTimeAgo(new Date(msg.timestamp), t)}
                  </small>
                </span>
                {
                  <button
                    className="p-0 m-0  focus:outline-none bg-transparent"
                    onClick={() => {
                      handleMessageDropdown(msg.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="black"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                }
              </div>
              {messageDropdown == msg.id && showmessageDropdown && (
                <div className="absolute right-[15%] h-auto p-2 w-24 rounded-md bg-white z-50 ">
                  {sender != msg.receiver && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMessage((prevState: any) =>
                            prevState?.id === msg.id
                              ? null
                              : { id: msg.id, message: msg.message }
                          );
                          setShowMessageDropdown(
                            (prevState: any) => !prevState
                          );
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteMessage(msg.id);
                          setShowMessageDropdown(
                            (prevState: any) => !prevState
                          );
                        }}
                        className="focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {sender == msg.receiver && (
                    <>
                      {msg.is_read == false ? (
                        <button
                          type="button"
                          onClick={() => {
                            handleMessageStatus(msg.id, true);
                            setShowMessageDropdown(
                              (prevState: any) => !prevState
                            );
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                        >
                          Read
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleMessageStatus(msg.id, false);
                            setShowMessageDropdown(
                              (prevState: any) => !prevState
                            );
                          }}
                          className="focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                        >
                          Unread
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              <div className="flex items-start gap-4 relative mt-4">
                {/* <img
                  src={
                    msg.sender === sender
                      ? messages.sender.imageUrl
                      : messages.receiver.imageUrl
                  }
                  width="40px"
                  height="40px"
                  alt=""
                  className="rounded-full"
                /> */}
                <div>
                  {/* <strong
                    className={`text-blue-600 gap-4  ${
                      msg.sender === sender ? "text-left" : "text-right"
                    }`}
                  >
                    {msg.sender === sender
                      ? messages.sender.nickName
                      : messages.receiver.nickName}
                  </strong> */}
                  <p>
                    {editMessage?.id == msg.id ? (
                      <form onSubmit={editChatMessage}>
                        <input
                          type="text"
                          name="message"
                          value={editMessage.message}
                          onChange={handleInputChange}
                        />
                        <button type="submit" className="">
                          update
                        </button>
                      </form>
                    ) : (
                      msg.message
                    )}
                  </p>
                </div>
              </div>
              <small className="text-[green]">
                {msg.sender == sender && msg.is_read == true
                  ? "Readed"
                  : ""}
              </small>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="block z-50 md:absolute bottom-[-2%] w-[92%] gap-2 md:p-4  border-t border-gray-300 "
      >
        <div className="fixed justify-start md:flex md:sticky md:top-0 w-full bottom-0  flex gap-2 p-4 z-[9999]">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write message"
            required
            className="flex md:flex-1 px-3 w-[200px] md:px-5 xl:w-[600px] py-2 border-[1px] border-solid border-[#e7e7e7] rounded-lg  transition-shadow duration-200 ease-in-out shadow-sm focus:shadow-md hover:shadow-lg"

          />
          <button
            type="submit"
            className="px-2 md:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;
