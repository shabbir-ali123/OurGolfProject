import React, { useState, useEffect, ChangeEvent } from "react";
import TournamentBg from "../components/TournamentBg";
import BasicInfo from "../components/BasicInfo";
import Recuitments, { Tab } from "../components/Recruitment";
import ItemInstruction from "../components/ItemInstruction";
import ScoringCategory from "../components/ScoringCategory";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import PaymentDetails, { Click } from "../components/PaymentDetails";
import { ToastProvider } from "../utils/ToastProvider";
import { useToast } from "../utils/ToastProvider";
import { useTranslation } from "react-i18next";
import { object } from "prop-types";

interface CreateEventType {
  id?: number;
  eventType?: string;
  eventName?: string;
  files?: File[] | null;
  video?: string;
  eventDetails?: string;
  eventVideoUrl?: string;
  categories?: string;
  place?: string;
  placeCoordinates?: { lat: string; lng: string };
  capacity?: number;
  selfIncluded?: boolean;
  eventStartDate?: string;
  eventStartTime?: string;
  eventEndDate?: string;
  eventEndTime?: string;
  recruitmentStartDate?: string;
  recruitmentStartTime?: string;
  eventDeadlineDate?: string;
  eventDeadlineTime?: string;
  matchType?: string;
  paymentType?: string;
  bankName?: string;
  branchName?: string;
  accountHolderName?: string;
  accountNumber?: number;
  paypalId?: string;
  teamSize?: number;
  participationFee?: number;
  isEventPublished?: boolean;
  hideParticipantName?: boolean;
  isRequiresApproval?: boolean;
  scoringType?: string;
  selectedHoles?: string[];
  shotsPerHoles?: string[];
  driverContest?: number;
  nearPinContest?: number;

}

