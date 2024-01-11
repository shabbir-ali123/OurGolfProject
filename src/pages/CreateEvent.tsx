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
import { useToast } from '../utils/ToastProvider';
import { useTranslation } from "react-i18next";



interface CreateEventType{
  id?: number;
    eventType?: string;
    eventName?: string;
    imageUrl?: string[];
    video?: string
    eventDetails?: string;
    eventVideoUrl?: string;
    categories?: string;
    place?: string;
    placeCoordinates?: { lat: string; lng: string };
    capacity?:number;
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
    branchNumber?: number;
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
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState<CreateEventType>({
    eventType: "",
    eventName: "",
    imageUrl: [],
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
    branchNumber: 0,
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
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ e });
    const { name, value, checked } = e.target;
    if (name === "selfIncluded") {
      setFormData({ ...formData, [name]: checked  });
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
      let holes: string[] = formData.selectedHoles|| [];
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

    try {
      
      const response = await axios.post(API_ENDPOINTS.CREATEEVENT, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        showToast("Event created successfully", "green");

      } else {
        setError("Error Occurred");
        showToast("Error occurred while creating the event", "[#FF0000]");
      }
    } catch (error) {
      setError((error as any)?.response?.data?.message || "Error Occurred");
      showToast("Error occurred while creating the event", "[#FF0000]");
      console.error("Error:", error);
    }finally {
      setSubmitting(false); 
    }
  };

  const handleCheckboxChange = (isChecked: any) => {
    console.log("Checkbox is checked:", isChecked);
  };

  const handlePaymentDetailsChange = (
    formDataUpdate: any,
    paymentType: Click
  ) => {
    // Update your state or perform other actions based on the received data
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formDataUpdate,
      paymentType,
    }));
  };
  const handleRecruitmentTabsChange = (formDataUpdate: any, eventType: Tab) => {
    // Update your state or perform other actions based on the received data
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formDataUpdate,
      eventType,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setFormData({ ...formData, imageUrl: [dataUrl] });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToastProvider iconColor="white" textColor="white">
    <div   >

      <div className=" animate__animated animate__lightSpeedInRight">
        <TournamentBg />
      </div>
      <form method="post" id="foirm">
        <BasicInfo onChange={handleChange} setFormData={setFormData} />

        <Recuitments onChange={handleRecruitmentTabsChange} />

        <ItemInstruction />
        <ScoringCategory
          onChange={handleScoringTypeChange}
          onInputChange={handleChange}
          selectedHoles={formData.selectedHoles || []}
        />

        <PaymentDetails onChange={handlePaymentDetailsChange} />
        <div className="p-2 mx-auto lg:max-w-6xl ">
          <div className="">
            <div className="flex gap-2 mx-4">
              <div className="py-6">
                <button
                  type="button"
                  className=" glow-on-hover  text-white bg-[#52FF86] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t('PREV')}
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="glow-on-hover hover:rotate-45 transform transition duration-300 ease-in-out text-black bg-[#ffff] border border-[#52FF86] shadow-xl ring-blue-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t('NEXT')}
                </button>
                <button className="cursor-pointer text-white bg-[#FE2E00] hover:bg-blue-800  focus:outline-none  focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 hover:scale-105 transform transition duration-300 ease-in-out">
                {t('CLEAR')}
                </button>   
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </ToastProvider>

  );
};

export default CreateEvent;

