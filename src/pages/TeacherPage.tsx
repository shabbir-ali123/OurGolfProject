import React, { useEffect, useState } from "react";
import StudentTabs from "../components/StudentTabs";
import StudentList from "../components/StudentList";
import StudentEventBoxes from "../components/StudentEventBoxes";
import TeacherCalSec from "../components/TeacherCalSec";
import SearchAndFiltersStudent from "../components/SearchStudent";
import StudentConDetail from "../components/StudentConDetail";
import ReschedulePop from "../components/ReschedulePop";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
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
  bookShifts: [];
  nickName: string;
}
const TeacherProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"teacher" | "student">(
    "teacher"
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          API_ENDPOINTS.GETTEACHERBOOKEDAPPOINTMENTS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              page: 1,
              pageSize: 20,
              userId: 2,
            },
          }
        );
        if (response.data && response.data.bookedAppointments) {
          const teachers = Array.isArray(response.data.bookedAppointments)
            ? response.data.bookedAppointments
            : [response.data.bookedAppointments];
          setSelectedTeacher(teachers);
        }
      } catch (error: any) {
        toast.error(`Error Fetching Teachers ${error.message}`, toastProperties as ToastConfig);
      }
    };
    fetchTeachers();
  }, []);
  const handleSelectTab = (tab: "teacher" | "student") => {
    setSelectedTab(tab);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const handleSelectTime = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };
  const handleBookAppointment = () => {
    console.log("Booking appointment logic");
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="grid grid-cols-11 gap-0 mx-0 md:px-16 lg:px-16 xl:px-8 ">
      <div className="col-span-12 xl:col-span-4 p-4 h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInLeft">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={handleSelectTab}
          showTabs={true}
          description=""
          profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="John Miler"
        />
        <StudentEventBoxes />
        <TeacherCalSec />
      </div>
      <div className="col-span-12 px-4 md:col-span-12 lg:col-span-12 xl:col-span-3 py-0- lg:overflow-y-auto scrollbar lg:max-h-screen animate__animated animate__fadeInLeft">
        <SearchAndFiltersStudent />
        {selectedTeacher.map((item: any, index: any) => {
          return (
            <StudentList
              key={index}
              scheduleId={item.scheduleId}
              day={item.day}
              startTime={item.startTime}
              endTime={item.endTime}
              status={item.status}
              email={item.bookedShifts.email}
              userName={item.bookedShifts.nickName}
              openModal={openModal}
              handleBookAppointment={handleBookAppointment}
            />
          );
        })}
        <style>{`
        @media screen and (min-width: 768px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
          }
                .scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height:10px;
                }
                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }
                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
      </div>
      <div className="col-span-12 xl:col-span-4 p-4  bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInRight ">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={false}
          description='" ning processes to achieve superior results"'
          profilePic="/img/student.png"
          name="Vivek Kumar"
        />
        <StudentConDetail />
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
          <div className="max-w-md p-8 mx-auto bg-white rounded-lg animate__animated animate__lightSpeedInRight">
            <ReschedulePop
              onSelectTime={handleSelectTime}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default TeacherProfile;
