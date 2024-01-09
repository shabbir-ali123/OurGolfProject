import React, { useEffect, useRef, useState } from "react";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import InputWithIcon from "../components/InputWithIcon";
import ProfileAvatar from "../components/ProfileAvatar";
import CalendarSlider from "../components/CalendarSlider";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useTranslation } from "react-i18next";
import { fetchUser } from "../utils/fetchEvents";

const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  // State to manage user data
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    fetchUser(setUser); // Fetch user data when the component mounts
  }, []);

  // Function to handle changes in input fields and update user data
  const handleChange = async (fieldName: string, newValue: string) => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      const headers: any = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const updatedUser = {
        ...user,
        [fieldName]: newValue,
      };

      const response = await axios.put(
        `${API_ENDPOINTS.UPDATEUSER}`,
        updatedUser, // Send the updated user data in the request body
        {
          headers,
          params:{
            userId: id
          },
        }
      );

      setUser(updatedUser); // Update the user state with the updated data
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="py-8">
      <form onSubmit={(e) => e.preventDefault()}>
        <ProfileAvatar
          pname=""
          icon={<ShareIcon />}
          label={t("FIRST_NAME")}
          imageUrl={user.imageUrl || "/img/zozo.png"}
          onChangeImage={(file) => {
            console.log("Selected file:", file);
          }}
          placeholder={t("FIRST_NAME")}
          colSpanSm={6}
          colSpanMd={4}
          colSpanLg={2}
        />

        <section className="h-full max-w-6xl mx-auto mt-6 text-center">
          <div className="w-full py-6 text-start">
            <label className="text-lg font-bold" htmlFor="aboutMe">
              {t("ABOUT")}
            </label>
            <textarea
              id="aboutMyself"
              name="aboutMyself"
              value={user.aboutMyself || ""}
              onChange={(e) => handleChange("aboutMyself", e.target.value)}
              rows={4}
              className="w-full border border-[#51ff85]"
              placeholder={t("BIO")}
            ></textarea>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-2 gap-4 text-start">
              <InputWithIcon
                pname="firstName"
                icon={<UserIcon />}
                label={t("FIRST_NAME")}
                value={user.nickName || ""}
                onChange={(value) => handleChange("firstName", value.target.value)}
                placeholder={t("ENTER_FIRST_NAME")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="lastName"
                icon={<UserIcon />}
                label={t("LAST_NAME")}
                value={user.lastName || ""}
                onChange={(value) => handleChange("lastName", value.target.value)}
                placeholder={t("ENTER_LAST_NAME")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
           
              <InputWithIcon
                pname="phoneNumber"
                icon={<PhoneIcon />}
                label={t("MOBILE")}
                value={user.phoneNumber || ""}
                onChange={(value) => handleChange("phoneNumber", value.target.value)}
                placeholder={t("ENTER_MOBILE")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="location"
                icon={<MapPinIcon />}
                label={t("LOCATION")}
                value={user.location || ""}
                onChange={(value) => handleChange("location", value.target.value)}
                placeholder={t("ENTER_LOCATION")}
                colSpanSm={6}   
                colSpanMd={4}
                colSpanLg={2}
              />
            </div>

            <button
              type="submit"
              className="px-16 py-4 mt-4 text-white glow-on-hover rounded-full text-[20px]"
            >
              {t("UPDATE")}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ProfilePage;
