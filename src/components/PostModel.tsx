import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { useTranslation } from "react-i18next";
interface CreatePostType {
  text: string;
  category: string;
  tags: string;
  userId: string | null;
  mediaFiles: File[];
}

const PostModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const userId = localStorage.getItem("id");

  const [formData, setFormData] = useState<CreatePostType>({
    userId: userId,
    text: postContent,
    category: "",
    tags: "",
    mediaFiles: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files).slice(0, 5);
      setFormData((prevFormData: CreatePostType) => ({
        ...prevFormData,
        mediaFiles: [...prevFormData.mediaFiles, ...filesArray],
      }));
    }
  };

  const handlePost = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.userId || formData.mediaFiles.length === 0) {
      return;
    }

    const userToken = localStorage.getItem("token");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("text", formData.text);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("tags", formData.tags);

      formData.mediaFiles.forEach((file, index) => {
        formDataToSend.append("mediaFiles", file);
      });

      const response = await axios.post(
        API_ENDPOINTS.CREATEPOSTS, formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        window.location.reload();
      }
      closeModal();
    } catch (error: unknown) {
    }
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedCategory(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="z-[9999] fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className=" w-full max-w-xl p-6 mx-auto bg-white rounded-lg " style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      }}
      >
        <form className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{t("WRITE_POST")}</h1>
            <button onClick={closeModal} className="p-2 rounded-full cursor-pointer">
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div>
            <textarea
              className="w-[533px] p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder={t("WRITE_TEXT")}
              name="text"
              value={formData.text}
              onChange={handleInputTextChange}
              rows={4} 
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">{t("ADD_VIDEOS")}</label>
            <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2]">
              <input
                id="file-upload"
                name="mediaFiles"
                ref={fileInputRef}
                className="hidden"
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*,video/*"
              />
              <label htmlFor="file-upload" className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]">
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
          <label htmlFor="">{t("ADD_CATEGORY")}</label>
          <select
            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
            onChange={handleSelectChange}
            name="category"
          >
            <option value="" >
            {t("SELECT_CATEGORY")}
            </option>
            <option value="Public">{t("PUBLIC")}</option>
          <option value="Private">{t("PRIVATE")}</option>
           
          </select>
          <div>
            <label htmlFor="">{t("ADD_TAGS")}</label>
            <input
              className="w-[533px] p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder={t("ADD_TAGS")}
              name="tags"
              onChange={handleInputChange}
              required
            />
          </div>
       
          <button
            className="w-full bg-[#61cbc2] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all"
            onClick={(event) => handlePost(event)}
          >
            {t("POST")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
