import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { notificationsContextStore } from "../contexts/notificationContext";
import { getTimeAgo } from "./ReadPost";
import { approveEvent } from "../utils/fetchEvents";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNotifications, updateNotificationsStatus } from "../utils/fetchNotifications";

export default function AllNotification() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const { t, i18n } = useTranslation();
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  document.body.dir = i18n.dir();

  const { isloading, handleMessage } =
    notificationsContextStore();

  const handleApprove = (e: any, eventId: any, message: any) => {
    e.preventDefault();

    const obj = {
      notificationId: eventId,
      message: message,
    }
    updateNotificationsStatus(handleMessage, obj);
    toast.success("Marked as Read Successfully");
    // navigate(`/edit-team/${eventId}`);

  };
  useEffect(() => {
    const updateNotifications = () => {
      fetchNotifications(setNotificationData, setIsLoading);
    };

    updateNotifications();

    const intervalId = setInterval(updateNotifications, 10000);
    return () => clearInterval(intervalId);
  }, [i18n.dir]);
  const currentUserId = localStorage.getItem("id");
  return (
    <>
      {
        isloading ? <div className="flex justify-center items-center h-[100vh]">
          <div>
            <img className="w-10 h-10 animate__animated animate__bounce animate__infinite " src="/img/golfball.jpg" alt="" />
            <p>loading...</p>
          </div>

        </div> :

          <div className="max-w-7xl mx-10 xl:mx-auto">
            <h4>{t("ALL_NOTIFICATION")}</h4>
            <div
              aria-live="assertive"
              className=" h-screen animate__animated animate__fadeInLeft "
            >
              <div className="w-full justify-center">
                {notificationData?.map((item: any, index: any) => {
                  // if (
                  //   (item.organizerId == currentUserId) ||
                  //   (item.teacherId == currentUserId) ||
                  //   (item.userId == currentUserId)
                  // ) {
                  return (
                    <Transition
                      show={show}
                      as={Fragment}
                      enter="transform ease-out duration-300 transition"
                      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className={`mt-2 pointer-events-auto w-full max-w-5xl rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${!item.isRead ? 'bg-[#f3f3f3]' : 'bg-white'
                        }`} onClick={(e) => {



                          if (item?.eventId !== null) {
                            handleApprove(e, item?.id, item?.message)
                            navigate('/edit-team/' + item?.eventId);

                          } else if (item?.teacherId !== null) {
                            navigate('/' + item?.eventId);

                          }





                        }}>
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="flex items-center justify-center  border-2 border-solid border-[#17b3a6] rounded-full  h-8 w-8">
                              <img
                                className="w-full h-full rounded-full"
                                src={item?.User.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {item.User.nickname}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.message}
                              </p>
                              {/* {!item.isRead && (
                                <div className="mt-4 flex">
                                  <button
                                    type="button"
                                    className="cursor-pointer inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={(e) =>
                                      handleApprove(e, item?.id, item?.message)
                                    }
                                  >
                                    {t("IS_READ")}
                                  </button>
                              
                                </div>
                              )} */}
                            </div>
                            <div className="text-start flex-col mb-2">
                              {!item.isRead && (
                                <div className=" text-left">
                                  <button
                                    type="button"
                                    className="text-[11px] cursor-pointer text-black bg-transparent text-xs"
                                    onClick={(e) =>
                                      handleApprove(e, item?.id, item?.message)
                                    }
                                  >
                                    {t("IS_READ")}
                                  </button>

                                </div>
                              )}
                              <p className="text-[12px]">
                                {getTimeAgo(new Date(item?.createdAt), t)}
                              </p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  );

                })}
              </div>
            </div>
          </div>
      }
    </>
  );
}
