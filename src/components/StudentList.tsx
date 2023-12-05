import React, { useState } from "react";
import StudentListButton from "./StudentListButton";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faWifi,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReschedulePop from "../components/ReschedulePop";
const StudentList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSelectTime = (selectedTime: string) => {
    // Handle selected time logic
    console.log(`Selected Time: ${selectedTime}`);
  };
  const handleBookAppointment = () => {
    setShowModal(false)
    handleSelectTime("Default Appointment Time");
    // Additional logic for booking an appointment
  };
  const buttons = [
    {
      color: "bg-[#D3FFE1]",
      title: "11:45 AM - 12:30 AM",
      icon: "",
      textColor: "#FF0000",
    },
    {
      color: "bg-[#0038FF]",
      title: "Accept",
      icon: "/img/accept.svg",
    },
    {
      color: "bg-[#FF0000]",
      title: "Reschedule",
      icon: "/img/reschedule.svg",
      onClick: () => setShowModal(true),
    },
  ];
  return (
    <>
      <div className="mt-6 cursor-pointer animate__animated animate__fadeInLeft">
        <div className="flex justify-between items-center shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-4 relative   ">
          <div>
            <div className="flex items-center animate__animated animate__bounce animate__repeat-3">
              <img
                className="h-[55.25px] w-[55.25px] rounded-full border-solid border-4 border-[#51ff85]"
                src="/img/student.png"
                alt=""
              />
              <div className="ml-3">
                <p className="text-xs font-bold tracking-wide text-[#52FF86]  m-0 ">
                  Vivek Kumar
                </p>
                <p className="text-[9.13px] font-normal text-[#838383] m-0">
                  Bogotá,Colombia
                </p>
              </div>
            </div>
            <div className="mt-4 p-2 ml-3">
              <ul className="list-none m-0 p-0 ">
                <li className="flex items-center mb-2  ">
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="w-4 h-4 rotate-90 animate__animated animate__heartBeat animate__repeat-3 "
                  />
                  <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                    85985-95415
                  </span>
                </li>
                <li className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4  " />
                  <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                    sheetalviven@gmail.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-2 animate__heartBeat">
            {buttons.map((btn, index) => (
              <StudentListButton
                key={index}
                color={btn.color}
                title={btn.title}
                icon={btn.icon}
                onClick={btn.onClick}
                textColor={btn.textColor}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg">
           <ReschedulePop onSelectTime={handleSelectTime} onClick={handleBookAppointment} />
          </div>
        </div>
      )}
    </>
  );
};
export default StudentList;
