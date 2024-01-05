import React, { useState } from "react";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon
} from "@heroicons/react/24/solid";
import InputWithIcon from "../components/InputWithIcon";
import TeacherAvail from "../components/TeacherAvail";
import ProfileAvatar from "../components/ProfileAvatar";
import { ShareIcon } from "@heroicons/react/20/solid";

const EditTeacher: React.FC = () => {
  const [formData, setFormData] = useState({
    aboutMe: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    location: ''
  });
  const [teachAvailData, setTeachAvailData] = useState({}); // Step 1

  const handleTeachAvailDataChange = (e:any, newData: any) => { // Callback function
    e.stopPropagation();
    setTeachAvailData(newData);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Teach Availability Data:', teachAvailData);
  };

  return (
    <div className="py-8">
         <ProfileAvatar
            pname=""
            icon={<ShareIcon />}
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
   
    <section className="h-full max-w-6xl mx-auto mt-6 text-center">
      <div className="w-full py-6 text-start">
      <label className="text-lg font-bold" htmlFor="aboutMe">About Me:</label>
      <textarea
        id="aboutMe"
        name="aboutMe"
        value={formData.aboutMe}
        onChange={handleChange}
        rows={4}
       className="w-full border border-[#51ff85]"
        placeholder="Tell us about yourself..."
      ></textarea>
      </div>
  
      <div className="py-6">
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4 text-start">
          <InputWithIcon
            pname="firstName"
            icon={<UserIcon />}
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname="lastName"
            icon={<UserIcon />}
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname="email"
            icon={<EnvelopeOpenIcon />}
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname="mobile"
            icon={<PhoneIcon />}
            label="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
          <InputWithIcon
            pname="location"
            icon={<MapPinIcon />}
            label="Location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            colSpanSm={6}
            colSpanMd={4}
            colSpanLg={2}
          />
           
        </div>
        <TeacherAvail onTeachAvailDataChange={handleTeachAvailDataChange}/>

        <button
          type="submit"
          className="px-16 py-4 mt-4 text-white glow-on-hover rounded-full text-[20px]"
        >
          Update
        </button>
        </form>
      </div>
       
      </section>
    </div>
  );
};

export default EditTeacher;
