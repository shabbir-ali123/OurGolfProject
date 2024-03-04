import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { notificationsContextStore } from "../contexts/NotificationContext";
interface NotificationProp {
  setNotification: any;
}
export const NotificationPop: React.FC<NotificationProp> = ({
  setNotification,
}) => {
  const [show, setShow] = useState(true);
  const { notifications } = notificationsContextStore();

  const navigate = useNavigate();
  const handleButtonClick = () => {
    setShow(false);
    setNotification(false);
    navigate("/notification-page");
  };
  let notification = [];
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("teacher_id");
  let tId = notifications.map((item: any) => item.teacherId);
  tId = tId[tId.length - 1 ]
      if(tId == id  && token){
        notification = notifications;
    }
    
  return (
    <>
      <div
        aria-live="assertive"
        className=" pointer-events-none left-0 right-[100px] top-[50px] z-[999]  absolute inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          {notification.map((item: any) => {
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
                  <div
                    className="p-4"
                    onClick={() => navigate("/teacher-page")}
                  >
                    <div className="flex items-center ">
                      <div className="flex-shrink-0">
                        <img
                          src={item.appointment.student.imageUrl}
                          className="w-6 h-6 text-gray-400 rounded-lg"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1 w-0 ml-3 ">
                        <p className="text-sm font-medium text-gray-900">
                          Booked By {item.appointment.student.nickName} on{" "}
                          {item.appointment.day} {item.appointment.startTime} to{" "}
                          {item.appointment.endTime}
                        </p>
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
};
