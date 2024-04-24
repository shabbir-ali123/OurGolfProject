import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useTeacherContext } from "../contexts/teachersContext";
import { useNavigate } from "react-router-dom";

export const TeacherAppointments = () => {
    const {t} = useTranslation();
    const router  = useNavigate()
    const { bookedAppointments } = useTeacherContext();

    return (
        <>
      {
        false ? <div className="flex justify-center items-center h-[100vh]">
          <div>
            <img className="w-10 h-10 animate__animated animate__bounce animate__infinite " src="/img/golfball.jpg" alt="" />
            <p>loading...</p>
          </div>

        </div> :

          <div className="max-w-7xl mx-10 xl:mx-auto">
            <h4>{t("ALL_APPOINTMENTS")}</h4>
            <div
              aria-live="assertive"
              className=" h-screen animate__animated animate__fadeInLeft "
            >
              <div className="w-full justify-center">
                {bookedAppointments?.map((item: any, index: any) => {
                
                  return (
                    <Transition
                      show={true}
                      as={Fragment}
                      enter="transform ease-out duration-300 transition"
                      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className={`mt-2 pointer-events-auto w-full max-w-5xl rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${!item.isRead ? 'bg-[#f3f3f3]' : 'bg-white'
                        }`} >
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="flex items-center justify-center  border-2 border-solid border-[#17b3a6] rounded-full  h-8 w-8" onClick={() => router('/user-page/'+item?.bookedBy)}>
                              <img
                                className="w-full h-full rounded-full"
                                src={ ''}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {item?.bookedShifts?.nickName}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item?.bookedShifts?.nickName} wants to book appointment from {item?.startTime} to {item?.endTime} on {item?.day}
                              </p>
                              <div className="mt-4 flex gap-2">
                                  <button
                                    type="button"
                                    className="cursor-pointer inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    // onClick={(e) =>
                                    //   handleApprove(e, item?.id, item?.message)
                                    // }
                                  >
                                    {'Approve'}
                                  </button>
                                  <button
                                    type="button"
                                    className="cursor-pointer inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    // onClick={(e) =>
                                    //   handleApprove(e, item?.id, item?.message)
                                    // }
                                  >
                                    {"Decline"}
                                  </button>
                              
                                </div>
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
    )
}