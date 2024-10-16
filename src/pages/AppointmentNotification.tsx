import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../appConfig';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { useTeacherContext } from '../contexts/teachersContext';

const AppointmentNotificationPage = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const { activity } = location.state || {}; // Getting the appointment details passed through navigation
    const [loading, setLoading] = useState(false);
    const { isLoading } = useTeacherContext();
    const studentNickName = activity?.bookedShifts?.nickName || localStorage.getItem('nickname');
    const handleAcceptClick = async (item: any) => {
        const { scheduleId, day, startTime, endTime, bookedBy, notificationId = "" } = item;
        let studentId = bookedBy;
        let status = "BOOKED";
        try {
            setLoading(true);
            const response = await axios.post(
                API_ENDPOINTS.ACCEPTAPPOINTMENT,
                { studentId, scheduleId, day, startTime, endTime, status, notificationId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (response.status === 200) {
                toast.success(t("ACCEPT_SUCCESS"));
            }
        } catch (error) {
            toast.error(
                (error as any)?.response?.data?.message || "We are not able to Accept"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDeclineClick = async (item: any) => {
        const { scheduleId, day, startTime, endTime, bookedBy, notificationId = "" } = item;
        let studentId = bookedBy;
        let status = "DECLINED";
        try {
            setLoading(true);
            const response = await axios.post(
                API_ENDPOINTS.DECLINEAPPOINTMENT,
                { studentId, scheduleId, day, startTime, endTime, status, notificationId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (response.status === 200) {
                toast.success(t("DECLINED_SUCCESS"));
            }
        } catch (error) {
            toast.error(
                (error as any)?.response?.data?.message || "We are not able to Accept"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-7xl mx-10 xl:mx-auto'>
            <h2>Appointment Details</h2>
            {activity ? (
                <div className='bg-white px-4 py-4' style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}>
                    <div className='flex gap-6'>
                        {activity?.bookedShifts?.nickName && (
                            <p>Student Name: {activity.bookedShifts.nickName}</p>
                        )}
                        <p>Appointment Time: {activity.startTime}</p>
                        <p>Appointment Day: {activity.day}</p>
                    </div>

                    {activity?.bookedShifts?.nickName && activity?.status === "PENDING" ? (
                        <div className="mt-4 flex gap-2">
                            <button
                                type="button"
                                className="cursor-pointer inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                onClick={() => handleAcceptClick(activity)}
                                disabled={loading || isLoading}
                            >
                                {loading ? "Processing..." : "Approve"}
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer inline-flex items-center rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                                onClick={() => handleDeclineClick(activity)}
                                disabled={loading || isLoading}
                            >
                                {loading ? "Processing..." : "Decline"}
                            </button>
                        </div>
                    ) : (
                        activity?.bookedShifts?.nickName && (
                            <div>
                                <h3>
                                    {activity.status === "BOOKED"
                                        ? "You have accepted the appointment"
                                        : "You have declined the appointment"}
                                </h3>
                                <p>Teacher Name: {activity.bookedShifts.teacherNickName}</p> {/* Show teacher's nickname */}
                            </div>
                        )
                    )}
                </div>
            ) : (
                <p>No appointment details available.</p>
            )}
        </div>
    );
};

export default AppointmentNotificationPage;
