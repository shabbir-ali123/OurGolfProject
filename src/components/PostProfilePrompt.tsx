import React from "react";
import {
  FaceSmileIcon,
  PhotoIcon,
  VideoCameraIcon
} from "@heroicons/react/24/solid";
const ProfilePrompt: React.FC = () => {
  return (
    <div className="bg-white p-4 my-4 rounded-lg border-2 border-solid border-[#51ff85]">
      <div className="flex items-center space-x-4 p-4">
        <img
          className="w-12 h-12 rounded-full"
          src="/img/zozo.png"
          alt="User"
        />
        <input
          type="text"
          placeholder="What's on your mind, Vinayaka?"
          className="flex-1 border-2 border-solid border-[#51ff85] rounded-full py-2 px-4 focus:outline-none focus:border-green-300"
        />
      </div>

      <div className="flex justify-around mt-4">
        <button className="text-green-600 font-semibold bg-transparent flex items-center gap-2">
          {" "}
          <span>
            <VideoCameraIcon className="w-5 h-5 cursor-pointer border-2 border-solid border-[#51ff85] rounded-full p-1 text-rose-500" aria-hidden="true" />
          </span>{" "}
          Live video
        </button>
        <button className="text-green-600 font-semibold bg-transparent flex items-center gap-2">
          {" "}
          <span>
            <PhotoIcon className="w-5 h-5 cursor-pointer border-2 border-solid border-[#51ff85] rounded-full p-1 text-springgreen" aria-hidden="true" />
          </span>
          Photo/Video
        </button>
        <button className="text-green-600 font-semibold bg-transparent flex items-center gap-2">
          {" "}
          <span>
            <FaceSmileIcon className="w-5 h-5 cursor-pointer text-yellow-300 border-2 border-solid border-[#51ff85] rounded-full p-1 " aria-hidden="true" />
          </span>
          Feeling/Activity
        </button>
      </div>
    </div>
  );
};

export default ProfilePrompt;
