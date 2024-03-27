import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { postContext } from "../contexts/postsContext";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import { UserIcon } from "@heroicons/react/24/outline";
import InputWithIcon from "../components/FormComponents";
interface UpdatePostType {
  firstName: string;
  profileImage: File[];
  portfolioVideo: File[];
  introductionVideo: File[];
}

interface UpdatePostProps {
  closeModal?: () => void;
}

const UpdateTeacher: React.FC<UpdatePostProps> = ({ closeModal }) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const router = useNavigate();

  const [formData, setFormData] = useState<UpdatePostType>({
    firstName: "",
    profileImage: [],
    portfolioVideo: [],
    introductionVideo: [],
  });
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const portfolioVideoInputRef = useRef<HTMLInputElement>(null);
  const introductionVideoInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    console.log(type);
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [type]: [file],
      }));
    }
    console.log(formData);
  };

  const handleUpdateTeacher = async (event: React.FormEvent) => {
    event.preventDefault();

    const userToken = localStorage.getItem("token");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("text", formData.firstName);
      formDataToSend.append("introductionVideo", formData.introductionVideo[0]);
      formDataToSend.append("portfolioVideo", formData.portfolioVideo[0]);
      formDataToSend.append("profileImage", formData.profileImage[0]);

      const response = await axios.put(
        API_ENDPOINTS.UPDATETEACHERPROFILE,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200) {
        console.log(response.data.teacher);
      }
      toast.success("Post has been Updated");
      router("/post-page");
    } catch (error: unknown) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className=" z-50 fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div
        className="w-full max-w-xl p-6 mx-auto bg-white rounded-lg "
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        <form className="px-2">
          <div
            className="flex items-center justify-between mb-4"
            onClick={closeModal}
          >
            <h1 className="text-2xl font-bold">{t("EDIT_POST")}</h1>

            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="gap-2 grid">
            <div className="w-[500px]">
              <InputWithIcon
                pname="firstName"
                icon={<UserIcon />}
                label={t("FIRST_NAME")}
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t("ENTER_FIRST_NAME")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Add New Profile Image
              </label>
              <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2]">
                <input
                  id="profileImage"
                  name="profileImage"
                  ref={profileImageInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(event) => handleImageChange(event, "profileImage")}
                  accept="image/*"
                />
                <label
                  htmlFor="profileImage"
                  className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 4v16m8-8H4"></path>
                  </svg>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Portfolio Video</label>
              <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2]">
                <input
                  id="portfolioVideo"
                  name="portfolioVideo"
                  ref={portfolioVideoInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(event) =>
                    handleImageChange(event, "portfolioVideo")
                  }
                  accept="video/*"
                />
                <label
                  htmlFor="portfolioVideo"
                  className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 4v16m8-8H4"></path>
                  </svg>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">introduction Video</label>
              <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2]">
                <input
                  id="introductionVideo"
                  name="introductionVideo"
                  className="hidden"
                  ref={introductionVideoInputRef}
                  type="file"
                  multiple
                  onChange={(event) =>
                    handleImageChange(event, "introductionVideo")
                  }
                  accept="video/*"
                />
                <label
                  htmlFor="introductionVideo"
                  className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 4v16m8-8H4"></path>
                  </svg>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#61cbc2] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all"
              onClick={(event) => handleUpdateTeacher(event)}
            >
              {t("UPDATE")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeacher;
