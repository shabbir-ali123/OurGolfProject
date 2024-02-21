import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { InboxIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { notificationsContextStore } from "../contexts/notification";
interface NotificationProp {
  setNotification: any;
  notifcations?: any
}
export const NotificationPop: React.FC<NotificationProp> = ({setNotification, notifcations}) => {
    const [show, setShow] = useState(true);
    // const [notifications, setuNotications] = useState<any>([])
    const { notifications } = notificationsContextStore();

  const navigate = useNavigate();
  const handleButtonClick = () => {
    setShow(false);
    setNotification(false);
    navigate("/notification-page");
  };

  return (
    <>
      <div
        aria-live="assertive"
        className=" pointer-events-none left-0 right-[100px] top-[50px] z-[999]  absolute inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          {notifications.map((item: any) => {
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
                <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
                  <div className="p-4">
                    <div className="flex items-start ">
                      <div className="flex-shrink-0">
                        <InboxIcon
                          className="w-6 h-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                          Discussion moved
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {/* {notifications.map((i)} */}
                        </p>
                        <div className="flex mt-3 space-x-7">
                          <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Undo
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium text-gray-700 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 ml-4">
                        <button
                          type="button"
                          className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => {
                            setShow(false);
                            setNotification(false);
                          }}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <InboxIcon
                          className="w-6 h-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                          Discussion moved
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit oluptatum tenetur.
                        </p>
                        <div className="flex mt-3 space-x-7">
                          <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Undo
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium text-gray-700 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 ml-4">
                        <button
                          type="button"
                          className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => {
                            setShow(false);
                            setNotification(false);
                          }}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </Transition>
            );
          })}
          <div className="mx-6 my-6 " onClick={handleButtonClick}>
                    <button className=" hover:text-[#17b3a6] cursor-pointer text-gray font-bold rounded bg-transparent ">
                      See All
                    </button>
                  </div>
        </div>
      </div>
    </>
  );
}
