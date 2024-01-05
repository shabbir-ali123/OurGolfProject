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

const EditTeacher: React.FC = () => {
  const [formData, setFormData] = useState({
    aboutMe: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    location: ''
  });

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
  };

  return (
    <div>
      <ProfileAvatar
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

      <section className="h-full max-w-6xl mx-auto text-center ">
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

        <form className="grid grid-cols-2 gap-4 text-start" onSubmit={(e) => handleFormSubmit(e)}>
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
          <button type="submit">Submit</button>
        </form>

        <TeacherAvail />
      </section>
    </div>
  );
};

export default EditTeacher;
