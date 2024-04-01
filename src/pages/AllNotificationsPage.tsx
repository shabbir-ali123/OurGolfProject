import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { notificationsContextStore } from "../contexts/notificationContext";
import { getTimeAgo } from "./ReadPost";
import { approveEvent } from "../utils/fetchEvents";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AllNotification() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { notificationData, handleMessage, formData, handleFormData } =
    notificationsContextStore();

  const handleApprove = (userId: any, eventId: any) => {
    handleFormData({ userId: userId, eventId: eventId });

    if (formData.userId != '' && formData.eventId != '') {

      approveEvent(formData, handleMessage);
      toast.success('Approved Successfully')
      navigate(`/edit-team/${eventId}`)
    }
  };

  const currentUserId = localStorage.getItem('id');
  
  return (
    <>
      <div className="max-w-7xl mx-10 xl:mx-auto">
        <h4>{t("ALL_NOTIFICATION")}</h4>
        <div
          aria-live="assertive"
          className=" h-screen animate__animated animate__fadeInLeft "
        >
          <div className="w-full justify-center">
            {notificationData?.map((item: any, index: any) => {
              if(item.eventId == currentUserId || item.teacherId == currentUserId){
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
                  <div className="mt-2 pointer-events-auto w-full max-w-5xl rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center  border-2 border-solid border-[#17b3a6] rounded-full  h-8 w-8">
                          <img className="w-full h-full rounded-full" src={item.User.imageUrl} alt=""  />
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.User.nickname}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.message}
                          </p>
                          {
                            !item.isRead &&
                          <div className="mt-4 flex">
                            <button
                              type="button"
                              className="cursor-pointer inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() =>
                                handleApprove(item?.userId, item?.eventId)
                              }
                            >
                              {t("ACCEPT")}
                            </button>
                            <button
                              type="button"
                              className="cursor-pointer ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              {t("DECLINE")}
                            </button>
                          </div>
              }
                        </div>
                        <div className="ml-4 flex flex-shrink-0">
                          {getTimeAgo(new Date(item?.createdAt))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              );
                            }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
