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
        setTeachers(prevTeachers =>
        prevTeachers.map(t =>
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
          headers: token ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          } : {},
          params: {
            page: 1,
            pageSize: 20,
            search: search,
            location: locationInput,
            availability:availibilty
          },
        });
  
        setTeachers(response.data.teachers);
  
        // Set the first teacher as the selected teacher by default
        if (response.data.teachers && response.data.teachers.length > 0) {
          setSelectedTeacher(response.data.teachers[0]);
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError('error.message');
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
    
    }
  };
  return (
    <>
     <SearchAndFiltersEducator setsearch={setsearch} setLocation={setLocation} setAvailibilty={setAvailibilty}/>
     <div className={gridStyle}>
     {teachers.length === 0 ? (
        <div>Loading...</div>
      ) : (
        teachers.map((teacher: Teacher) => (
          <div
            key={teacher.id}
            className="mt-2 cursor-pointer animate__animated animate__fadeInLeft"
            onClick={() => showTeacherDetails(teacher)}
          >
            <div className="flex justify-between items-end shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-2 relative   "onClick={handleCardClick}>
              <div>
                <div className="flex items-center animate__animated animate__shakeX">
                  <img
                    className="w-10 rounded-full border-solid border-4 border-[#51ff85] "
                    src="/img/profile-page.png"
                    alt=""
                  />
                  <div className="ml-3">
                    <p className="text-xs font-bold tracking-wide text-[#52FF86]  m-0">
                      {teacher.firstName}
                    </p>
                    <p className="text-[9.13px] font-normal text-[#838383] m-0 ">
                      {teacher.location}
                    </p>
                  </div>
                </div>
                <div className="p-2 mt-2 ml-3">
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
                    <li className="flex items-center mb-2 animate__animated animate__fadeInRight">
                      <FontAwesomeIcon
                        icon={faPhoneAlt}
                        className="w-4 h-4 rotate-90 animate__animated animate__heartBeat animate__repeat-3"
                      />
                      <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                        {teacher.phoneNumber}
                      </span>
                    </li>
                    <li className="flex items-center mb-2">
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
