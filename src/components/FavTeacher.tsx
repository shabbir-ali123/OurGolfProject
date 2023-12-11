import React from "react";

const FavoriteTeachers: React.FC = () => {
  const imageUrls = [
    "/img/ellipse-111@2x.png",
    "/img/ellipse-13@2x.png",
    "/img/ellipse-14@2x.png",
    "/img/ellipse-134@2x.png",
    "/img/ellipse-131@2x.png",
    "/img/ellipse-132@2x.png",
    "/img/ellipse-133@2x.png",
    "/img/ellipse-137@2x.png",
    "/img/ellipse-136@2x.png",
  ];

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-black font-sans font-bold text-xl ">
          Favorite Teachers
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#51ff85] shadow-sm ring-1 ring-inset ring-[#52FF86] hover:bg-gray-50 hover:animate-bounce"
        >
          View All
        </button>
      </div>
      <div className="flex flex-wrap justify-between auto-rows-max mx-auto gap-3 my-4 md:grid-flow-col lg:grid-flow-col xl:grid-flow-col relative">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="relative">
            <div className="text-center relative">
              <div className="border-6 border-solid border-green-500 inline-block relative">
                <img
                  className="absolute h-16 w-16 rounded-full -mt-4"
                  style={{ marginLeft: `-${index * 1}rem` }} // Adjust the unit as needed
                  src={imageUrls[index % imageUrls.length]}
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteTeachers;
