import React, { useState, useEffect, ChangeEvent } from "react";
import TournamentBg from "../components/TournamentBg";
import BasicInfo from "../components/BasicInfo";
import Recuitments, { Tab } from "../components/Recruitment";
import ItemInstruction from "../components/ItemInstruction";
import ScoringCategory from "../components/ScoringCategory";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import PaymentDetails, { Click } from "../components/PaymentDetails";
import { Any } from "react-spring";
import { stringify } from "querystring";

const CreateEvent: React.FC = () => {
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState<any>({
    eventType: "",
    eventName: "",
    imageUrl: "",
    eventDetails: "",
    eventVideoUrl: "",
    categories: "",
    place: "",
    placeCoordinates: {
      lat: "",
      lng: "",
    },
    capacity: "",
    selfIncluded: 0,
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    recruitementStartDate: "",
    recruitementStartTime: "",
    eventDeadlineDate: "",
    eventDeadlineTime: "",
    matchType: "",
    paymentType: "",
    bankName: "",
    branchName: "",
    branchNumber: "",
    accountHolderName: "",
    paypalId: "",
    teamSize: "",
    participationFee: "",
    isEventPublished: 0,
    hideParticipantName: 0,
    isRequiresApproval: 0,
    scoringType: "",
    selectedHoles: [],
    shotsPerHoles: [],
    driverContest: "",
    nearPinContest: "",
  });
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ e });
    const { name, value, checked } = e.target;
    if (name === "selfIncluded") {
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
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
      let holes: any[] = formData.selectedHoles;
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

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form Submitted with data:", formData);

    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.CREATEEVENT, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("API Response:", response.data);

      if (response.status === 201) {
      } else {
        setError("Error Occurred");
      }
    } catch (error) {
      setError((error as any)?.response?.data?.message || "Error Occurred");
      console.error("Error:", error);
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
    console.log("Payment Details Change", formDataUpdate, paymentType);
  };
  const handleRecruitmentTabsChange = (formDataUpdate: any, eventType: Tab) => {
    // Update your state or perform other actions based on the received data
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formDataUpdate,
      eventType,
    }));
    console.log("Recruitment Details Change", formDataUpdate, eventType);
  };

  return (
    <div>
      <div className=" animate__animated animate__lightSpeedInRight">
        <TournamentBg />
      </div>
      <form onSubmit={handleSubmit}>
        <BasicInfo onChange={handleChange} />

        <Recuitments onChange={handleRecruitmentTabsChange} />

        <ItemInstruction />
        <ScoringCategory
          onChange={handleScoringTypeChange}
          onInputChange={handleChange}
          selectedHoles={formData.selectedHoles}
        />

        <PaymentDetails onChange={handlePaymentDetailsChange} />
        <div className="lg:max-w-6xl mx-auto p-2 ">
          <div className=" ">
            <div className="mx-4 flex gap-2">
              {/* <button type="submit" onClick={handleSubmit}>
                Submit
              </button> */}
              <div className="py-6">
                <button
                  type="button"
                  className=" glow-on-hover  text-white bg-[#52FF86] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="glow-on-hover hover:rotate-45 transform transition duration-300 ease-in-out text-black bg-[#ffff] border border-[#52FF86] shadow-xl ring-blue-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Next
                </button>
                <button className="cursor-pointer text-white bg-[#FE2E00] hover:bg-blue-800  focus:outline-none  focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 hover:scale-105 transform transition duration-300 ease-in-out">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
