import React, { useState, useEffect } from "react";
import TeacherListButton from "./TeacherListButton";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReschedulePop from "../components/ReschedulePop";
import { getTeacherById } from "../utils/getTeacherById";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useTranslation } from "react-i18next";
import SearchAndFiltersEducator from "./SearchAndFilter";
import { useNavigate } from "react-router-dom";

interface TeacherListProps {
  openModal: () => void;
  showTeacherDetails: (teacher: Teacher) => void;
  isUserAuthenticated: boolean; // Add this line
}

interface Teacher {
  aboutMyself?: string;
  createdAt?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
  schedules?: [];
  updatedAt: string;
  userId: string;
  hourlyRate: string;
  isFavorite: boolean;
}

const TeacherList: React.FC<TeacherListProps> = ({
  openModal,
  showTeacherDetails,
  isUserAuthenticated,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setsearch] = useState<string | null>(null);
  const [locationInput, setLocation] = useState<string | null>(null);
  const [availibilty, setAvailibilty] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const toggleFavoriteStatus = async (teacher: Teacher) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_ENDPOINTS.FAVORITETEACHER,
        { teacherId: teacher.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTeachers((prevTeachers) =>
        prevTeachers.map((t) =>
          t.id === teacher.id ? { ...t, isFavorite: !t.isFavorite } : t
        )
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;

        if (token) {
          endpoint = API_ENDPOINTS.GETALLTEACHERS;
        }

        const response = await axios.get(endpoint, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }
            : {},
          params: {
            page: 1,
            pageSize: 20,
            search: search,
            location: locationInput,
            availability: availibilty,
          },
        });

        setTeachers(response.data.teachers);

      
        if (response.data.teachers && response.data.teachers.length > 0) {
          setSelectedTeacher(response.data.teachers[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      
        
        const errorMessage = (error as Error).message;
        setError(errorMessage);
      
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [search, locationInput, availibilty]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSelectTime = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };

  const handleBookAppointment = () => {
    setShowModal(false);
    handleSelectTime("Default Appointment Time");
  };

  const handleButtonAction = (btnTitle: string, teacher: Teacher) => {
    switch (btnTitle) {
      case "Like":
        toggleFavoriteStatus(teacher);
        break;
      case "Book an Appointment":
        openModal();
        if (handleBookAppointment) {
          handleBookAppointment();
        }
        break;
    }
  };

  const gridStyle = !isUserAuthenticated
    ? "grid grid-cols-4 gap-4"
    : "";

  const handleCardClick = () => {
    if (!isUserAuthenticated) {
      navigate("/login-page");
    } else {
      // Handle the case when the user is authenticated
    }
  };

  const cardStyle = !isUserAuthenticated
    ? "w-full flex-inline rounded-[30px] p-2 relative animate__animated animate__fadeInLeft"
    : "";

  const cardContentStyle = !isUserAuthenticated
    ? "flex flex-col items-center"
    : "flex justify-between items-end";

  const contactInfoStyle = !isUserAuthenticated
    ? "mb-2"
    : "mb-2 animate__animated animate__fadeInRight";
    const textFontSize = !isUserAuthenticated ? "text-lg" : "text-[9.96px]";
    const buttonSize = !isUserAuthenticated ? "w-16 h-16" : "w-10 h-10"; 
    const imageWidth = !isUserAuthenticated ? "w-20 h-20" : "w-10 h-10"; 
  return (
    <>
      <SearchAndFiltersEducator
        setsearch={setsearch}
        setLocation={setLocation}
        setAvailibilty={setAvailibilty}
      />
      <div className={gridStyle}>
        {teachers.length === 0 ? (
          <div>no teacher found</div>
        ) : (
          teachers.map((teacher: Teacher) => (
            <div
              key={teacher.id}
              className={`mt-2 cursor-pointer ${cardStyle}`}
              onClick={() => showTeacherDetails(teacher)}
            >
              <div
                className={` rounded-[30px] p-2 relative ${cardContentStyle}`}
                onClick={handleCardClick}
                style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
              >
                <div>
                  <div className="flex items-center animate__animated animate__shakeX">
                    <img
                      className="${imageWidth} w-10 rounded-full border-solid border-4 border-[#51ff85] "
                      src="/img/profile-page.png"
                      alt=""
                    />
                    <div className={`ml-2 ${textFontSize}`}>
                      <p className="text-xs font-bold tracking-wide text-[#52FF86]  m-0">
                        {teacher.firstName}
                      </p>
                      <p className="text-[9.13px] font-normal text-[#838383] m-0 ">
                        {teacher.location}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-2 mt-2 ml-3 ${contactInfoStyle}`}
                  >
                    <ul className="p-0 m-0 list-none">
                      <li className="flex items-center mb-2">
                        <img
                          className="w-[22.39px] h-[12.45px]  "
                          src="/img/stars.png"
                          alt=""
                        />
                        <span className="ml-6 font-normal text-[9.96px] leading-3">
                          4.5(1300 ratings)
                        </span>
                      </li>
                      <li className={`flex items-center ${contactInfoStyle}`}>
                        <FontAwesomeIcon
                          icon={faPhoneAlt}
                          className="w-4 h-4 rotate-90 animate__animated animate__heartBeat animate__repeat-3"
                        />
                        <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                          {teacher.phoneNumber}
                        </span>
                      </li>
                      <li className={`flex items-center ${contactInfoStyle}`}>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="w-4 h-4 animate__animated animate__heartBeat animate__repeat-3 "
                        />
                        <span className="ml-6 font-normal text-[9.96px] leading-3">
                          sheetalviven@gmail.com
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="absolute top-[-2px] right-[-2px] flex  animate-pulse ">
                  <img className="w-16 " src="/img/teacher_rate.png" alt="" />
                  <span className="absolute flex items-center justify-center w-full h-full text-base font-bold tracking-wide ">
                    ¥{teacher.hourlyRate}
                    <sub className="font-normal text-[5px] tracking-wide ">
                      Per/Hr
                    </sub>
                  </span>
                </div>
                <div className="gap-2">
                  <TeacherListButton
                    color="bg-[#0038FF]"
                    title="Book an Appointment"
                    icon="/img/appointment.svg"
                    onClick={() => {
                      openModal();
                      if (handleBookAppointment) {
                        handleBookAppointment();
                      }
                    }}
                  />
                  <TeacherListButton
                    color={teacher.isFavorite ? "bg-black" : "bg-[#FF0000]"}
                    title="Like"
                    icon="/img/like.svg"
                    onClick={() => handleButtonAction("Like", teacher)}
                  />
                  <TeacherListButton
                    color="bg-[#52FF86]"
                    title="View Details"
                    icon="/img/details.svg"
                    textColor="#FF0000"
                    onClick={() => handleButtonAction("View Details", teacher)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="max-w-md p-8 mx-auto bg-white rounded-lg">
            <ReschedulePop
              onSelectTime={handleSelectTime}
              onClose={handleBookAppointment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherList;
 