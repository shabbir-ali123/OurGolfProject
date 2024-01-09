import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios"; // Import axios for API requests
import { API_ENDPOINTS } from "../appConfig";
interface Teacher {
  count?: number;
  teachers?: [];
  aboutMyself?: string;
  createdAt?: string | string[];
  firstName?: string;
  id?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
  schedules?: [];
  updatedAt: string;
  userId: string;

}
const FavoriteTeachers: React.FC = () => {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();
  const [favoriteTeachers, setFavoriteTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    const fetchFavoriteTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.GETFAVORITETEACHER, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params:{
            userId:1
          }
        });
        console.log(response, 'sdfd')

        // if (response.data && response.data.teachers) {
        //   setFavoriteTeachers(response.data.teachers);
        // } else {
        //   console.log("No favorite teachers found");
        // }
      } catch (error: any) {
        console.error("Error fetching favorite teachers:", error.message);
      }
    };

    fetchFavoriteTeachers();
  }, []);
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
      {favoriteTeachers.map((teacher: Teacher, index: number) => (
          <div key={index} className="relative">
            <div className="relative text-center">
              <div className="relative inline-block border-green-500 border-solid border-6">
               <h2>{teacher.id}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteTeachers;
