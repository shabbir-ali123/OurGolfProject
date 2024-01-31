import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios"; // Import axios for API requests
import { API_ENDPOINTS } from "../appConfig";
interface User {
  imageUrl: string;
  // ... other properties of User if necessary
}
interface TeacherDetails {
  id: string;
  firstName: string;
  lastName: string;
  User: User;
  // ... other properties of TeacherDetails if necessary
}
interface Teacher {
  imageUrl: string[];
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
  teacherId?: string;
}
interface FavoriteTeacher {
  id: string;
  userId: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  // ... other properties of FavoriteTeacher if necessary
  Teacher: TeacherDetails;
}
const FavoriteTeachers: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [favoriteTeachers, setFavoriteTeachers] = useState<FavoriteTeacher[]>([]);
  useEffect(() => {
    const fetchFavoriteTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
     if(token && token !== "undefined"){
      const userId= localStorage.getItem("id");
      const response = await axios.get(API_ENDPOINTS.GETFAVORITETEACHER, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: userId,
        },
      });
      console.log(response.data, "babuuu");
      if (response.status === 200) {
        setFavoriteTeachers(response.data.favoriteTeachers);
      } else {
        return "get error";
      }
     }
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
          {t("FAVOURITE_TEACHERS")}
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#51ff85] shadow-sm ring-1 ring-inset ring-[#52FF86] hover:bg-gray-50 hover:animate-bounce"
        >
          {t("VIEW_ALL")}
        </button>
      </div>
      <div className="relative flex flex-wrap justify-between gap-3 mx-auto my-4 auto-rows-max md:grid-flow-col lg:grid-flow-col xl:grid-flow-col">
        {favoriteTeachers.map((teacher, index) => (
          <div key={index} className="teacher-card">
            <img
            className="rounded-full w-14 h-14"
              src={teacher.Teacher?.User?.imageUrl ? teacher.Teacher.User.imageUrl : 'default_image_url'}
              alt={`${teacher.Teacher?.firstName} ${teacher.Teacher?.lastName}`}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default FavoriteTeachers;
