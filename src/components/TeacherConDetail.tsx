  import React from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faMapMarkerAlt,
    faPhoneAlt,
    faEnvelope,
    faWifi,
  } from "@fortawesome/free-solid-svg-icons";
  import DropDown from "./DropDown";
  import AvailabilityTabs from "./AvailavilityTabs";
  import { TeacherDetailsProp, SchedulesTabsProps } from "../utils/types";
  import { useTranslation } from "react-i18next";

  export const TeacherConDetail: React.FC<{ teacherDetails: TeacherDetailsProp }> = ({ teacherDetails }) => {
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();

    const handleSelectTime = (selectedTime: string) => {
      console.log("Selected Time:", selectedTime);
    };

    // Extract start dates from schedules
    // Extract start dates from schedules
    const day: (string | undefined)[] = (teacherDetails.schedules || []).flatMap(schedule => (
      schedule?.shifts.map(es => es.day)
    ));
    return (
      <div className="box">
        <div className="grid my-0">
          <div className="text-center">
            <div className="animate__heartBeat">
              <img
                className="inline-block h-24 w-24 rounded-full border-solid border-[4px] border-[#51ff85] hover:animate-bounce"
                src={teacherDetails?.imageUrl}
                alt=""
              />
            </div>
            <div className="py-3">
              <p className="m-0 font-sans text-base font-bold text-black group-hover:text-gray-900">
                {teacherDetails.firstName} {teacherDetails.lastName}
              </p>
              <p className="font-sans text-xs font-normal text-gray-700">
                {teacherDetails.aboutMyself}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className=" text-[#51ff85] animate-bounce"
              />
            </div>
            <h3 className="font-sans text-xs font-bold text-black">{t('LOCATION')}</h3>
          </div>
          <div className="div">
            <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">
              {teacherDetails.location || 'available'}
            </p>
          </div>
        </div>

        <div className="grid my-0">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
              <FontAwesomeIcon
                icon={faPhoneAlt}
                className=" text-[#51ff85] animate-bounce"
              />
            </div>
            <h3 className="font-sans text-xs font-bold text-black">{t('MOBILE')}</h3>
          </div>
          <div className="div">
            <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">
              {teacherDetails.phoneNumber || 'not available'}
            </p>
          </div>
        </div>

        <div className="grid my-0">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className=" text-[#51ff85] animate-bounce"
              />
            </div>
            <h3 className="font-sans text-xs font-bold text-black">{t('HOURLY')}</h3>
          </div>
          <div className="div">
            <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">
              ¥{teacherDetails.hourlyRate || ' not available'}/Hr
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
              <FontAwesomeIcon
                icon={faWifi}
                className=" text-[#51ff85] animate-bounce"
              />
            </div>
            <h3 className="font-sans text-xs font-bold text-black">
              {t('AVAILABILITY')}
            </h3>
          </div>
          <div className="div">
            <DropDown timeSlots={day} />

          </div>
        </div>

        <AvailabilityTabs onSelectTime={handleSelectTime} schedules={teacherDetails.schedules} />
      </div>
    );
  };
  export default TeacherConDetail;
