import React, { useState } from "react";
import TeacherProfile from "../components/TeacherProfile";
import AboutTeacher from "../components/AboutTeacher";
import IntroVideo from "../components/TeacherIntro";
import TeacherPortfolio from "../components/TeacherPortfolio";
import TeacherSlotss from "../components/TeacherSlots";
import { useTeacherContext } from "../contexts/teachersContext";
import VideoPortfolio from "../components/TeacherPortfolio";

const TeacherDetails: React.FC = () => {
  const { teacher } = useTeacherContext();
  const [videoVisible, setVideoVisible] = useState<boolean>(false);

  const videoSrc = "/video/video.mp4";
  const posterSrc = "/img/user-06.png";

  const availableSlots = teacher?.schedules?.map((schedules: any) => schedules);
  const shifts = availableSlots?.map((item: any) => item.shifts);
  const slots = shifts?.flatMap((item: any) => item);

  return (
    <div className="mx-20 md:mx-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-4 ">
          <TeacherSlotss slots={slots} schedules={availableSlots} />
        </div>
        <div className="col-span-4 md:col-span-8">
          <div className="bg-[#17b3a6] p-4 rounded">
            <TeacherProfile {...teacher} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
            <div className="col-span-1 md:col-span-5">
              <AboutTeacher />
            </div>
            <div className="col-span-1 md:col-span-3 my-4">
              <h3 className="text-lg text- font-semibold mb-2 text-[#565656]">
                Introduction Video
              </h3>
              <div className="relative flex justify-center items-center bg-gray-200 p-4 rounded-lg shadow-md">
                {!videoVisible && (
                  <>
                    <img
                      className="rounded-lg"
                      src={posterSrc}
                      alt="Introduction"
                      onClick={() => setVideoVisible(true)}
                    />
                    <button
                      className="absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
                      onClick={() => setVideoVisible(true)}
                    >
                      <span className="text-white text-6xl">&#9658;</span>
                    </button>
                  </>
                )}
                {videoVisible && (
                  <iframe
                    className="rounded-lg w-full h-[260px]"
                    src={videoSrc}
                    title="Introduction Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
         <div>
          <VideoPortfolio/>
         </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
