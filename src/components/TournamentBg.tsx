import React from "react";

const TournmentBg: React.FC = () => {
  return (
    <div>
      <div
        className="col-span-8 w-full mx-auto max-w-6xl flex items-center justify-center rounded-3xl mt-4 py-6"
        style={{
          backgroundImage: "url(/img/tournament.png)",
          backgroundSize: "cover",
          height: "auto",
        }}
      >
        <div>
          <h2 className="text-white text-xl font-bold font-sans lg:text-[64px]">
            Tournament
          </h2>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button className="bg-[#52FF86] hover:bg-blue-700 text-[#ffffff]  py-4 px-5 rounded text-3xl font-bold">
          Create Event
        </button>
      </div>
    </div>
  );
};

export default TournmentBg;
