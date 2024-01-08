import React from "react";
import { useTranslation } from "react-i18next";

const FavoriteTeachers: React.FC = () => {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();
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
        <h3 className="font-sans text-xl font-bold text-black ">
         {t('FAVOURITE_TEACHERS')}
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#51ff85] shadow-sm ring-1 ring-inset ring-[#52FF86] hover:bg-gray-50 hover:animate-bounce"
        >
          {t('VIEW_ALL')}
        </button>
      </div>
      <div className="relative flex flex-wrap justify-between gap-3 mx-auto my-4 auto-rows-max md:grid-flow-col lg:grid-flow-col xl:grid-flow-col">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="relative">
            <div className="relative text-center">
              <div className="relative inline-block border-green-500 border-solid border-6">
                <img
                  className="absolute w-16 h-16 -mt-4 rounded-full"
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
