import React, { useState } from "react";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReschedulePop from "../components/ReschedulePop";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
// import acceptIcon from '/public/img/accept.svg'
// import rejectIcon from '/public/img/reschedule.svg'
interface StudentListProps {
  openModal: () => void;
  handleBookAppointment?: () => void;
  userName?: string;
  email?: string;
}
const StudentList: React.FC<StudentListProps> = ({
  openModal,
  userName,
  email,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [bookAppointment, setBookAppointment] = useState({
    scheduleId: "",
    day: "",
    startTime: "",
    endTime: "",
    status: ""
  })
  const handleSelectTime = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };
  const handleBookAppointment = () => {
    setShowModal(false);
    handleSelectTime("Default Appointment Time");
  };

  const handleRejectClick = () => {
    openModal();
    if (handleBookAppointment) {
      handleBookAppointment();
    }
  };

  const handleAcceptClick = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(API_ENDPOINTS.BOOKAPPOINTMENT, bookAppointment);

      if (response.status === 200) {
        console.log(response.data)
      }
    } catch (error) {
      alert(
        (error as any)?.response?.data?.message || "We are not able to Login"
      );
    } finally {
      console.log('okays')
    }
  };
  
  return (
    <>
      <div className="mt-6 cursor-pointer animate__animated animate__fadeInLeft">
        <div className="flex justify-between items-center shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-4 relative    ">
          <div>
            <div className="flex items-center animate__animated animate__bounce">
              <img
                className="h-[55.25px] w-[55.25px] rounded-full border-solid border-4 border-[#51ff85] "
                src="/img/student.png"
                alt=""
              />
              <div className="ml-3">
                <p className="text-xs font-bold tracking-wide text-[#52FF86]  m-0 ">
                  {userName}
                </p>
                <p className="text-[9.13px] font-normal text-[#838383] m-0">
                  Bogotá,Colombia
                </p>
              </div>
            </div>
            <div className="p-2 mt-4 ml-3">
              <ul className="p-0 m-0 list-none ">
                <li className="flex items-center mb-2 ">
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="w-4 h-4 rotate-90 animate__animated animate__heartBeat animate__repeat-3 "
                  />
                  <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                    85985-95415
                  </span>
                </li>
                <li className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 " />
                  <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                    {email}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-2 animate__heartBeat">
            <button
              className={`bg-[#0038FF] text-[#ffffff] font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
              onClick={handleAcceptClick}
            >
              <img className="mr-1" src={'acceptIcon'} alt="" />
              <span>Accept</span>
            </button>{" "}
            <button
              className={`bg-[#FF0000] font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
              onClick={handleRejectClick}
            >
              <img className="mr-1" src={'rejectIcon'} alt="" />
              <span>Reject</span>
            </button>
            {/* {buttons.map((btn, index) => (
              <StudentListButton
                key={index}
                color={btn.color}
                title={btn.title}
                icon={btn.icon}
                onClick={btn.onClick}
                textColor={btn.textColor}
              />
            ))} */}
          </div>
        </div>
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
export default StudentList;
