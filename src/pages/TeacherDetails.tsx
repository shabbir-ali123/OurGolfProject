import React, { useEffect, useState } from "react";
import TeacherProfile from "../components/TeacherProfile";
import AboutTeacher from "../components/AboutTeacher";
import IntroVideo from "../components/TeacherIntro";
import TeacherPortfolio from "../components/TeacherPortfolio";
import TeacherSlotss from "../components/TeacherSlots";
import { useTeacherContext } from "../contexts/teachersContext";
import VideoPortfolio from "../components/TeacherPortfolio";
import { useTranslation } from "react-i18next";
import CommentModel from "../components/CommentModel";
import { Link, useNavigate } from "react-router-dom";
import { gigsContextStore, TeacherGigsProvider } from "../contexts/gigsContext";
import { TrashIcon } from "@heroicons/react/24/solid";

const TeacherDetails: React.FC = () => {
  const router = useNavigate();
  const tId = localStorage.getItem("teacher_id");
  const { teacher } = useTeacherContext();
  const { gigs } = gigsContextStore();
  // const { handleTeacherId } = gigsContextStore();

  console.log(gigs.gigs, 'sd')
  const [videoVisible, setVideoVisible] = useState<boolean>(false);

  const posterSrc = "/img/user-06.png";

  const availableSlots = teacher?.schedules?.map((schedule: any) => schedule);
  const shifts = availableSlots?.map((item: any) => item.shifts);
  const slots = shifts?.flatMap((item: any) => item);
  const { t } = useTranslation();



  console.log(gigs, "sds");
  return (
    <div className="mx-4 md:mx-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">

        <div className="col-span-1 md:col-span-4 order-last md:order-first">
          <TeacherSlotss
            slots={slots}
            schedules={availableSlots}
            teacherId={teacher?.id}
          />
        </div>

        {/* Main content */}
        <div className="col-span-4 md:col-span-8">
          <div className="bg-[#17b3a6] p-4 rounded">
            <TeacherProfile {...teacher} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
            <div className="col-span-1 md:col-span-5">
              <AboutTeacher />
            </div>
            <div className="col-span-1 md:col-span-3 my-4">
              <h3 className="text-lg font-semibold mb-2 text-[#565656]">
                {t("MAIN_VIDEO")}
              </h3>
              <div className="relative flex justify-center items-center bg-gray-200 p-4 rounded-lg shadow-md overflow-hidden">


                <video
                  className="rounded-lg w-full h-[260px]"
                  src={teacher.introductionVideo}
                  title="Introduction Video"
                  width={260}
                  controls
                ></video>

              </div>
            </div>
          </div>
          <div>
            <VideoPortfolio />
          </div>
          <div className="my-8">
            <h2 className="text-xl text-start font-semibold mb-4">Gigs:</h2>

            {tId != teacher?.id ? (
              <div className="  xl:flex gap-4">
                {gigs.gigs?.length != 0 ? (
                  gigs.gigs?.map((item: any) => (
                    <div className=" xl:w-auto mb-4  xl:mb-0 p-2 space-y-4 text-white border border-yellow-400 rounded-lg bg-white lg:py-8 md:px-12 md:w-auto md:flex-row md:items-center md:space-x-4 lg:space-x-12" style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",

                    }}>
                      <div className=" gap-4 items-center text-black">
                        <div>

                        </div>

                        <img className="w-[120px] h-[120px] rounded border-2 border-solid border-[#2dd4bf]" src={item?.imageUrl || teacher?.profileImage} alt="" />
                        <div className="flex flex-col">

                          <h3>{item.title}</h3>
                          <p>Price {item.price} ¥ </p>
                          <button className="p-2 rounded-lg cursor-pointer bg-[#2dd4bf] text-white hover:bg-black hover:text-white">See More</button>
                          <Link to="/message-page" className="text-center bg-[#2dd4bf] text-white p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">Chat</Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center">
                    <h2>
                      {t("OPPS")}
                    </h2>
                  </div>
                )}
              </div>
            ) : (

              <>
                <h2>
                  {t("OPPS")}
                  <span className="text-[#17b3a6]">GIGS!SS</span>
                </h2>
                <button
                  className="text-white bg-[#17b3a6] px-6 py-2 cursor-pointer rounded hover:bg-green-600 text-sm md:text-base"
                  onClick={() => router(`/create-catalogs/${teacher?.id}`)}
                >
                  Create GIG
                </button>
              </>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">{t("RATING")}:</h2>
            {teacher?.rating !== null ? (
              <h2 className="text-center">{t("NO_RATINGS_YET")}</h2>
            ) : (
              <div className="max-w-screen-xl px-6 mx-auto mb-12 lg:px-8 xl:px-4 lg:mb-16 xl:mb-24">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col w-full px-4 py-4 space-y-4 border border-yellow-400 rounded-lg bg-yellow-100/50 lg:py-8 md:px-12 md:w-auto md:flex-row md:items-center md:space-x-4 lg:space-x-12">
                    <div>
                      <p className="text-lg font-bold text-gray-700 uppercase trakcing-wide lg:text-xl">
                        4.9 {t("OVERALL")}
                      </p>
                      <p className="text-base text-gray-600 lg:text-lg">
                        {t("SERVING")} 3000 {t("STUDENTS_IN_JAPAN")}
                      </p>
                    </div>
                    <div className="flex space-x-2 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          ></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
