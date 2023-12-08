import React, { useState, useEffect, ChangeEvent  } from "react";
import TournamentBg from "../components/TournamentBg";
import BasicInfo from "../components/BasicInfo";
import Recruitment from "../components/Recruitment";
import ItemInstruction from "../components/ItemInstruction";
import ScoringCategory from "../components/ScoringCategory";
import PaymentDetails from "../components/PaymentDetails";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { Any } from "react-spring";

const CreateEvent: React.FC = () => {
  const [value, setValue] = useState('');
  const [formData, setFormData] = useState({
    eventType: "Practice",
    eventName: "",
    imageUrl: "",
    eventDetails:
      "",
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        // Adjust the status code based on your API response
        // Handle success (e.g., redirect, show success message)
      } else {
        // Handle other status codes (e.g., show error message)
        setError("Error Occurred");
      }
    } catch (error) {
      setError((error as any)?.response?.data?.message || "Error Occurred");
      console.error("Error:", error);
    }
  };
  const handleCheckboxChange = (isChecked: any) => {
    // Do something with the new state of the checkbox
    console.log('Checkbox is checked:', isChecked);
  };
  return (
    <div>
      <div className=" animate__animated animate__lightSpeedInRight">
        <TournamentBg />
      </div>
      <form onSubmit={handleSubmit}>
       
          <BasicInfo onChange={handleChange}  />
        
        <Recruitment  onChange={handleCheckboxChange}  defaultChecked={true} />

        <ItemInstruction  />
        <ScoringCategory />
        <PaymentDetails />
      </form>
    </div>
  );
};

export default CreateEvent;
