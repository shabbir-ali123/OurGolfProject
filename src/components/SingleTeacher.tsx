// import React, { useState, useEffect } from "react";
// import StudentTabs from "../components/StudentTabs";
// import TeacherList from "../components/TeacherList";
// import StudentEventBoxes from "../components/StudentEventBoxes";
// import StudentCalendar from "../components/StudentCalender";
// import FavTeachers from "../components/FavTeacher";
// import SearchAndFiltersEducator from "../components/SearchAndFilter";
// import TeacherConDetail from "../components/TeacherConDetail";
// import ReschedulePop from "../components/ReschedulePop";
// import axios from "axios";  
// import { API_ENDPOINTS } from "../appConfig";
// interface TeacherDetialsProp{
//   count?: number;
//   teachers?: [];
//   aboutMyself?: string;
//   createdAt?: string[];
//   firstName?: string
//   id?: string;
//   lastName?: string;
//   location?: string;
//   phoneNumber?: string;
//   schedules?: []
//   updatedAt: string;
//   userId: string;  
// }
// interface SingleTeacherPropers{
//   id: any
// }

// const SingleTeacher: React.FC = () => {

//   const [selectedTab, setSelectedTab] = useState<"student" | "teacher">(
//     "student"
//   );
//   const [showModal, setShowModal] = useState(false);
//   const [teachers, setTeachers] = useState<any[]>([]);
//   const handleSelectTab = (tab: "student" | "teacher") => {
//     setSelectedTab(tab);
//   };
//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };
//   const handleSelectTime = (selectedTime: string) => {
//     console.log(`Selected Time: ${selectedTime}`);
//   };
//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(API_ENDPOINTS.GETALLTEACHERS, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           params:{
           
//               page: 1,
//               pageSize: 10,

        
//           }
//         });
    
//         console.log('Response Status:', response.status);
//         console.log('Response Headers:', response.headers);
//         console.log('Response Data:', response.data);
    
//         if ('error' in response.data) {
//           console.error('API Error:', response.data.error);
//           return;
//         }
    
//         setTeachers(response.data);
//       } catch (error: any) {
//         console.error('Error fetching teachers:', error.message);
//         console.log('Detailed Error:', error);
//       }
//     };
    

//     fetchTeachers(); 

//   }, []);
//   const handleBookAppointment = () => {
//     console.log("Booking appointment logic");
//   };
//   const handleCloseModal = () => {
//     setShowModal(false);
//   };
//   return (
//     <>
//       {/* Right Column */}
//       <div className=" col-span-12 xl:col-span-4 p-4  bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInRight ">
//         <StudentTabs
//           selectedTab={selectedTab}
//           onSelectTab={setSelectedTab}
//           showTabs={false}
//           description='" ning processes to achieve superior results"'
//           profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//           name="Cinderella"
//         />
//         <TeacherConDetail />
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center ">
//           <div className="bg-white p-8 max-w-md mx-auto rounded-lg animate__animated animate__fadeInLeft">
//             <ReschedulePop
//               onSelectTime={handleSelectTime}
//               onClose={handleCloseModal}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SingleTeacher;