const CreateEvent: React.FC = () => {


  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState<CreateEventType>({
    eventType: "",
    eventName: "",
    files: null,
    eventDetails: "",
    eventVideoUrl: "",
    categories: "",
    place: "",
    placeCoordinates: {
      lat: "",
      lng: "",
    },
    capacity: 0,
    selfIncluded: false,
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    recruitmentStartDate: "",
    recruitmentStartTime: "",
    eventDeadlineDate: "",
    eventDeadlineTime: "",
    matchType: "",
    paymentType: "",
    bankName: "",
    branchName: "",
    accountNumber: 0,
    accountHolderName: "",
    paypalId: "",
    teamSize: 0,
    participationFee: 0,
    isEventPublished: false,
    hideParticipantName: false,
    isRequiresApproval: false,
    scoringType: "",
    selectedHoles: [],
    shotsPerHoles: [],
    driverContest: 0,
    nearPinContest: 0,
  });
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Check if the event is from an input element and the type is checkbox
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const { checked } = e.target;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleScoringTypeChange = (
    scoringType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, id, checked } = event.target;
    const updatedScoringType = checked ? name : "";
    if (scoringType === "holes") {
      let holes: string[] = formData.selectedHoles || [];
      if (holes.includes(id)) {
        holes = holes.filter((i) => i === id);
      } else {
        holes.push(id);
      }
      setFormData({ ...formData, selectedHoles: holes });
    } else {
      setFormData({ ...formData, scoringType: updatedScoringType });
    }
  };
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (submitting) {
      return;
    }
    setSubmitting(true); // Set submitting to true
    const selectedScoringType = localStorage.getItem('score');
    const selectedHoles = localStorage.getItem('selected') || '[]';
    const numberArray = JSON.parse(selectedHoles).map((str: string) => parseInt(str, 10));


    const updatedFormData: any = {
      ...formData,
      selectedScoringType: selectedScoringType,
      selectedHoles: numberArray,
      shotsPerHoles: numberArray
    };
    const formdata = new FormData();
    Object.keys(updatedFormData).map((key) => {
      let value: any = updatedFormData?.[key]
      console.log({ key, value })
      if (key === 'files' && value) {
        for (let i = 0; i < value.length; i++) {
          let fil = value[i]
          console.log({ key, fil })
          formdata.append('files[]', fil)
        }
      }
      else if (key === 'placeCoordinates') {
        formdata.append('placeCoordinates[lat]', updatedFormData.placeCoordinates.lat);
        formdata.append('placeCoordinates[lng]', updatedFormData.placeCoordinates.lng);
      }
      else {
        formdata.append(key, value)
      }

    })

    try {
      const response = await axios.post(API_ENDPOINTS.CREATEEVENT, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });

      if (response.status === 201) {
        showToast("Event created successfully", "green");
        localStorage.removeItem('score');
        localStorage.removeItem('selected');
      } else {
        showToast("Error occurred while creating the event", "[#FF0000]");
      }
    } catch (error) {
      showToast("Error occurred while creating the event", "[#FF0000]");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
      console.log(formData, "shabbir");

    }
  };

  const handlePaymentDetailsChange = (
    formDataUpdate: any,
    paymentType: Click
  ) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formDataUpdate,
      paymentType,
    }));
  };

  const handleRecruitmentTabsChange = (formDataUpdate: any, eventType: Tab) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formDataUpdate,
      eventType,
    }));
  };

  return (
    <ToastProvider iconColor="white" textColor="white">
      <div
        // style={{
        //   backgroundImage: "url(/img/golfbgg.jpg)",
        //   backgroundSize: "cover",
        //   height: "auto",
        // }}
        className="p-10 rounded-2x"
      >
        <div className=" animate__animated animate__lightSpeedInRight">
          <TournamentBg />
        </div>

        <form method="post" id="foirm" encType="multipart/form-data">
          <BasicInfo onChange={handleChange} setFormData={setFormData} />

          <Recuitments onChange={handleRecruitmentTabsChange} />

          <ItemInstruction />
          <ScoringCategory
            onChange={handleScoringTypeChange}
            onInputChange={handleChange}
            selectedHoles={formData.selectedHoles || []}
          />

          <PaymentDetails onChange={handlePaymentDetailsChange} />
          <div className="p-2 ">
            <div className="">
              <div className="flex justify-center gap-2 mx-4">
                <div className="py-6">
                  <button
                    type="button"
                    className=" glow-on-hover  text-white bg-[#52FF86] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {t("PREV")}
                  </button>
                  <button

                    onClick={handleSubmit}
                    className="glow-on-hover hover:rotate-45 transform transition duration-300 ease-in-out text-black bg-[#ffff] border border-[#52FF86] shadow-xl ring-blue-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {t("NEXT")}
                  </button>
                  <button className="cursor-pointer text-white bg-[#FE2E00] hover:bg-blue-800  focus:outline-none  focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 hover:scale-105 transform transition duration-300 ease-in-out">
                    {t("CLEAR")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center p-6 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
          <div className="flex items-center gap-10">
            <div className="relative w-[90.5px] h-[147.5px]">
              <img
                className="absolute top-[60px] left-[0px] w-[90.5px] h-[87.5px]"
                alt=""
                src="/img/ellipse-2303.svg"
              />
              <img
                className="absolute top-[0px] left-[22.5px] w-[58px] h-[108px] object-cover"
                alt=""
                src="/img/rectangle-1249@2x.png"
              />
            </div>
            <h2 className="tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-21xl">About Event</h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Event Name</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2 rounded-sm ">hdasjkhd</h3>
            </div>
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Event Details</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2 rounded-sm ">ewqeqw</h3>
            </div>
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Event Location</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2 rounded-sm ">fffsdf</h3>
            </div>
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Team Size</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2 rounded-sm ">wwwwee</h3>
            </div>
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Total Players</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2 rounded-sm ">fsdfsf</h3>
            </div>
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Event Start Date</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2">fsdfsdfsd</h3>
            </div>
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Event End Date</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2 rounded-sm ">fsdfsdf</h3>
            </div>
            <div className="flex flex-col mx-2 ">
              <span className="text-gray-500">Application Deadline</span>
              <h3 className="text-lg  text-[#17b3a6] mt-1 w-full uppercase border-solid border-b-2 p-2 rounded-sm ">weweeqweq</h3>
            </div>
          </div>


        </div>
      </div>
    </ToastProvider>
  );
};

export default CreateEvent;
