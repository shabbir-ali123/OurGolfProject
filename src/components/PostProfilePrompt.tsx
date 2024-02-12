import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaceSmileIcon,
  PhotoIcon,
  VideoCameraIcon
} from "@heroicons/react/24/solid";
import PostModal from "../components/PostModel"
const ProfilePrompt: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" ) {
      setIsModalOpen(true);
    } else {
      navigate('/login-page'); 
    }
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
    <div className="bg-white p-4 my-4 rounded-lg border-2 border-solid border-[#51ff85]">
      <div className="flex items-center p-4 space-x-4">
        <img
          className="w-12 h-12 rounded-full"
          src="/img/zozo.png"
          alt="User"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 border-2 border-solid border-[#51ff85] rounded-full py-2 px-4 focus:outline-none focus:border-green-300"
          onFocus={openModal}
        />
      </div>

      <div className="flex justify-around mt-4">
        <button className="flex items-center gap-2 font-semibold text-green-600 bg-transparent">
          {" "}
          <span>
            <VideoCameraIcon className="w-5 h-5 cursor-pointer border-2 border-solid border-[#51ff85] rounded-full p-1 text-rose-500" aria-hidden="true" />
          </span>{" "}
          Live video
        </button>
        <button className="flex items-center gap-2 font-semibold text-green-600 bg-transparent">
          {" "}
          <span>
            <PhotoIcon className="w-5 h-5 cursor-pointer border-2 border-solid border-[#51ff85] rounded-full p-1 text-springgreen" aria-hidden="true" />
          </span>
          Photo/Video
        </button>
        <button className="flex items-center gap-2 font-semibold text-green-600 bg-transparent">
          {" "}
          <span>
            <FaceSmileIcon className="w-5 h-5 cursor-pointer text-yellow-300 border-2 border-solid border-[#51ff85] rounded-full p-1 " aria-hidden="true" />
          </span>
          Feeling/Activity
        </button>
      </div>
    </div>
    {isModalOpen && (
        <PostModal closeModal={closeModal} />
      )}
    </>
    
  );
};

export default ProfilePrompt;
