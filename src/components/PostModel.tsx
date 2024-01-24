import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";

interface CreatePostType {
  text: string;
  category: string;
  tags: string;
  userId: string | null;
  mediaFiles: File[];
}

const PostModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const userId = localStorage.getItem("id");

  const [formData, setFormData] = useState<CreatePostType>({
    userId: userId,
    text: postContent,
    category: "",
    tags: "",
    mediaFiles: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
      // Handle error condition
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
      console.log(response.data);
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
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-xl p-6 mx-auto bg-white rounded-lg " style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      }}
      >
        <form className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Write Post</h1>
            <button onClick={closeModal} className="p-2">
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div>
            <textarea
              className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder="Write text..."
              name="text"
              value={formData.text}
              onChange={handleInputTextChange}
              rows={4} // Adjust the number of rows as needed
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Add photos and videos</label>
            <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#51ff85]">
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
          <label htmlFor="">Add Category</label>
          <select
            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
            onChange={handleSelectChange}
            name="category"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Party">Party</option>
            <option value="Before Match">Before Match</option>
            <option value="Match">Match</option>
            <option value="After Match">After Match</option>
            <option value="Event">Event</option>
          </select>
          <div>
            <label htmlFor="">Add tags</label>
            <input
              className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder="# Tags"
              name="tags"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
          </div>
          <button
            className="w-full bg-[#51ff85] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all"
            onClick={(event) => handlePost(event)}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
